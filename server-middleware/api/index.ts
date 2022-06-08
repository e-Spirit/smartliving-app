import createMiddleware, { CustomRoute } from 'fsxa-nuxt-module/dist/api'
import { API_BASE_ENDPOINT_URI, fsxaAPI } from './api.sdk'
import Filter from './routes/filter'
import Element from './routes/element'

/**
 * you can add more routes endpoints here
 * */
const customRoutes: CustomRoute[] = [Filter, Element]
/**
 * all endpoints in custom routes will be exposed under the given path
 * */
export default {
  path: `/${API_BASE_ENDPOINT_URI}`,
  // @ts-ignore
  handler: createMiddleware({ customRoutes }, fsxaAPI())
}
