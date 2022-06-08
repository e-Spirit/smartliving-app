import { Context } from '@nuxt/types'
import { NavigationDataExt } from '~/types'

export const FALLBACK_LOGIN_PATH_DE = '/Login/index-2.html'
export const FALLBACK_LOGIN_PATH_EN = '/Login'

export default function ({ store, route, redirect, $config }: Context) {
  const nav: NavigationDataExt = store.getters.permittedNavigation

  if (route.path === '/' && nav.pages.index !== '/') {
    return redirect(nav.pages.index)
  }

  if (!store.getters.loggedIn && nav.authRequiredRoutes.includes(route.path)) {
    if (store.getters.locale === 'de_DE') {
      return redirect($config.FSXA_LOGIN_PATH_DE || FALLBACK_LOGIN_PATH_DE)
    }
    return redirect($config.FSXA_LOGIN_PATH_EN || FALLBACK_LOGIN_PATH_EN)
  }
}
