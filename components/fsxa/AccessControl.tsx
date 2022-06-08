import Component from 'vue-class-component'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { Prop } from 'vue-property-decorator'
import { MdPermission, NavigationDataExt } from '~/types'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'
import { isAuthorisationActive } from '~/services/permissions'

interface Props {
  permissions: MdPermission
}

@Component({})
export default class AccessControl extends BaseComponent<Props> {
  @Prop({ required: true }) permissions!: Props['permissions']

  /**
   * Checks Permissions
   * */
  get hasPermission() {
    if (!isAuthorisationActive(this.$config)) {
      return true
    }
    const nav: NavigationDataExt = this.$store.getters.permittedNavigation
    const currentPath = this.$route.path
    return (
      /*
       * all un-permitted pages are removed form seoRouteMap by navigation filter
       *
       * @see services/navigationFilter.ts
       * */
      nav.seoRouteMap[currentPath] ||
      !nav.authRequiredRoutes.includes(currentPath)
    )
  }

  render() {
    if (this.hasPermission) {
      return <div>{this.$slots.default}</div>
    }

    return (
      <div class="flex h-100 justify-center items-center bg-red-100 py-40 flex-col mb-20">
        <fa-layers class="fa-4x text-red-900">
          <fa icon={faExclamationTriangle} />
        </fa-layers>
        <div class="text-center mt-4">
          <h1 class="text-3xl mb-1 text-center text-red-900">
            {this.t('layout.noPermissions.title')}
          </h1>
          <p class="text-xl text-center text-red-800">
            {this.t('layout.noPermissions.text')}
          </p>
        </div>
      </div>
    )
  }
}
