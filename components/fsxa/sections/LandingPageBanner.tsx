import Component from 'vue-class-component'
import { FSXABaseSection } from 'fsxa-pattern-library'
import { UiLandingPageBanner as Payload } from '~/types'
import LandingPageBanner from '~/components/fsxa/ui/LandingPageBanner'

@Component({
  name: 'LandingPageBannerSection'
})
export default class LandingPageBannerSection extends FSXABaseSection<Payload> {
  render() {
    return <LandingPageBanner payload={this.payload as Payload} />
  }
}
