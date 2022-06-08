import { NavigationData, NavigationItem } from 'fsxa-api'
import {
  removeFromIdMap,
  removeFromSeoRouteMap,
  removeFromStructure
  // @ts-ignore
} from 'fsxa-api/dist/lib/utils'
import { Auth0Role } from '~/types'

const filterNavigationItem = (
  permissions: NavigationItem['permissions'],
  roles: Auth0Role[] = []
) => {
  // case 1: no permissions set -> permitted
  if (!permissions) {
    return true
  }

  // case 2: one of my roles is permitted
  return (
    roles.filter((role) => permissions?.allowed.indexOf(role.name) > -1)
      .length > 0
  )
}

const filterAuthRequiredRoutes = (nav: NavigationData) => {
  const result = []
  for (const [key, value] of Object.entries(nav.idMap)) {
    const groupAuthenticated = value?.permissions?.allowed.indexOf(
      'group_authenticated'
    )
    if (groupAuthenticated !== undefined && groupAuthenticated > -1) {
      result.push(value.seoRoute)
    }
  }
  return [...new Set(result)]
}

export const filterAndPrepareByPermission = (
  navigation: NavigationData | undefined,
  roles: Auth0Role[],
  isAuthorisationActive: boolean
) => {
  if (!navigation) {
    return navigation
  }
  const idMap = navigation.idMap
  const routes = Object.keys(idMap).map((route) => idMap[route])
  const filteredRoutes = routes?.filter((_) => {
    if (!isAuthorisationActive) {
      return true
    }
    return filterNavigationItem(_.permissions, roles)
  })
  const allowedRoutes = filteredRoutes.map((item) => item.id)
  const seo = removeFromSeoRouteMap(navigation.seoRouteMap, allowedRoutes)
  const structure = removeFromStructure(navigation.structure, allowedRoutes)
  const filteredIdMap = removeFromIdMap(navigation.idMap, allowedRoutes)
  const authRequiredRoutes = filterAuthRequiredRoutes(navigation)

  return {
    ...navigation,
    idMap: filteredIdMap,
    seoRouteMap: seo,
    structure,
    authRequiredRoutes
  }
}
