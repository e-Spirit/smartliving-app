import axios from 'axios'

export const STORE_KEY_METADATA = 'metadata'
export const STORE_KEY_ROLES = 'roles'

export default function (app: any) {
  // @ts-ignore
  window.onNuxtReady(async () => {
    const $auth = app.$auth
    if (!$auth?.loggedIn) {
      return
    }
    // get app metadata
    try {
      const { data } = await axios.post(`/auth0-api/metadata`, {
        email: $auth.$storage.getUniversal('user').email
      })
      $auth.$storage.setUniversal(STORE_KEY_METADATA, data)
    } catch (err) {
      console.log(err)
    }
    // get roles
    try {
      const { data } = await axios.post(`/auth0-api/roles`, {
        sub: $auth.$storage.getUniversal('user').sub
      })
      $auth.$storage.setUniversal(STORE_KEY_ROLES, data)
    } catch (err) {
      console.log(err)
    }
  })
}
