import Component from 'vue-class-component'
import { FSXABaseSection } from 'fsxa-pattern-library'
import Teaser from '../ui/Teaser'
import { UiTeaser as Payload } from '~/types'

@Component({
  name: 'TeaserSection'
})
export default class TeaserSection extends FSXABaseSection<Payload> {
  render() {
    return (
      <div>
        <Teaser payload={this.payload as Payload} />
      </div>
    )
  }
}
