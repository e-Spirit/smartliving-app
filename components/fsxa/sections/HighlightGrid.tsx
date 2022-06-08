import Component from 'vue-class-component'
import { FSXABaseSection } from 'fsxa-pattern-library'
import HighlightGrid from '../ui/HighlightGrid'
import { UiHighlightGrid as Payload } from '~/types'

@Component({
  name: 'HighlightGridSection'
})
export default class HighlightGridSection extends FSXABaseSection<Payload> {
  render() {
    return <HighlightGrid payload={this.payload as Payload} />
  }
}
