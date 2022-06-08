import Component from 'vue-class-component'
import { FSXABaseLayout } from 'fsxa-pattern-library'
import { Image } from 'fsxa-api'
import Footer from '~/components/fsxa/ui/layout/Footer'
import AccessControl from '~/components/fsxa/AccessControl'
import { MdPermission } from '~/types'

interface Payload {
  pt_text: string
  pt_picture?: Image
  pageId: string
}
interface Meta {
  md_permission: MdPermission
}

@Component({
  name: 'StandardWithoutHeaderLayout',
  // We will set the page-title for every page that is using the standard layout
  head() {
    return {
      title: (this as any).currentPage.label
    }
  }
})
export default class StandardWithoutHeaderLayout extends FSXABaseLayout<
  Payload,
  Meta
> {
  render() {
    return (
      <div>
        <AccessControl permissions={this.meta.md_permission}>
          <div>{this.renderContentByName('content')}</div>
        </AccessControl>
        <div class="container px-4">
          <Footer
            logoUrl={
              this.globalSettings?.data.ps_logo_small.resolutions.ORIGINAL.url
            }
          />
        </div>
      </div>
    )
  }
}
