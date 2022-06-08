import { FSXABaseRichTextElement } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'RichTextListItem'
})
export default class ListItem extends FSXABaseRichTextElement {
  render() {
    if (this.data['data-fs-property-pre']) {
      return (
        <li class="flex mb-8 items-center">
          <span class="flex-shrink-0 flex mr-4 items-center justify-center w-8 h-8 bg-gray-400 rounded-full text-gray-50 font-semibold font-heading">
            {this.data['data-fs-property-pre']}
          </span>
          <h3 class="text-2xl">{this.renderContent()}</h3>
        </li>
      )
    }

    return <li>{this.renderContent()}</li>
  }
}
