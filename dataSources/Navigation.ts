import axios from 'axios'
import { NavigationData } from 'fsxa-api'

export class NavigationSource {
  /**
   * Fetch navigation data from navigation service
   * */
  async fetchNavigation(locale = 'en_GB'): Promise<NavigationData | undefined> {
    try {
      const { data } = await axios.get(
        `${process.env.FSXA_NAVIGATION_SERVICE}/${process.env.FSXA_MODE}.${process.env.FSXA_PROJECT_ID}?language=${locale}&format=caas`,
        {
          headers: {
            Authorization: `apikey="${process.env.FSXA_API_KEY}"`
          }
        }
      )
      return data
    } catch (err) {
      console.log('fetchNavigation', err)
    }

    return new Promise(function (resolve) {
      resolve(undefined)
    })
  }

  async fetchLocaleByRoute(initialPath: string) {
    try {
      const {
        data: {
          meta: {
            identifier: { languageId }
          }
        }
      } = await axios.get(
        `${process.env.FSXA_NAVIGATION_SERVICE}/${process.env.FSXA_MODE}.${process.env.FSXA_PROJECT_ID}/by-seo-route${initialPath}?&format=caas`,
        {
          headers: {
            Authorization: `apikey="${process.env.FSXA_API_KEY}"`
          }
        }
      )
      return languageId
    } catch (err) {
      console.log('fetchLocaleByRoute', err)
    }

    return new Promise(function (resolve) {
      resolve(undefined)
    })
  }
}
