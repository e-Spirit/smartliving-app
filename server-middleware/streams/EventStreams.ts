import { IncomingMessage, ServerResponse } from 'http'
import { Channel, createChannel, createSession } from 'better-sse'
// eslint-disable-next-line import/no-named-as-default
import WebSocket from 'ws'
import { Caas } from '../../dataSources/Caas'

const DEFAULT_RECONNECTION_DELAY = 10
const DEFAULT_MAX_RETRIES = 10

export type EventStreamOptions = {
  remoteProject?: string
  reconnectionDelay?: number
  maxRetries?: number
  collectionUrl: string
  apiKey: string
  onSocketMessage?: (event: WebSocket.MessageEvent) => void
  onSocketOpen?: (event: any) => void
  onSocketClose?: (event: WebSocket.CloseEvent) => void
  onSocketError?: (event: WebSocket.ErrorEvent) => void
}

export class EventStream {
  remoteProject?: string
  reconnectionDelay: number
  maxRetries: number
  retryCount: number
  secureToken: string | null = null
  socket?: WebSocket
  previewCollectionUrl
  pathSegments
  collectionUrl
  apiKey
  channel: Channel
  onSocketMessageFn?: (event: WebSocket.MessageEvent) => void
  onSocketOpenFn?: (event: any) => void
  onSocketCloseFn?: (event: WebSocket.CloseEvent) => void
  onSocketErrorFn?: (event: WebSocket.ErrorEvent) => void

  constructor(options: EventStreamOptions) {
    this.collectionUrl = options.collectionUrl
    this.apiKey = options.apiKey
    this.remoteProject = options && options.remoteProject
    this.reconnectionDelay =
      (options && options.reconnectionDelay) || DEFAULT_RECONNECTION_DELAY
    this.maxRetries = (options && options.maxRetries) || DEFAULT_MAX_RETRIES

    this.retryCount = 0

    this.channel = createChannel()
    this.channel.on('session-registered', () => this.onCheckState())
    this.channel.on('session-deregistered', () => this.onCheckState())

    this.previewCollectionUrl = new URL(this.collectionUrl)
    this.pathSegments = this.previewCollectionUrl.pathname.split('/')
    if (this.pathSegments.length !== 3) {
      throw new Error(
        `The format of the provided url '${this.previewCollectionUrl}' is incorrect and should only contain two path segments`
      )
    }
    this.onSocketMessageFn = options.onSocketMessage
    this.onSocketOpenFn = options.onSocketOpen
    this.onSocketCloseFn = options.onSocketClose
    this.onSocketErrorFn = options.onSocketError
  }

  onCheckState() {
    const hasSessions = this.channel.activeSessions.length > 0
    const isSocketOpenOrConnecting =
      this.socket?.readyState === WebSocket.OPEN ||
      this.socket?.readyState === WebSocket.CONNECTING

    if (hasSessions && !isSocketOpenOrConnecting) {
      this.ensureConnection()
    } else if (!hasSessions && isSocketOpenOrConnecting) {
      this.socket?.close()
    }
  }

  fetchSecureToken() {
    // Retrieving temporary auth token
    return fetch(
      new URL(
        `_logic/securetoken?tenant=${this.pathSegments[1]}`,
        this.previewCollectionUrl.origin
      ).href,
      {
        headers: { Authorization: `apikey="${this.apiKey}"` }
      }
    )
      .then((response) => response.json())
      .then((token) => token.securetoken)
      .catch(console.error)
  }

  async refreshSecureToken() {
    try {
      this.secureToken = await this.fetchSecureToken()
    } catch (err) {
      console.error(err.message)
    }
  }

  async ensureConnection() {
    if (
      this.socket?.readyState !== WebSocket.OPEN &&
      this.socket?.readyState !== WebSocket.CONNECTING
    ) {
      if (this.retryCount > this.maxRetries) {
        console.error(`Can't connect to WebSocket.`)
      } else {
        await this.refreshSecureToken()
        const socketUrl = `wss://${
          this.previewCollectionUrl.host + this.previewCollectionUrl.pathname
        }/_streams/crud?securetoken=${this.secureToken}`
        //console.info(`Socket link: ${socketUrl}`)

        this.retryCount++
        this.socket = new WebSocket(socketUrl)
        this.socket.onopen = this.onSocketOpen.bind(this)
        this.socket.onclose = this.onSocketClose.bind(this)
        this.socket.onerror = this.onSocketError.bind(this)
        this.socket.onmessage = this.onSocketMessage.bind(this)
      }
    }
  }

  onSocketOpen(event: any) {
    if (this.onSocketOpenFn) this.onSocketOpenFn(event)
    this.retryCount = 0
  }

  onSocketClose(event: WebSocket.CloseEvent) {
    if (this.onSocketCloseFn) this.onSocketCloseFn(event)
    if (!event.wasClean) {
      console.info(`Socket closed (${event.code}).`, event.reason)
    }
    this.ensureConnection()
  }

  onSocketError(event: WebSocket.ErrorEvent) {
    if (this.onSocketErrorFn) this.onSocketErrorFn(event)
    console.warn(`Socket error.`, event.message)
    setTimeout(() => this.ensureConnection(), this.reconnectionDelay)
  }

  async onSocketMessage(event: WebSocket.MessageEvent) {
    if (this.onSocketMessageFn) this.onSocketMessageFn(event)
    // @ts-ignore
    const eventData = JSON.parse(event.data)
    const result = await new Caas().fetchEntity(eventData.documentKey._id)
    if (result?.entityType === 'news') {
      this.channel.broadcast(event.type, event.data.toString('utf-8'))
    }
  }

  addSession(req: IncomingMessage, res: ServerResponse) {
    const serializer = (data: any) =>
      typeof data === 'string' ? data : JSON.stringify(data)
    createSession(req, res, { serializer }).then((session) =>
      this.channel.register(session)
    )
  }
}
