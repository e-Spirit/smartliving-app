import { Component, Prop } from 'vue-property-decorator'
import { FSXARichText } from 'fsxa-pattern-library'
import { Link } from 'fsxa-api'
import { UiHighlightGrid, UiHighlightGridItem } from '~/types'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'

interface UiElementProps {
  payload: UiHighlightGrid
}

@Component({
  name: 'HighlightGridItem'
})
export default class HighlightGrid extends BaseComponent<UiElementProps> {
  @Prop({ required: true }) payload!: UiElementProps['payload']

  /**
   * Helper render method
   *
   * Generates botton template on the right side
   * */
  linkJSX({ data: { st_link } }: UiHighlightGridItem) {
    return st_link ? (
      <a
        class="inline-block bg-primary hover:opacity-90 text-primary-text font-bold font-heading mt-10 py-4 px-8 rounded-md uppercase transition duration-200 cursor-pointer"
        href="#"
        onClick={(e) => {
          e.preventDefault()
          this.handleLinkClick(st_link)
        }}
      >
        {st_link.data.lt_text}
      </a>
    ) : (
      ''
    )
  }

  /**
   * Helper render method
   *
   * Generates small component content
   * */
  smContentJSX({ data }: UiHighlightGridItem) {
    return (
      <a
        class="absolute inset-0 flex items-end"
        href="#"
        onClick={(e) => {
          e.preventDefault()
          this.handleLinkClick(data.st_link as Link)
        }}
      >
        <div class="pl-12 pb-12">
          <span class="text-xl text-primary font-bold font-heading">
            {data.st_topline}
          </span>

          <h3
            class={`${
              data.st_mode.identifier === 'dark' ? 'text-white' : 'text-black'
            } text-3xl font-bold font-heading`}
          >
            {data.st_headline}
          </h3>
          <p
            class={`${
              data.st_mode.identifier === 'dark'
                ? 'text-gray-200'
                : 'text-gray-800'
            } text-xl font-bold font-heading`}
          >
            <FSXARichText content={data.st_text || ''} />
          </p>
        </div>
      </a>
    )
  }

  render() {
    const [first, second, third] = this.payload.st_highlight_list

    const bgColor = (item: UiHighlightGridItem) =>
      item.data.st_mode.identifier === 'dark'
        ? `rgb(0,0,0,${item.data.st_opacity})`
        : `rgb(255,255,255,${item.data.st_opacity})`
    const bgBlendMode = (item: UiHighlightGridItem) =>
      item.data.st_mode.identifier === 'dark'
        ? `bg-blend-darken`
        : `bg-blend-lighten`

    return (
      <section class="pb-10 bg-gray-100 overflow-x-hidden ">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap -mx-3 mb-10">
            <div class="w-full lg:w-1/2 px-3 mb-6 lg:mb-0">
              <div
                class={`${bgBlendMode(
                  first
                )} relative mb-6 h-64 w-full bg-cover bg-center bg-no-repeat`}
                style={`background-color: ${bgColor(
                  first
                )}; background-image: url('${
                  first.data.st_picture?.resolutions.w612xh321.url
                }');`}
              >
                {this.smContentJSX(first)}
              </div>
              <div
                class={`${bgBlendMode(
                  second
                )} relative h-64 w-full bg-cover bg-center bg-no-repeat`}
                style={`background-color: ${bgColor(
                  second
                )}; background-image: url('${
                  second.data.st_picture?.resolutions.w612xh321.url
                }');`}
              >
                {this.smContentJSX(second)}
              </div>
            </div>
            <div class="order-first lg:order-last  w-full lg:w-1/2 px-3">
              <div
                class={`${bgBlendMode(
                  third
                )} relative inline-block mb-6 h-96 lg:h-full w-full bg-no-repeat bg-cover`}
                style={`background-color: ${bgColor(
                  third
                )}; background-image: url('${
                  third.data.st_picture?.resolutions.ORIGINAL.url
                }');`}
              >
                <div class="absolute bottom-0 left-0 pb-20 pl-12">
                  <span class="text-xl text-primary font-bold font-heading">
                    {third.data.st_topline}
                  </span>
                  <h3
                    class={`${
                      third.data.st_mode.identifier === 'dark'
                        ? 'text-white'
                        : 'text-black'
                    } mt-3 mb-2 text-3xl font-bold font-heading`}
                  >
                    {third.data.st_headline}
                  </h3>
                  <p
                    class={`${
                      third.data.st_mode.identifier === 'dark'
                        ? 'text-gray-200'
                        : 'text-gray-800'
                    } font-bold font-heading`}
                  >
                    <FSXARichText content={third.data.st_text || ''} />
                  </p>
                  {this.linkJSX(third)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
