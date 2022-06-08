import Component from 'vue-class-component'
import { FSXABaseSection } from 'fsxa-pattern-library'
import { UiQuickLinks as Payload } from '~/types'
import QuickLinks from '~/components/fsxa/ui/QuickLinks'

@Component({
  name: 'QuickLinksSection'
})
export default class QuickLinksSection extends FSXABaseSection<Payload> {
  render() {
    return <QuickLinks payload={this.payload as Payload} />
  }
}
