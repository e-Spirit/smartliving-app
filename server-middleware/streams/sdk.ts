const FSXA_CAAS = process.env.FSXA_CAAS || ''
const FSXA_TENANT_ID = process.env.FSXA_TENANT_ID || ''
const FSXA_PROJECT_ID = process.env.FSXA_PROJECT_ID || ''
const FSXA_MODE = process.env.FSXA_MODE || ''
const FSXA_CORPORATE_PROJECT_ID = process.env.FSXA_CORPORATE_PROJECT_ID || ''

export const CAAS_CHANGE_CHANNEL_ID = 'change'
export const FSXA_API_KEY = process.env.FSXA_API_KEY || ''
export const DEFAULT_COLLECTION_URL = `${FSXA_CAAS}/${FSXA_TENANT_ID}/${FSXA_PROJECT_ID}.${FSXA_MODE}.content`
export const CORPORATE_COLLECTION_URL = `${FSXA_CAAS}/${FSXA_TENANT_ID}/${FSXA_CORPORATE_PROJECT_ID}.${FSXA_MODE}.content`

export const EVENT_SOURCE_BASE_URL = '/change-stream'
export const EVENT_SOURCE_EVENT_URL = '/events'
