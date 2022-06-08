import { Component, Prop } from 'vue-property-decorator'
import { StructureItem } from 'fsxa-api'
import Logo from './header/Logo'
import NavigationElement from '~/components/fsxa/ui/layout/header/NavigationElement'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'
import { FirstLevelNavigationItem, NavigationItem } from '~/types'
import Notifications from '~/components/fsxa/ui/layout/header/Notifications'
import NavigationElementMobile from '~/components/fsxa/ui/layout/header/NavigationElementMobile'
import User from '~/components/fsxa/ui/layout/header/User'
import UserMobile from '~/components/fsxa/ui/layout/header/UserMobile'
import {
  isAuthenticationActive,
  isNotificationActive
} from '~/services/permissions'

export interface HeaderProps {
  logoUrl: string
  logoText?: string
}

@Component({
  name: 'PageHeader'
})
export default class Header extends BaseComponent<HeaderProps> {
  @Prop({ required: true }) logoUrl!: HeaderProps['logoUrl']
  @Prop({ required: false }) logoText: HeaderProps['logoText']

  isNavbarOpen = false

  createChildren(item: StructureItem): any {
    if (item.children.length === 0) {
      return []
    }
    const nav = this.$store.getters.permittedNavigation
    return item.children.map((child) => ({
      key: child.id,
      label: nav?.idMap[child.id].label,
      path: this.getUrlByPageId(child.id) || '#',
      data: nav?.idMap[child.id].customData,
      children: this.createChildren(child)
    }))
  }

  get navigationItems(): FirstLevelNavigationItem[] {
    const nav = this.$store.getters.permittedNavigation
    return nav
      ? nav.structure.map((item: StructureItem) => ({
          key: item.id,
          label: nav?.idMap[item.id].label,
          path: this.getUrlByPageId(item.id) || '#',
          children: this.createChildren(item),
          data: nav?.idMap[item.id].customData
        }))
      : []
  }

  onNavigate(item: NavigationItem) {
    if (['language.de', 'language.en'].includes(item.key as string)) {
      return this.triggerRouteChange({
        pageId: this.currentPage?.id,
        locale: item.key === 'language.de' ? 'de_DE' : 'en_GB'
      })
    } else {
      return this.triggerRouteChange({
        pageId: item.key as string
      })
    }
  }

  get activeItemKeys() {
    return this.currentPage
      ? [...this.currentPage.parentIds, this.currentPage.id]
      : []
  }

  get navItems() {
    const items = [...this.navigationItems]
    return [...items]
  }

  isActive(navItem: FirstLevelNavigationItem) {
    return this.activeItemKeys?.includes('' + navItem.key)
  }

  toggleNavBar() {
    this.isNavbarOpen = !this.isNavbarOpen
  }

  closeNavBar() {
    this.isNavbarOpen = false
  }

  render() {
    return (
      <section class="sticky top-0 z-50">
        <nav>
          <div class="p-6 flex items-center bg-gray-900">
            <Logo logoUrl={this.logoUrl} title={this.logoText} />
            <ul class="hidden xl:flex">
              {this.navItems.map((navItem, index) => {
                return (
                  <NavigationElement
                    navigationItem={navItem}
                    isActive={this.isActive(navItem)}
                    key={index}
                    href={this.navigationData!.idMap[navItem.key].seoRoute}
                    handleItemClicked={this.onNavigate}
                  />
                )
              })}
            </ul>
            <div class="ml-auto relative">
              <Notifications /> 
            </div>
            {isAuthenticationActive(this.$config) ? <User /> : ''}
            <div class="flex xl:hidden">
              <button
                class="navbar-burger flex items-center rounded focus:outline-none"
                onClick={this.toggleNavBar}
              >
                <svg
                  class="text-primary-text bg-primary hover:opacity-90 block h-8 w-8 p-2 rounded"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <title>Mobile menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        <transition
          enter-active-class="transition ease-out duration-100"
          // enter-from-class="transform-gpu opacity-0"
          // enter-to-class="transform-gpu opacity-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform-gpu opacity-100"
          leave-to-class="transform-gpu opacity-0"
        >
          {this.isNavbarOpen ? (
            <div
              class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-50 w-full"
              onClick={this.closeNavBar}
            />
          ) : (
            ''
          )}
        </transition>

        <transition
          enter-active-class="transition ease-out duration-25"
          // enter-from-class="transform-gpu -translate-x-full"
          // enter-to-class="transform-gpu translate-x-0"
          leave-active-class="transition ease-in duration-25"
          leave-from-class="transform-gpu translate-x-0"
          leave-to-class="transform-gpu -translate-x-full"
        >
          {this.isNavbarOpen ? (
            <div class="navbar-menu fixed top-0 left-0 bottom-0 w-3/4 lg:w-80 sm:max-w-xs z-50">
              {/*
              <div
                class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-30 w-full"
                onClick={this.closeNavBar}
              />
              */}
              <nav class="relative flex flex-col pt-6 pb-8 h-full w-full bg-gray-800 overflow-y-auto">
                <div class="flex w-full items-center px-6 pb-16 mb-6 lg:border-b border-gray-700">
                  {/* <Logo logoUrl={this.logoUrl} title={this.logoText} /> */}
                </div>
                <div class="px-4 pb-6">
                  <h3 class="mb-2 text-xs uppercase text-gray-500 font-medium">
                    {this.t('navigation')}
                  </h3>
                  <ul class="mb-8 text-sm font-medium transla">
                    {this.navItems.map((navItem, index) => {
                      return (
                        <NavigationElementMobile
                          navigationItem={navItem}
                          isActive={this.isActive(navItem)}
                          key={index}
                          href={
                            this.navigationData!.idMap[navItem.key].seoRoute
                          }
                          handleItemClicked={this.onNavigate}
                        />
                      )
                    })}
                  </ul>
                  <div class="pt-8">
                    {isAuthenticationActive(this.$config) ? <UserMobile /> : ''}
                  </div>
                </div>
              </nav>
            </div>
          ) : (
            ''
          )}
        </transition>
      </section>
    )
  }
}
