import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { FirstLevelNavigationItem } from '~/types'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'

interface NavigationElementInterface {
  navigationItem: FirstLevelNavigationItem
  isActive: boolean
  handleItemClicked: any
  href: string
}

@Component({
  name: 'NavigationElementMobile'
})
export default class NavigationElementMobile extends BaseComponent<NavigationElementInterface> {
  showMenu = false

  @Prop({ required: true })
  href!: NavigationElementInterface['href']

  @Prop({ required: true })
  navigationItem!: NavigationElementInterface['navigationItem']

  @Prop({ required: true })
  handleItemClicked!: NavigationElementInterface['handleItemClicked']

  @Prop({ required: false })
  isActive!: NavigationElementInterface['isActive']

  render() {
    return (
      <li>
        <a
          class={`${
            this.isActive
              ? 'bg-primary hover:bg-primary hover:opacity-90 text-primary-text'
              : ''
          } flex items-center pl-3 py-4 pr-2 text-gray-50 hover:bg-gray-900 rounded`}
          href="#"
          onClick={(event) => {
            event.preventDefault()
            this.handleItemClicked(this.navigationItem)
          }}
        >
          <span>{this.navigationItem.label}</span>
          <span class="inline-block ml-auto">
            {/*  <svg
              class="text-gray-400 w-3 h-3"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.08329 0.666626C8.74996 0.333293 8.24996 0.333293 7.91663 0.666626L4.99996 3.58329L2.08329 0.666626C1.74996 0.333293 1.24996 0.333293 0.916626 0.666626C0.583293 0.999959 0.583293 1.49996 0.916626 1.83329L4.41663 5.33329C4.58329 5.49996 4.74996 5.58329 4.99996 5.58329C5.24996 5.58329 5.41663 5.49996 5.58329 5.33329L9.08329 1.83329C9.41663 1.49996 9.41663 0.999959 9.08329 0.666626Z"
                fill="currentColor"
              />
            </svg> */}
          </span>
        </a>
      </li>
    )
  }
}
