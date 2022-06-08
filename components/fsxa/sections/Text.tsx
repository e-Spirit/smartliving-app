import Component from 'vue-class-component'
import { FSXABaseSection } from 'fsxa-pattern-library'
import { UiText as Payload } from '~/types'
import TextElement from '~/components/fsxa/ui/Text'

@Component({
  name: 'TextSection'
})
export default class TextSection extends FSXABaseSection<Payload> {
  render() {
    return (
      <TextElement
        id={`st-${this.$props.id}`}
        payload={this.payload as Payload}
      />
    )
  }
}
