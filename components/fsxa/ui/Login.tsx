import { Component, Prop } from 'vue-property-decorator'
import Auth0Lock from 'auth0-lock'
import { UiLogin } from '~/types'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'

interface Props {
  payload: UiLogin
}

export interface EventsWithOn {
  onSubmit: { email: string; password: string }
}

@Component({
  name: 'Login'
})
export default class Login extends BaseComponent<Props, EventsWithOn> {
  @Prop({ required: true }) payload!: Props['payload']

  lock: Auth0LockCore | null = null

  mounted() {
    if (!this.lock) {
      this.lock = this.getLock()
    }
    // @ts-ignore
    this.lock.show()
  }

  destroyed() {
    // @ts-ignore
    this.lock.hide()
  }

  getLock() {
    return new Auth0Lock(
      this.$config.FSXA_AUTH0_CLIENT_ID,
      this.$config.FSXA_AUTH0_DOMAIN,
      // @see https://auth0.com/docs/libraries/lock/lock-configuration
      {
        language: this.locale.substring(0, 2),
        container: 'login-page',
        theme: {
          primaryColor: 'var(--color-primary)'
        },
        allowSignUp: false,
        auth: {
          redirectUrl: `${
            window.location.origin || 'http://localhost:3000'
          }/callback`,
          responseType: 'token id_token',
          params: {
            scope: 'openid profile email'
          }
        }
      }
    )
  }

  render() {
    return (
      <section class="min-h-screen flex items-stretch text-white">
        <div
          class="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={{
            backgroundImage: `url(${this.payload.st_picture?.resolutions.ORIGINAL.url})`
          }}
        >
          <div class="absolute bg-black opacity-60 inset-0 z-0" />
          <div class="w-full px-24 z-10">
            <h1 class="text-5xl font-bold text-left tracking-wide">
              {this.payload.st_headline}
            </h1>
            <p class="text-3xl my-4">{this.payload.st_description}</p>
          </div>
        </div>
        <div
          class="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
          style={{ backgroundColor: '#161616' }}
        >
          <div
            class="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
            style={{
              backgroundImage: `url(${this.payload?.st_picture?.resolutions.ORIGINAL.url})`
            }}
          >
            <div class="absolute bg-black opacity-60 inset-0 z-0" />
          </div>
          <div class="w-full py-6 z-20">
            <h1 class="my-6 flex pl-justify-center">
              <img
                class="h-16"
                src={this.payload.st_brand_picture?.resolutions.ORIGINAL.url}
                alt=""
                width="auto"
              />
            </h1>
            {/*
             * @see this.getLock()
             * container for auth0-lock login/signup form
             */}
            <div id="login-page" />
          </div>
        </div>
      </section>
    )
  }
}
