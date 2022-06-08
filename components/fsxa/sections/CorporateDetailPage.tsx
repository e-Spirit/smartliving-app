import { FSXABaseSection } from 'fsxa-pattern-library'
import { Component } from 'vue-property-decorator'
import merge from 'lodash.merge'
import clonedeep from 'lodash.clonedeep'
import { UiNews, UiNews as Payload } from '~/types'
import NewsDetailPage from '~/components/fsxa/ui/NewsDetailPage'

export interface Meta {
  route: string
}

@Component({
  name: 'News'
})
export default class CorporateDetailPage extends FSXABaseSection<
  Payload,
  Meta
> {
  get newsDetailEntry() {
    if (this.$route.query.id) {
      return this.$store.getters.newsItem(this.$route.query.id)
    }
  }

  render() {
    if (this.newsDetailEntry) {
      const newsProp = merge(clonedeep(this.newsDetailEntry.data), {
        data: {
          sourceId: this.newsDetailEntry.sourceId,
          id: this.newsDetailEntry.id
        }
      })
      return (
        <NewsDetailPage
          news={newsProp as UiNews & { display_type: 'page' | 'overlay' }}
        />
      )
    }

    return <div />
  }
}
