import Component from 'vue-class-component'
import { FSXABaseLayout } from 'fsxa-pattern-library'
import Footer from '~/components/fsxa/ui/layout/Footer'
import Header from '~/components/fsxa/ui/layout/Header'
import AccessControl from '~/components/fsxa/AccessControl'
import { MdPermission } from '~/types'

export interface Payload {}

interface Meta {
  md_permission: MdPermission
}

@Component({
  name: 'HomepageLayout',
  // We will set the page-title for every page that is using the homepage layout
  head() {
    return {
      title: (this as any).currentPage.label
    }
  }
})
export default class HomepageLayout extends FSXABaseLayout<Payload, Meta> {
  render() {
    return (
      <div class="min-h-screen flex flex-col">
        <div class="bg-gray-100 flex-grow">
          <Header
            logoUrl={this.globalSettings?.data.ps_logo.resolutions.ORIGINAL.url}
            logoText={this.globalSettings?.data.ps_logo_text}
          />
          <div class="container px-4 flex flex-col flex-grow min-h-full">
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
