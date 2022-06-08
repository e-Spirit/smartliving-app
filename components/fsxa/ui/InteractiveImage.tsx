import { Component, Prop } from 'vue-property-decorator'
import { Image } from 'fsxa-api'
import { Product, UiInteractiveImage } from '~/types'
import { BaseComponent } from '~/components/fsxa/base/BaseComponent'

interface UiElementProps {
  payload: UiInteractiveImage
  products: Product[]
  image: Image
}

@Component({
  name: 'InteractiveImage'
})
export default class InteractiveImage extends BaseComponent<UiElementProps> {
  @Prop({ required: true }) payload!: UiElementProps['payload']
  @Prop({ required: true }) image!: UiElementProps['image']
  @Prop({ required: true }) products!: UiElementProps['products']

  render() {
    return (
      <div>
        <img src={this.image.resolutions.w612xh321.url} alt="" />
      </div>
    )
  }
}
