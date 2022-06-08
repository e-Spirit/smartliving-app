import { Component, Prop } from 'vue-property-decorator'
import { FSXARichText } from 'fsxa-pattern-library'
import { UiTeaser } from '~/types'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'

interface UiElementProps {
  payload: UiTeaser
}

@Component({
  name: 'Teaser'
})
export default class Teaser extends BaseComponent<UiElementProps> {
  @Prop({ required: true }) payload!: UiElementProps['payload']

  render() {
    return (
      <div class="relative bg-indigo-800">
        <div class="absolute inset-0">
          <img
            class="w-full h-full object-cover"
            src={this.payload.st_picture?.resolutions.w200xh200.url}
            alt=""
          />
          <div
            class="absolute inset-0 bg-indigo-800 mix-blend-multiply"
            aria-hidden="true"
          />
        </div>
        <div class="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl">
            {this.payload.st_headline}
          </h1>
          <p class="mt-6 text-xl text-indigo-100 max-w-3xl">
            <FSXARichText content={this.payload.st_text || ''} />
          </p>
        </div>
      </div>
    )
  }
}
