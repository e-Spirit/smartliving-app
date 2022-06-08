import Component from 'vue-class-component'
import { FSXABaseSection } from 'fsxa-pattern-library'
import Login from '../ui/Login'
import { UiLogin as Payload } from '~/types'

@Component({
  name: 'LoginSection'
})
export default class LoginSection extends FSXABaseSection<Payload> {
  get loginPayload(): Payload {
    return {
      st_description: this.payload.st_description,
      st_headline: this.payload.st_headline,
      st_picture: this.payload.st_picture,
      st_brand_picture: this.globalSettings?.data.ps_logo_large
    }
  }

  /**
   * Store locale info for after auth callback - else the locale info will be lost
   * */
  mounted() {
    // @ts-ignore
    this.$cookies.set('authRedirectLocale', this.locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
  }

  render() {
    return (
      <div>
        <Login payload={this.loginPayload as Payload} />
      </div>
    )
  }
}
