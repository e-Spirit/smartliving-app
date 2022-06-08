import Component from 'vue-class-component'
import { FSXABaseLayout } from 'fsxa-pattern-library'
import { Image, Link, RichTextElement } from 'fsxa-api'
import Footer from '~/components/fsxa/ui/layout/Footer'
import Header from '~/components/fsxa/ui/layout/Header'
import AccessControl from '~/components/fsxa/AccessControl'
import { MdPermission, UiLandingPageBanner } from '~/types'
import LandingPageBanner from '~/components/fsxa/ui/LandingPageBanner'

interface Payload {
  pt_text: RichTextElement[]
  pt_anchor_link: Link
  pt_picture: Image
  pageId: string
}
interface Meta {
  md_permission: MdPermission
}

@Component({
  name: 'LandingPageLayout',
  head() {
    return {
      title: (this as any).currentPage.label
    }
  }
})
export default class LandingPageLayout extends FSXABaseLayout<Payload, Meta> {
  render() {
    return (
      <div class="min-h-screen flex flex-col">
        <div class="bg-gray-100 flex-grow">
          <Header
            logoUrl={this.globalSettings?.data.ps_logo.resolutions.ORIGINAL.url}
            logoText={this.globalSettings?.data.ps_logo_text}
          />
          <LandingPageBanner
            payload={
              {
                st_text: this.data.pt_text,
                st_anchor_link: this.data.pt_anchor_link,
                st_picture: this.data.pt_picture
              } as UiLandingPageBanner
            }
          />
          <div class="container px-4">
            <div class="pt-16 flex-grow">
              <AccessControl permissions={this.meta.md_permission}>
                {this.renderContentByName('content')}
              </AccessControl>
            </div>
          </div>
        </div>
        <Footer
          logoUrl={
            this.globalSettings?.data.ps_logo_small.resolutions.ORIGINAL.url
          }
        />
      </div>
    )
  }
}
