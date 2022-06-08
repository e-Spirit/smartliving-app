import Component from 'vue-class-component'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'

@Component({
  name: 'UserMobile'
})
export default class UserMobile extends BaseComponent {
  render() {
    return this.isLoggedIn() ? (
      <div>
        <h3 class="mb-2 text-xs uppercase text-gray-500 font-medium">
          {this.t('user')}
        </h3>
        <div class="flex items-center pt-4 pb-3">
          <div class="ml-2 mr-3 ">
            {this.user.picture ? (
              <img
                class="w-10 h-10 rounded-full object-cover object-right"
                src={this.user.picture}
                alt=""
              />
            ) : (
              <fa-layers class="fa-2x w-10 h-10 text-white">
                <fa class="w-10 h-10" icon={faUserCircle} />
              </fa-layers>
            )}
          </div>
          <div class="mr-3 text-left">
            <p class="text-sm text-white">
              {this.user.name || this.user.email}
            </p>
            <p class="text-sm text-gray-400 capitalize">
              {this.userRoles.join(', ')}
            </p>
          </div>
        </div>
        <a
          class="flex items-center pl-3 py-3 pr-2 text-gray-50 hover:bg-gray-900 rounded"
          href="#"
        >
          <span>{this.t('settings')}</span>
        </a>
        <a
          class="flex items-center pl-3 py-3 pr-2 text-gray-50 hover:bg-gray-900 rounded"
          href="#"
          onClick={(e) => {
            e.preventDefault()
            this.handleLogout()
          }}
        >
          <span>{this.t('logout')}</span>
        </a>
      </div>
    ) : (
      <div>
        <a
          class="flex items-center pl-3 py-3 pr-2 text-gray-50 hover:bg-gray-900 rounded"
          href="#"
          onClick={(e) => {
            e.preventDefault()
            this.handleLogin()
          }}
        >
          <span>{this.t('login')}</span>
        </a>
      </div>
    )
  }
}
