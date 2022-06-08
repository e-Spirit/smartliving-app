import { NavigationData } from 'fsxa-api'

export interface NavigationDataExt extends NavigationData {
  authRequiredRoutes: string[]
}

export interface NavigationItem {
  key: string | number
  label: any
  path: string
  data: any
}

export interface FirstLevelNavigationItem extends NavigationItem {
  childPlacement?: 'left' | 'right'
  children: FirstLevelNavigationItem[]
  data: any
}

export interface Auth0User {
  email: string
  email_verified: boolean
  name: string
  nickname: string
  picture: string
  sub: string
  updated_at: string
}

export interface Auth0Role {
  description: string
  id: string
  name: string
}

export interface MdPermission {
  identifier: 'admin' | 'editor' | 'none' | 'Standard' | 'Premium' | 'Advanced'
  label: 'Admin' | 'Editor' | 'None' | 'Standard' | 'Premium' | 'Advanced'
}
