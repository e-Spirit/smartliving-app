import axios from 'axios'
import {
  AUTH0_API_BASE_URI,
  getAuthHeaders
} from '~/server-middleware/auth0/sdk'

export class Auth0ManagementSource {
  sub: string

  constructor(sub: string) {
    this.sub = sub
  }

  /**
   * Fetch role data from auth0 api
   * */
  async fetchRoles() {
    try {
      const { data } = await axios.get(
        `${AUTH0_API_BASE_URI}users/${this.sub}/roles`,
        {
          headers: await getAuthHeaders()
        }
      )
      return data
    } catch (err) {
      console.error('fetchRoles', err)
    }

    return new Promise(function (resolve) {
      resolve(undefined)
    })
  }
}
