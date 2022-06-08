import { FSXABaseComponent } from 'fsxa-pattern-library'
import { Link } from 'fsxa-api'
import { Auth0Role, Auth0User } from '~/types'

interface Translation {
  data: { tt_key: string; tt_value: string }
}

export class BaseComponent<
  Props = {},
  EventsWithOn = {},
  Slots = {}
> extends FSXABaseComponent<Props, EventsWithOn, Slots> {
  /**
   * Provides easy access translation functionality
   * */
  getTranslationObject(key: string): Translation {
    return this.$store.getters.translations?.value?.items?.filter(
      (translation: Translation) => translation.data.tt_key === key
    )[0]
  }

  /**
   * Provides easy access translation functionality
   *
   * Fallback: original key
   *
   * @return string translated key
   * */
  t(key: string): string {
    return this.getTranslationObject(key)?.data.tt_value || key
  }

  /**
   * Handles (st_)link clicks
   * */
  handleLinkClick(link: Link) {
    if (link.data.lt_link?.section?.identifier) {
      // @ts-ignore
      this.$scrollTo(`#st-${link.data.lt_link.section.identifier}`, 500, {
        easing: 'ease-in-out',
        offset: -80
      })

      return
    }
    return this.triggerRouteChange({
      pageId: link?.data.lt_link.referenceId
    })
  }

  handleLogin() {
    this.navigateToLoginPage()
  }

  async handleLogout() {
    // @ts-ignore
    return await this.$auth.logout()
  }

  navigateToIndex() {
    return this.triggerRouteChange({
      route: this.navigationData?.pages.index
    })
  }

  navigateToLoginPage() {
    return this.triggerRouteChange({
      pageId: this.globalSettings?.data.ps_login_page.referenceId
    })
  }

  get user(): Auth0User {
    // @ts-ignore
    return this.$auth.$storage.getUniversal('user')
  }

  isLoggedIn() {
    // @ts-ignore
    return this.$auth.loggedIn
  }

  get userRoles() {
    return (
      this.$store.getters.userRoles?.map((_: Auth0Role) => _.description) || []
    )
  }
}
