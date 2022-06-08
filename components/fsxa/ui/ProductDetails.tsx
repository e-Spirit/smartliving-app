import { Component, Prop } from 'vue-property-decorator'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { Product, UiProductDetails } from '~/types'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'
import { ProductPropertyResolver } from '~/services/productPropertyResolver'

interface UiElementProps {
  payload: UiProductDetails
  product: Product
}

@Component({
  name: 'ProductDetails'
})
export default class ProductDetails extends BaseComponent<UiElementProps> {
  @Prop({ required: true }) payload!: UiElementProps['payload']
  @Prop({ required: true }) product!: UiElementProps['product']

  productProps: ProductPropertyResolver = new ProductPropertyResolver(
    this.product,
    this.payload
  )

  render() {
    return (
      <section>
        <div class="py-20 radius-for-skewed">
          <div class="container mx-auto px-4">
            <div class="flex flex-wrap -mx-4 mb-12">
              <div
                class={
                  (this.productProps.isReversed() ? 'order-last ' : '') +
                  ' flex flex-wrap w-full lg:w-1/2 mb-8 lg:mb-0'
                }
              >
                {this.productProps.showTeaserImages() &&
                this.productProps.teaserImage1Url('square') ? (
                  <div class="w-full lg:w-1/2 px-4 mb-8">
                    <img
                      class="h-64 w-full rounded-lg object-cover"
                      src={this.productProps.teaserImage1Url('square')}
                      alt=""
                    />
                  </div>
                ) : (
                  ''
                )}

                {this.productProps.showTeaserImages() &&
                this.productProps.teaserImage2Url('square') ? (
                  <div class="w-full lg:w-1/2 px-4 mb-8">
                    <img
                      class="h-64 w-full rounded-lg object-cover"
                      src={this.productProps.teaserImage2Url('square')}
                      alt=""
                    />
                  </div>
                ) : (
                  ''
                )}

                <div class="w-full px-4">
                  <img
                    class="h-116 w-full rounded-lg object-cover"
                    src={this.productProps.mainImageUrl('square')}
                    alt=""
                  />
                </div>
              </div>
              <div class="flex flex-wrap w-full lg:w-1/2">
                <div class="w-full px-4 mb-8">
                  <div class="relative">
                    <img
                      class="h-116 w-full rounded-lg object-cover"
                      src="https://images.unsplash.com/photo-1565300667498-2843c56b4603?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80"
                      alt=""
                    />
                    <div class="absolute inset-0 bg-gray-900 opacity-80 rounded-lg" />
                    <div class="absolute inset-0 p-6 flex justify-center">
                      <div class="max-w-md my-auto">
                        <span class="text-primary font-bold">
                          {this.productProps.showPrice()
                            ? this.productProps.price()
                            : ''}
                        </span>
                        <h2 class="text-4xl lg:text-5xl text-white font-bold mb-4">
                          {this.productProps.name()}
                        </h2>
                        <div class="max-w-xs">
                          <p class="mb-6 text-gray-400 mt-5">
                            {this.productProps.description()}
                          </p>
                          {this.productProps.showCta() ? (
                            <a
                              class="inline-block mt-3 py-2 px-6 rounded-l-xl rounded-t-xl bg-primary hover:bg-primary text-primary-text font-bold leading-loose"
                              href="#"
                            >
                              {this.t('add.to.cart')}
                            </a>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-auto">
                  <div class="w-full  px-4 mb-8 lg:mb-0">
                    {this.productProps.specs().map((item, index) => (
                      <div
                        class={
                          index & 1
                            ? 'py-3 px-10 bg-gray-150 rounded-full'
                            : 'py-3 px-10 bg-white rounded-full'
                        }
                      >
                        <div class="flex justify-between">
                          <span class="font-bold font-heading">
                            {item.value}
                          </span>
                          <span class="font-bold font-heading">✓</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {this.productProps.isCustomMode() &&
                  this.productProps.downloadLink() ? (
                    <div class="w-full lg:w-1/2 px-4">
                      <a
                        class="inline-flex w-full md:w-auto mb-4 lg:mb-0 md:mr-6 justify-center items-center px-8 py-6 font-bold font-heading uppercase border hover:border-gray-500 rounded-md"
                        href={this.productProps.downloadLink().url}
                        target="_blank"
                      >
                        <fa icon={faDownload} />
                        <span class="ml-4">
                          {this.productProps.downloadLabel()}
                        </span>
                      </a>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
