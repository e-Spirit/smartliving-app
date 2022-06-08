import Component from 'vue-class-component'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'

@Component({
  name: 'User'
})
export default class User extends BaseComponent {
  showMenu = false

  render() {
    return this.isLoggedIn() ? (
      <div class="hidden xl:block relative">
        <button
          class="flex items-center outline-none active:outline-none focus:outline-none"
          onClick={() => (this.showMenu = !this.showMenu)}
        >
          <div class="mr-3 text-right">
            <p class="text-sm text-white">
              {this.user.name || this.user.email}
            </p>
            <p class="text-sm text-gray-400 capitalize">
              {this.userRoles.join(', ')}
            </p>
          </div>
          <div class="mr-2">
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
          <span>
            <svg
              class="text-gray-400"
              width={10}
              height={6}
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.08335 0.666657C8.75002 0.333323 8.25002 0.333323 7.91669 0.666657L5.00002 3.58332L2.08335 0.666657C1.75002 0.333323 1.25002 0.333323 0.916687 0.666657C0.583354 0.99999 0.583354 1.49999 0.916687 1.83332L4.41669 5.33332C4.58335 5.49999 4.75002 5.58332 5.00002 5.58332C5.25002 5.58332 5.41669 5.49999 5.58335 5.33332L9.08335 1.83332C9.41669 1.49999 9.41669 0.99999 9.08335 0.666657Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </button>

        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          {this.showMenu ? (
            <div
              class="origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-sm shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
            >
              <a
                href="#"
                class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
              >
                {this.t('settings')}
              </a>
              <a
                href="#"
                class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault()
                  this.handleLogout()
                }}
              >
                {this.t('logout')}
              </a>
            </div>
          ) : (
            ''
          )}
        </transition>
        {this.showMenu ? (
          <div
            class="w-screen h-screen fixed top-0 left-0 z-0"
            onClick={() => (this.showMenu = false)}
          />
        ) : (
          ''
        )}
      </div>
    ) : (
      <div class="hidden xl:block">
        <a
          class="text-white cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            this.handleLogin()
          }}
        >
          {this.t('login')}
        </a>
      </div>
    )
  }
}
