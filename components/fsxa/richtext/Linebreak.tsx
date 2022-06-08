import { FSXABaseRichTextElement } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'RichTextLinebreak'
})
export default class Linebreak extends FSXABaseRichTextElement {
  render() {
    return <br />
  }
}
