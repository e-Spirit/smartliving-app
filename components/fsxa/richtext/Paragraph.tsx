import { FSXABaseRichTextElement } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'RichTextParagraph'
})
export default class Paragraph extends FSXABaseRichTextElement {
  render() {
    return <p>{this.renderContent()}</p>
    // return <p class="mb-8 text-xl text-gray-500">{this.renderContent()}</p>
  }
}
