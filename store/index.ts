import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState, FSXAActions } from 'fsxa-pattern-library'
import { NavigationData } from 'fsxa-api'
import { Auth0Role, Auth0User } from '~/types'
import { filterAndPrepareByPermission } from '~/services/navigationFilter'
import { NavigationSource } from '~/dataSources/Navigation'
import { Auth0ManagementSource } from '~/dataSources/Auth0Management'
import { isAuthorisationActive } from '~/services/permissions'

export interface State extends RootState {
  auth: {
    roles: Auth0Role[]
    user: Auth0User
    loggedIn: boolean
  }
  permittedNavigation: NavigationData
}
export const actions: ActionTree<State, State> = {
  /**
   * Fetch role data from auth0 api
   * (server-side only)
   * */
  async fetchRoles({ commit, state }) {
    if (!state.auth?.user?.sub || !process.server) {
      return
    }
    commit(
      'fetchRoles',
      await new Auth0ManagementSource(state.auth.user.sub).fetchRoles()
    )
  },
  /**
   * Fetch navigation data from navigation service
   * (server-side only)
   * */
  async fetchNavigation(
    { commit, getters: { userRoles } },
    { initialPath, afterAuthLocale }
  ) {
    if (!process.server) {
      return
    }
    /**
     * Case c: fallback
     * */
    let locale = 'en_GB'
    /**
     * Case a: after auth -> restore based on beforeRedirect cookie
     * */
    if (initialPath === '/' && afterAuthLocale) {
      locale = afterAuthLocale
    }
    /**
     * case b: get locale info from current path
     * */
    if (initialPath && initialPath !== '/') {
      locale = await new NavigationSource().fetchLocaleByRoute(initialPath)
    }

    commit(
      'fetchNavigation',
      filterAndPrepareByPermission(
        await new NavigationSource().fetchNavigation(locale),
        userRoles,
        isAuthorisationActive()
      )
    )
  },
  /*
   * - init FSXA
   * - fetch auth0 user roles
   * - fetch and filter navigation based on auth0 roles
   * */
  async nuxtServerInit({ dispatch }, { app, store }) {
    await this.dispatch(FSXAActions.hydrateClient, store.state.fsxa)
    await dispatch('fetchRoles')
    await dispatch('fetchNavigation', {
      initialPath: app.router.currentRoute.path,
      afterAuthLocale: app.$cookies.get('authRedirectLocale')
    })
  }
}

export const state = () => ({})

export const getters: GetterTree<State, RootState> = {
  userRoles: (state) => state.auth.roles,
  loggedIn: (state) => state.auth.loggedIn,
  permittedNavigation: (state) => state.permittedNavigation,
  locale: (state) => state.fsxa.locale,
  translations: (state) => state.fsxa.stored.translations,
  navItem:
    (_, { permittedNavigation }) =>
    (pageId: string) =>
      permittedNavigation.idMap[pageId],
  newsItem: (state) => (id: string) =>
    state.fsxa.stored.news?.value?.find(
      (item: { id: string }) => item.id === id
    )
}

export const mutations: MutationTree<State> = {
  fetchNavigation(state, data) {
    state.permittedNavigation = data
  },
  fetchRoles(state, data) {
    state.auth.roles = data
  },
  setPermittedNavigation(state, { data, config }) {
    // @ts-ignore
    state.permittedNavigation = filterAndPrepareByPermission(
      data,
      state.auth.roles,
      isAuthorisationActive(config)
    )
  }
}
