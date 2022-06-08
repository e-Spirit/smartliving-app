import { FSXABaseRichTextElement } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'RichTextBlock'
})
export default class Block extends FSXABaseRichTextElement {
  formatClass(style: string) {
    if (style === 'format.headline_h2') {
      return 'max-w-md mx-auto lg:mx-0 mb-3 text-4xl lg:text-5xl text-white font-bold'
    }
    if (style === 'format.headline_h2_content') {
      return 'mb-10 text-3xl font-semibold font-heading'
    }
    if (style === 'format.main_color') {
      return 'text-primary'
    }
    if (style === 'format.banner_text') {
      return 'max-w-sm mx-auto lg:mx-0 mb-6 text-gray-400 leading-loose'
    }
    if (style === 'format.text_content') {
      return 'mb-8 text-xl text-gray-500'
    }
    return ''
  }

  render() {
    return (
      <div class={this.formatClass(this.data['data-fs-style'])}>
        {this.renderContent()}
      </div>
    )
  }
}
