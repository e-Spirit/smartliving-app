import { Dataset } from 'fsxa-api'
import { FSXABaseSection } from 'fsxa-pattern-library'
import { Component, Watch } from 'vue-property-decorator'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import merge from 'lodash.merge'
import NewsOverview from '../ui/NewsOverview'
import {
  News as NewsSource,
  SOURCE_ID_PRIMARY,
  SOURCE_ID_SECONDARY,
  STORE_KEY_NEWS
} from '~/dataSources/News'
import { UiNews } from '~/types'
import Switch from '~/components/fsxa/ui/elements/Switch'
import { fetchByFilter } from '~/server-middleware/api/api.client.sdk'

interface Payload {
  st_list_size: number
  st_headline: string
  st_filter_button_1: string
  st_filter_button_2: string
  st_display_mode: { identifier: 'page' | 'overlay' }
  st_source_mode: { identifier: 'single' | 'aggregated' }
}
@Component({
  name: 'NewsOverviewSection'
})
export default class NewsOverviewSection extends FSXABaseSection<Payload> {
  dataSource?: NewsSource
  offsetTop = 0
  isLoading = false
  isEmptySources = false
  isInitialized = false
  reloadThreshold = 1000

  isPrimaryFilterActive = true
  isSecondaryFilterActive = true

  get news() {
    const allNews = this.getStoredItem<Dataset[]>(
      STORE_KEY_NEWS
    ) as unknown as UiNews[]
    return allNews?.filter((newsItem: UiNews) => {
      return (
        (newsItem.sourceId === SOURCE_ID_PRIMARY &&
          this.isPrimaryFilterActive) ||
        (newsItem.sourceId === SOURCE_ID_SECONDARY &&
          this.isSecondaryFilterActive)
      )
    })
  }

  
  async mounted() {
    this.setStoredItem(STORE_KEY_NEWS, [])

    const aggregatedConfig = this.isAggregated()
      ? [{ id: SOURCE_ID_SECONDARY, api: { fetchByFilter } }]
      : []

    this.dataSource = new NewsSource(
      [{ id: SOURCE_ID_PRIMARY, api: this.fsxaApi }, ...aggregatedConfig],
      this,
      this.payload.st_list_size
    )
    await new Promise((resolve) => setTimeout(resolve, 1000))
    await this.moreNews()
    this.isInitialized = true
  }

  created() {
    window.addEventListener('scroll', this.onScroll)
  }

  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll() {
    this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
  }

  isElementInViewport(el: Element, offset: number) {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom - offset <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  @Watch('offsetTop')
  offsetChange() {
    const item = document.querySelector('#loadNextBtn')
    if (item && this.isElementInViewport(item, this.reloadThreshold)) {
      this.moreNews()
    }
  }

  async moreNews() {
    if (!this.isLoading && !this.isEmptySources) {
      this.isLoading = true
      if (!(await this.dataSource?.fetchNextNews())) {
        this.isEmptySources = true
      }
    }
    this.isLoading = false
  }

  loaderJSX() {
    // case: "spinner"
    if (!this.isInitialized || this.isLoading) {
      return (
        <div class="flex flex-auto justify-center">
          <div class="fa-2x">
            <fa icon={faSpinner} class="fa-spin" />
          </div>
        </div>
      )
    }
    // case: no more api results
    if (this.isEmptySources) {
      return <span />
    }
    // case: reload trigger
    return <a id="loadNextBtn" />
  }

  private isAggregated() {
    return this.payload.st_source_mode.identifier === 'aggregated'
  }

  filterJSX() {
    return (
      <div class="flex py-4 flex-col md:flex-row">
        <Switch
          class="mb-3 md:mb-0"
          activeState={this.isPrimaryFilterActive}
          title={this.payload.st_filter_button_1}
          onClick={() => {
            this.isPrimaryFilterActive = !this.isPrimaryFilterActive
            if (!this.isPrimaryFilterActive && !this.isSecondaryFilterActive) {
              this.isSecondaryFilterActive = true
            }
          }}
        />
        <Switch
          activeState={this.isSecondaryFilterActive}
          title={this.payload.st_filter_button_2}
          onClick={() => {
            this.isSecondaryFilterActive = !this.isSecondaryFilterActive
            if (!this.isSecondaryFilterActive && !this.isPrimaryFilterActive) {
              this.isPrimaryFilterActive = true
            }
          }}
        />
      </div>
    )
  }

  render() {
    return (
      <NewsOverview>
        <div class="flex items-center">
          <h3 class="text-2xl font-bold float-left mb-7">
            {this.payload.st_headline}
          </h3>
        </div>
        <div class="mb-3">{this.isAggregated() ? this.filterJSX() : ''}</div>

        {this.news?.map((news) => {
          const newsProp = merge(news, {
            data: {
              display_mode: this.payload.st_display_mode.identifier,
              sourceId: news.sourceId,
              id: news.id
            }
          })
          // @ts-ignore
          return this.renderContentElement({
            ...newsProp,
            template: 'newscard'
          })
        })}
        {this.loaderJSX()}
      </NewsOverview>
    )
  }
}
