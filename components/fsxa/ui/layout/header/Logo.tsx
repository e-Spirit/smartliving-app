import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'

interface NavigationLogoProps {
  logoUrl: string
  title?: string
}

@Component({
  name: 'NavigationLogo'
})
export default class Logo extends BaseComponent<NavigationLogoProps> {
  @Prop({ required: true })
  logoUrl!: NavigationLogoProps['logoUrl']

  @Prop({ required: false })
  title: NavigationLogoProps['title']

  render() {
    return (
      <div
        class="flex flex-shrink content-center items-center relative"
        style="z-index:1000"
      >
        <a
          class="flex-shrink-0 text-2xl text-white font-semibold cursor-pointer"
          onClick={() => this.navigateToIndex()}
        >
          <img class="h-10" src={this.logoUrl} alt="" width="auto" />
        </a>
        <a
          onClick={() => this.navigateToIndex()}
          class="hidden sm:block cursor-pointer"
        >
          <span class="text-gray-50 font-bold ml-6 mr-10 whitespace-nowrap">
            {this.title}
          </span>
        </a>
      </div>
    )
  }
}
