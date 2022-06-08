import { FSXABaseSection } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'
import { Image } from 'fsxa-api'
import {
  Product,
  UiInteractiveImage,
  UiInteractiveImage as Payload
} from '~/types'
import { fetchElement } from '~/server-middleware/api/api.client.sdk'
import InteractiveImage from '~/components/fsxa/ui/InteractiveImage'

export interface Meta {
  route: string
}

@Component({
  name: 'InteractiveImage'
})
export default class InteractiveImageSection extends FSXABaseSection<
  Payload,
  Meta
> {
  products: Product[] | undefined
  image: Image | undefined

  async mounted() {
    this.image = await this.fsxaApi.fetchElement({
      // @ts-ignore
      id: this.payload.st_interactive_image.media.id,
      locale: this.locale
    })

    this.products = await Promise.all(
      this.payload.st_interactive_image.areas
        .map(
          // @ts-ignore
          (item) => item.link.data.lt_product_id
        )
        .map((id) => fetchElement({ id, locale: '' }))
    )

    this.$nextTick(() => {
      this.$forceUpdate()
    })
  }

  render() {
    return this.image ? (
      <InteractiveImage
        payload={
          this.payload.st_interactive_image as unknown as UiInteractiveImage
        }
        products={this.products as Product[]}
        image={this.image as Image}
      />
    ) : (
      <div />
    )
  }
}
