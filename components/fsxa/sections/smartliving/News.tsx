import { FSXABaseSection } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'
import { UiNews, UiNews as Payload } from '~/types'
import NewsDetailPage from '~/components/fsxa/ui/NewsDetailPage'

export interface Meta {
  route: string
}

@Component({
  name: 'News'
})
export default class News extends FSXABaseSection<Payload, Meta> {
  render() {
    return (
      <NewsDetailPage
        news={this.payload as UiNews & { display_type: 'page' | 'overlay' }}
      />
    )
  }
}
