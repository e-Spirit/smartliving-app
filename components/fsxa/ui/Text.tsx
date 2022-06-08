import { Component, Prop } from 'vue-property-decorator'
import { FSXARichText } from 'fsxa-pattern-library'
import { UiText } from '~/types'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'

interface UiElementProps {
  payload: UiText
}

@Component({
  name: 'TextElement'
})
export default class TextElement extends BaseComponent<UiElementProps> {
  @Prop({ required: true }) payload!: UiElementProps['payload']

  render() {
    return (
      <section class="py-20">
        <div class="container px-4 mx-auto">
          <div class="max-w-2xl mx-auto">
            <FSXARichText content={this.payload.st_text || ''} />
          </div>
        </div>
      </section>
    )
  }
}
