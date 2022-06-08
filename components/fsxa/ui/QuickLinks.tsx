import { Component, Prop } from 'vue-property-decorator'
import { FSXARichText } from 'fsxa-pattern-library'
import * as Brands from '@fortawesome/free-brands-svg-icons'
import * as Regular from '@fortawesome/free-regular-svg-icons'
import * as Solid from '@fortawesome/free-solid-svg-icons'
import { UiQuickLinksItem, UiQuickLinks } from '~/types'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'

interface UiElementProps {
  payload: UiQuickLinks
}

@Component({
  name: 'QuickLinks'
})
export default class QuickLinks extends BaseComponent<UiElementProps> {
  @Prop({ required: true }) payload!: UiElementProps['payload']

  /**
   * Replace with your icon resolver
   * */
  resolveIcon(iconName: string) {
    const [type, value] = iconName.split('.')
    // @ts-ignore
    // eslint-disable-next-line import/namespace
    if (type === 'fab') return <fa icon={Brands[value]} />
    // @ts-ignore
    // eslint-disable-next-line import/namespace
    if (type === 'fas') return <fa icon={Solid[value]} />
    // @ts-ignore
    // eslint-disable-next-line import/namespace
    if (type === 'far') return <fa icon={Regular[value]} />
  }

  /**
   * Renders single quick link
   * */
  linkJSX(item: UiQuickLinksItem) {
    return (
      <div>
        <img
          class="hidden md:block absolute top-0 left-1/2 ml-16 lg:ml-8 dots"
          src="/dots.svg"
          alt=""
        />

        <div class="relative text-center">
          <a
            href="#"
            onClick={() =>
              this.triggerRouteChange({
                // @ts-ignore
                pageId: item?.data?.st_link?.referenceId
              })
            }
          >
            <span class="inline-flex mb-16 items-center justify-center w-20 h-20 bg-white rounded-full text-gray-600">
              <fa-layers class="fa-2x">
                {this.resolveIcon(item.data.st_icon.value)}
              </fa-layers>
            </span>
            <h3 class="mb-4 text-xl font-bold font-heading">
              {item.data.st_headline}
            </h3>
            <p>
              <FSXARichText content={item.data.st_text || ''} />
            </p>
          </a>
        </div>
      </div>
    )
  }

  render() {
    return (
      <section class="py-10 bg-gray-100">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap -mx-4 pb-20 _border-b">
            {this.payload.st_quick_links_list.map((item) => {
              return (
                <div class="relative w-full md:w-1/2 lg:w-1/4 px-4 mb-16 lg:mb-0 quickLink">
                  {this.linkJSX(item)}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }
}
