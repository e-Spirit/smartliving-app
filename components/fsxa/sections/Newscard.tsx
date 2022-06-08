import { FSXABaseSection } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'
import NewsCard from '../ui/NewsCard'
import { UiNews, UiNews as Payload } from '~/types'

export interface Meta {
  route: string
}

@Component({
  name: 'NewsCardSection'
})
export default class NewsCardSection extends FSXABaseSection<Payload, Meta> {
  render() {
    return (
      <NewsCard
        payload={this.payload as UiNews & { display_mode: 'page' | 'overlay' }}
        route={this.meta.route}
      />
    )
  }
}
