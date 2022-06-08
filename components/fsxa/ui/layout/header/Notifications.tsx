import Component from 'vue-class-component'
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'
import { CHANGE_STREAM_SOURCE_PATH } from '~/server-middleware/streams/client.sdk'

@Component({
  name: 'Notifications'
})
export default class Notifications extends BaseComponent {
  showMenu = false
  showIndicator = false
  socketStatus: {} = {}
  hasMassage = false
  stream?: EventSource

  mounted() {
    this.initEventStream()
  }

  /**
   * Event stream initialisation for server-sent-events communication between nuxt server middleware and client
   * */
  initEventStream() {
    if (!this.stream) {
      this.stream = new EventSource(
        `${this.$config.FSXA_CLIENT_BASE_URL}${CHANGE_STREAM_SOURCE_PATH}`
      )
      this.stream.onmessage = (event: any) => {
        console.log('message by STREAM', event)
        this.hasMassage = true
        this.showIndicator = true
        this.showMenu = true
      }
    }
  }

  onMessageClick() {
    this.showMenu = !this.showMenu
    this.showIndicator = false
  }

  render() {
    return (
      <ul class="xl:flex lg:justify-end lg:items-center lg:space-x-6 mr-6">
        <li>
          <a
            class="text-gray-500 hover:text-gray-400 cursor-pointer relative"
            onClick={this.onMessageClick}
          >
            <span
              class={`${this.showIndicator ? '' : 'hidden'} message-indicator`}
            />
            <fa-layers class="fa-1x">
              <fa icon={faCommentAlt} />
            </fa-layers>
          </a>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            {this.showMenu ? (
              <div
                class="origin-top-right z-50 absolute -right-3 top-8 mt-2 w-64 sm:w-96 rounded shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <div class="h-5 w-5 bg-gray-800 rounded absolute -top-2 right-8 transform rotate-45" />

                {this.hasMassage ? (
                  <p class="p-3 text-gray-100">
                    {this.t('message.update.description')}
                  </p>
                ) : (
                  <p class="p-3 text-gray-500">
                    {this.t('message.update.no-messages')}
                  </p>
                )}

                {this.hasMassage ? (
                  <div class="px-3 pb-2 flex items-right justify-end">
                    <a
                      onClick={() => {
                        this.onMessageClick()
                      }}
                      class="px-2 py-1.5 text-sm text-gray-200 cursor-pointer mr-3"
                    >
                      {this.t('message.update.cancel')}
                    </a>
                    <a
                      onClick={() => {
                        this.onMessageClick()
                        this.hasMassage = false
                        window.location.reload()
                      }}
                      class="px-2 py-1.5 text-sm text-gray-100 bg-orange-500 hover:bg-orange-700 cursor-pointer rounded"
                    >
                      {this.t('message.update.button')}
                    </a>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
          </transition>
          {this.showMenu ? (
            <div
              class="w-screen h-screen fixed top-0 left-0 z-0"
              onClick={() => {
                this.showMenu = false
                this.showIndicator = false
              }}
            />
          ) : (
            ''
          )}
        </li>
      </ul>
    )
  }
}
