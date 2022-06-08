import { FSXABaseRichTextElement } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'RichTextText'
})
export default class Text extends FSXABaseRichTextElement {
  formatClass(style: string) {
    if (style === 'bold') {
      return 'font-bold'
    }
    return ''
  }

  render() {
    return (
      <span class={this.formatClass(this.data.format)}>
        {this.renderContent()}
      </span>
    )
  }
}
