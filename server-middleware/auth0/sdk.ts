import axios from 'axios'

export const AUTH0_DOMAIN = process.env.FSXA_AUTH0_DOMAIN
export const AUTH0_CLIENT_ID = process.env.FSXA_AUTH0_M2M_CLIENT_ID
export const AUTH0_CLIENT_SECRET = process.env.FSXA_AUTH0_M2M_CLIENT_SECRET_ID
export const AUTH0_TOKEN_URI = `https://${AUTH0_DOMAIN}/oauth/token`
export const AUTH0_API_BASE_URI = `https://${AUTH0_DOMAIN}/api/v2/`

export const ROUTE_BASE = '/auth0-api'
export const ROUTE_METADATA = '/metadata'
export const ROUTE_METADATA_URI = `${ROUTE_BASE}${ROUTE_METADATA}`
export const ROUTE_ROLES = '/roles'
export const ROUTE_ROLES_URI = `${ROUTE_BASE}${ROUTE_ROLES}`

export const getAuthHeaders = async () => {
  const {
    data: { access_token, token_type }
  } = await axios.post(AUTH0_TOKEN_URI, {
    grant_type: 'client_credentials',
    client_id: AUTH0_CLIENT_ID,
    client_secret: AUTH0_CLIENT_SECRET,
    audience: AUTH0_API_BASE_URI
  })

  return {
    Authorization: `${token_type} ${access_token}`
  }
}
