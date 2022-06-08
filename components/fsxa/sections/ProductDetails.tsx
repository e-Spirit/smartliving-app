import Component from 'vue-class-component'
import { FSXABaseSection } from 'fsxa-pattern-library'
import { Product, UiProductDetails as Payload } from '~/types'
import ProductDetails from '~/components/fsxa/ui/ProductDetails'
import { fetchElement } from '~/server-middleware/api/api.client.sdk'

@Component({
  name: 'ProductDetailsSection'
})
export default class ProductDetailsSection extends FSXABaseSection<Payload> {
  product: Product | undefined

  private async fetchProduct() {
    this.product = await fetchElement({
      id: this.productId,
      locale: this.locale
    })

    this.$nextTick(() => {
      this.$forceUpdate()
    })
  }

  mounted() {
    return this.fetchProduct()
  }

  get productId() {
    // @ts-ignore
    return this.payload.st_product?.value[0].identifier
  }

  render() {
    return this.product ? (
      <ProductDetails
        id={`st-${this.$props.id}`}
        payload={this.payload}
        product={this.product as Product}
      />
    ) : (
      <div />
    )
  }
}
