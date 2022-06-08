import { Option } from 'fsxa-api/dist/types/types'
import { CustomSpec, Product, UiProductDetails } from '~/types'

export class ProductPropertyResolver {
  constructor(private product: Product, private overrides: UiProductDetails) {
    console.log('product', product, 'overrides', overrides)
  }

  isCustomMode() {
    return this.overrides.st_source_mode.identifier !== 'Custom'
  }

  showCta() {
    return this.overrides.st_show_cta
  }

  showPrice() {
    return this.overrides.st_show_price
  }

  showTeaserImages() {
    return this.isCustomMode() && this.overrides.st_show_teaser_images
  }

  teaserImage1Url(resolution = 'square') {
    return this.overrides.st_teaser_image1?.resolutions[resolution]?.url
  }

  teaserImage2Url(resolution = 'square') {
    return this.overrides.st_teaser_image2?.resolutions[resolution]?.url
  }

  name() {
    return this.isCustomMode() && this.overrides.st_show_custom_name
      ? this.overrides.st_custom_name
      : this.product.data.tt_name
  }

  price() {
    return this.isCustomMode() && this.overrides.st_show_custom_price
      ? this.overrides.st_custom_price
      : this.product.data.tt_price
  }

  description(): string {
    return this.isCustomMode() && this.overrides.st_show_custom_description
      ? this.overrides.st_custom_description
      : this.product.data.tt_abstract
  }

  specs() {
    return this.isCustomMode() && this.overrides.st_show_custom_specs
      ? this.normalizeSpecs(this.overrides.st_custom_specs)
      : this.product.data.tt_compatibility
  }

  mainImageUrl(resolution = 'square') {
    return this.isCustomMode() && this.overrides.st_show_custom_main_image
      ? this.overrides.st_custom_main_image?.resolutions[resolution]?.url
      : this.product.data.tt_teaser_image?.resolutions[resolution]?.url
  }

  downloadLink() {
    return this.overrides.st_download_link
  }

  downloadLabel() {
    return this.overrides.st_download_label
  }

  isReversed() {
    return this.overrides.st_image_alignment.identifier !== 'left'
  }

  /**
   * Map CustomSpec to Option type
   * */
  private normalizeSpecs(specs: CustomSpec[]) {
    return specs.map(
      (item) => ({ key: 'unknown', value: item.data.st_label } as Option)
    )
  }
}
