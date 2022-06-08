import {
  ComparisonQueryOperatorEnum,
  Dataset,
  FetchResponse,
  GCAPage,
  Image,
  Page,
  QueryBuilderQuery
} from 'fsxa-api'
import flatten from 'lodash.flatten'
import { FSXABaseComponent } from 'fsxa-pattern-library'
import { FetchByFilterParams } from '~/server-middleware/api/api.types'
import { UiNews } from '~/types'

export const STORE_KEY_NEWS: string = 'news'
export const SOURCE_ID_PRIMARY: string = 'primary'
export const SOURCE_ID_SECONDARY: string = 'secondary'

enum Sort {
  'ASCENDING' = 1,
  'DESCENDING' = -1
}

interface Source {
  id: string
  api: {
    fetchByFilter: (...args: any[]) => Promise<FetchResponse>
  }
}

/**
 * Return new object for news quiering
 *
 */
export class News {
  currentPage = 1

  locale: string

  /**
   * Indicates if empty results came from sources
   * */
  noResults = false

  /**
   * @param sources list of apis with the "same" interface ^^
   * @param fsxaRef dependency is temporary used for retrieving fsxa_api and easy store access
   * @param pageSize page size
   * */
  constructor(
    private sources: Source[],
    private fsxaRef: FSXABaseComponent,
    readonly pageSize = 3
  ) {
    this.locale = fsxaRef.locale
  }

  /**
   * Calls all sources
   * */
  fetchNews(params: FetchByFilterParams) {
    return Promise.all(
      this.sources.map((_: Source) => {
        return _.api.fetchByFilter(params)
      })
    )
  }

  newsSortByDateFn = (a: { data: UiNews }, b: { data: UiNews }) =>
    b.data.date.localeCompare(a.data.date)

  /**
   * - fetches News from all sources
   * - add proper source id to each item
   * - merge with prev news in store
   * - prevent adding duplicates
   * - sort entries in store
   * */
  async fetchNextNews() {
    if (this.noResults) {
      return false
    }
    const newNewsRaw = await this.fetchNews(
      this.getNewsParams(this.currentPage, this.pageSize)
    )

    // remove new fsxa-api 7.x structure
    const newNewsRawNormalized = newNewsRaw.map((item) => item.items)

    // adds source id to each item
    const newNews = flatten(
      this.sources.map((source, index) => {
        if (
          !newNewsRawNormalized[index] ||
          !Array.isArray(newNewsRawNormalized[index])
        ) {
          return []
        }
        return newNewsRawNormalized[index].map((news: any) => {
          const sid = { sourceId: source.id }
          return { ...news, ...sid }
        })
      })
    )

    if (newNews.length === 0) {
      this.noResults = true
    }

    const oldNews = this.fsxaRef.getStoredItem(STORE_KEY_NEWS) || []
    this.currentPage++

    const duplicateFilteredNewNews =
      oldNews.length > 0
        ? newNews.filter((nItem) => {
            return oldNews.find((oItem: any) => oItem.id !== nItem.id)
          })
        : newNews
    this.fsxaRef.setStoredItem(
      STORE_KEY_NEWS,
      [...oldNews, ...duplicateFilteredNewNews].sort(this.newsSortByDateFn)
    )

    return true
  }

  /**
   * Returns the correct filter params for querying fsxa-api as well as secondary-api
   * */
  private getNewsParams(page = 1, pagesize = 2): FetchByFilterParams {
    const locale = this.locale
    const sort = {
      'formData.date.value': Sort.DESCENDING,
      _id: Sort.DESCENDING
    }
    const filters: QueryBuilderQuery[] = [
      {
        field: 'entityType',
        operator: ComparisonQueryOperatorEnum.EQUALS,
        value: 'news'
      },
      {
        field: 'formData.channel.value.identifier',
        operator: ComparisonQueryOperatorEnum.EQUALS,
        value: 'app'
      }
      /* {
        field: 'formData.author.value.value.target.identifier',
        operator: ComparisonQueryOperatorEnum.EQUALS,
        // value: '2009477c-9d4f-4021-982f-13d02fd43aab' // john doe
        value: '67e658b8-b1b3-46cc-ae8d-e2aecd1f8513xx' // hanz petra
      } */
    ]

    return {
      filters,
      locale,
      page,
      pagesize,
      additionalParams: {
        sort
      }
    }
  }
}
