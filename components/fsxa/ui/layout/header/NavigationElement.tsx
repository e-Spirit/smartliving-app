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
  name: 'NavigationElement'
})
export default class NavigationElement extends BaseComponent<NavigationElementInterface> {
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
            this.isActive ? 'text-gray-100' : 'text-gray-50'
          } flex mr-10 items-center hover:text-gray-100 text-sm`}
          href="#"
          // seo version: href={this.href}
          onClick={(event) => {
            event.preventDefault()
            this.handleItemClicked(this.navigationItem)
          }}
        >
          <span>{this.navigationItem.label}</span>
        </a>
      </li>
    )
  }
}
