import { Component } from 'vue-property-decorator'
import { FSXABaseComponent } from 'fsxa-pattern-library'

@Component({
  name: 'NewsOverview'
})
export default class NewsOverview extends FSXABaseComponent {
  render() {
    return (
      <section class="pb-8 overflow-hidden">
        <div class="container px-4 mx-auto">{this.$slots.default}</div>
      </section>
    )
  }
}
