import { Image } from 'fsxa-api'
import { Option } from 'fsxa-api/dist/types/types'

export interface Product {
  data: {
    tt_abstract: string
    tt_categories: Option[]
    tt_compatibility: Option[]
    // tt_delivery: (...)
    // tt_media: (...)
    // tt_installation: (...)
    // tt_mode: (...)
    tt_name: string
    tt_price: string
    // tt_relatedproducts: (...)
    // tt_showrelatedproducts: (...)
    tt_teaser_image: Image
    tt_teaser_image_alt: string
    tt_teaser_text: string
  }
  entityType: string
  id: string
  previewId: string
  route: string
  schema: string
  template: string
}

export interface CustomSpec {
  id: string
  type: string
  sectionType: string
  previewId: string
  data: {
    st_label: string
  }
  children: []
}
