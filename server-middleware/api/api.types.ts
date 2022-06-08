import { QueryBuilderQuery } from 'fsxa-api'

export interface FetchByFilterParams {
  filters: QueryBuilderQuery[]
  locale: string
  page?: number
  pagesize?: number
  additionalParams?: Record<'keys' | string, any>
}
