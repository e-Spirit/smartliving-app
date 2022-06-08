import { Request, Response } from 'express'
import {
  DEFAULT_COLLECTION_URL,
  EVENT_SOURCE_BASE_URL,
  EVENT_SOURCE_EVENT_URL,
  FSXA_API_KEY
} from './sdk'
import { EventStream } from './EventStreams'

const changeStream = new EventStream({
  collectionUrl: DEFAULT_COLLECTION_URL,
  apiKey: FSXA_API_KEY
})

const app = require('express')()
app.get(EVENT_SOURCE_EVENT_URL, (req: Request, res: Response) => {
  changeStream.addSession(req, res)
  res.connection.setTimeout(0)
})

export default {
  path: EVENT_SOURCE_BASE_URL,
  handler: app
}
