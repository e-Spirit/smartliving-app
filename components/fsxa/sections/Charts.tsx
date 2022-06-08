import Component from 'vue-class-component'
import { FSXABaseSection } from 'fsxa-pattern-library'
import { UiCharts as Payload } from '~/types'
import Charts from '~/components/fsxa/ui/Charts'

@Component({
  name: 'ChartsSection'
})
export default class QuickLinksSection extends FSXABaseSection<Payload> {
  render() {
    return <Charts payload={this.payload as Payload} />
  }
}
