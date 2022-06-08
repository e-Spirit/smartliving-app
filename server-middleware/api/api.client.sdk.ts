import { FetchElementParams } from 'fsxa-api'
import { ROUTE_NAME as FILTER_ROUTE_NAME } from './routes/filter'
import { ROUTE_NAME as ELEMENT_ROUTE_NAME } from './routes/element'
import { FetchByFilterParams } from '~/server-middleware/api/api.types'
import { API_BASE_ENDPOINT_URI } from '~/server-middleware/api/api.sdk'

const baseUrl = `${
  process.client && window ? window?.location.origin : 'http://localhost:3000'
}/${API_BASE_ENDPOINT_URI}`

export const fetchByFilter = async (params: FetchByFilterParams) => {
  const res = await fetch(
    `${baseUrl}/${FILTER_ROUTE_NAME}?${new URLSearchParams({
      params: JSON.stringify(params)
    })}`,
    {
      mode: 'cors',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
  return res.json()
}

export const fetchElement = async (params: FetchElementParams) => {
  const res = await fetch(
    `${baseUrl}/${ELEMENT_ROUTE_NAME}?${new URLSearchParams({
      params: JSON.stringify(params)
    })}`,
    {
      mode: 'cors',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
  return res.json()
}
