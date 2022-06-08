import { Image, Link, RichTextElement } from 'fsxa-api'
import {
  CaaSApi_CMSImageMap,
  CaaSApi_Option,
  CaaSApi_Record,
  File
} from 'fsxa-api/dist/types/types'
import { CustomSpec } from '~/types/elements'

export interface UiHighlightGridItem {
  data: {
    st_headline: string
    st_topline: string
    st_text: RichTextElement[]
    st_picture: Image
    st_link?: Link
    st_mode: CaaSApi_Option
    st_opacity: number
  }
}

export interface UiHighlightGrid {
  st_highlight_list: UiHighlightGridItem[]
}

export interface UiQuickLinksItem {
  data: {
    st_icon: { value: string }
    st_headline: string
    st_text: RichTextElement[]
    st_link?: Link
  }
}

export interface UiChartItem {
  data: {
    st_headline: string
    st_label: string
    st_value: string
    st_color: string
    st_progress: number
  }
}

export interface UiCharts {
  st_chart_list: UiChartItem[]
}

export interface UiQuickLinks {
  st_quick_links_list: UiQuickLinksItem[]
}

export interface UiText {
  st_text: RichTextElement[]
}

export interface UiProductDetails {
  st_custom_description: string
  st_custom_main_image: Image
  st_custom_name: string
  st_custom_price: number | null
  st_custom_specs: CustomSpec[]
  st_download_label: string
  st_download_link: File
  st_product: {
    name: string
    value: {
      identifier: string
      value: {
        label: string
        id: string
        extract: string
      }
    }[]
  }
  st_show_cta: boolean
  st_show_custom_description: boolean
  st_show_custom_main_image: boolean
  st_show_custom_name: boolean
  st_show_custom_price: boolean
  st_show_custom_specs: boolean
  st_show_price: boolean
  st_show_teaser_images: CaaSApi_Option
  st_image_alignment: CaaSApi_Option
  st_source_mode: CaaSApi_Option
  st_teaser_image1: Image
  st_teaser_image2: Image
}

export interface UiLandingPageBanner {
  st_text: RichTextElement[]
  st_anchor_link: Link
  st_picture: Image
}

export interface UiLogin {
  st_headline: string
  st_description: string
  st_picture?: Image
  st_brand_picture?: Image
}

export interface UiTeaser {
  st_headline: string
  st_picture: Image
  st_text: RichTextElement[]
}

export interface UiNews {
  id: string
  title: string
  date: string
  sourceId?: string
  teaser: RichTextElement[]
  image: Image
  text: RichTextElement[]
  channel: [{ key: string; value: 'app' | 'website' }]
  tagging: [{ data: { name: string } }]
  category: { key: string; value: string }
  video: { value: CaaSApi_Record[] }
  author: [{ data: { name: string } }]
}

export interface UiInteractiveImage {
  st_headline: string
  st_interactive_image: CaaSApi_CMSImageMap['value']
}
