import { FSXAContentMode, FSXARemoteApi } from 'fsxa-api'
export const API_BASE_ENDPOINT_URI = 'secondary-api'

const fsxaAPI = () => {
  return new FSXARemoteApi({
    apikey: process.env.FSXA_API_KEY || '',
    caasURL: process.env.FSXA_CAAS || '',
    navigationServiceURL: process.env.FSXA_NAVIGATION_SERVICE || '',
    tenantID: process.env.FSXA_TENANT_ID || '',
    projectID: process.env.FSXA_CORPORATE_PROJECT_ID || '',
    contentMode: FSXAContentMode.PREVIEW
  })
}

export { fsxaAPI }
