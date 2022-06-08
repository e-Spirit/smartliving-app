import { Component, Prop } from 'vue-property-decorator'
import { FSXARichText } from 'fsxa-pattern-library'
import { Link } from 'fsxa-api'
import { UiLandingPageBanner } from '~/types'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'

interface UiElementProps {
  payload: UiLandingPageBanner
}

@Component({
  name: 'LandingPageBanner'
})
export default class LandingPageBanner extends BaseComponent<UiElementProps> {
  @Prop({ required: true }) payload!: UiElementProps['payload']

  render() {
    return (
      <section class="skewed-bottom-right">
        <div class="bg-gray-900 pt-12 lg:pt-20 pb-20 radius-for-skewed">
          <div class="container mx-auto px-10">
            <div class="flex flex-wrap -mx-4">
              <div class="w-full lg:w-1/2 px-4 mb-12 md:mb-20 lg:mb-0 flex items-center">
                <div class="w-full text-center lg:text-left">
                  <FSXARichText content={this.payload.st_text || ''} />
                  <div class="max-w-sm mx-auto lg:mx-0">
                    <div>
                      <a
                        class="inline-block mb-3 lg:mb-0 lg:mr-3 w-full lg:w-auto py-2 px-6 leading-loose text-primary-text bg-primary hover:bg-primary text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200"
                        href="#"
                        onClick={() =>
                          this.handleLinkClick(
                            this.payload.st_anchor_link as Link
                          )
                        }
                      >
                        {this.payload.st_anchor_link.data.lt_text}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-1/2 px-4 flex items-center justify-center">
                <div class="relative" style="z-index: 0;">
                  <img
                    class="h-128 w-full max-w-lg object-cover rounded-3xl md:rounded-br-none"
                    src={this.payload.st_picture?.resolutions.ORIGINAL.url}
                    alt=""
                  />
                  <div
                    class="hidden md:block absolute text-primary"
                    style="top:-2rem; right: 3rem; z-index: -1;"
                  >
                    <svg
                      width="98"
                      height="98"
                      viewBox="0 0 98 98"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0 49V0H49H50L49.99 0.00980377C76.595 0.537064 98 22.2688 98 49C98 76.062 76.062 98 49 98C21.938 98 0 76.062 0 49Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  <div
                    class="hidden md:block absolute text-primary"
                    style="bottom:-2rem; right: -2rem; z-index: -1;"
                  >
                    <svg
                      width="166"
                      height="165"
                      viewBox="0 0 166 165"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M82.9727 164.999C82.8152 165 82.6577 165 82.5 165C36.9365 165 0 128.063 0 82.5C0 36.9365 36.9365 0 82.5 0C128.063 0 165 36.9365 165 82.5C165 83.2975 164.989 84.0924 164.966 84.8844L165.21 165H82.9714L82.9727 164.999Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <img
                    class="hidden md:block absolute"
                    style="top:3rem; right: -3rem; z-index: -1;"
                    src="/atis-assets/elements/bullets-dark-right.svg"
                    alt=""
                  />
                  <img
                    class="hidden md:block absolute"
                    style="bottom:2.5rem; left: -4.5rem; z-index: -1;"
                    src="/atis-assets/elements/bullets-dark-left.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mr-for-radius">
          <svg
            class="h-8 md:h-12 lg:h-20 w-full text-gray-900"
            viewBox="0 0 10 10"
            preserveAspectRatio="none"
          >
            <polygon fill="currentColor" points="0 0 10 0 0 10" />
          </svg>
        </div>
      </section>
    )
  }
}
