import { FSXABaseRichTextElement, FSXARichText } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'RichTextTranslation'
})
class Translation extends FSXABaseRichTextElement {
    get translationValue() {
        return this.getStoredItem('translations');
    }
  render() {
    console.log(this.translationValue)
    return <span>test</span>;
  }
}
export default Translation
