import path from 'path'
import {
  isAuthorisationActive,
  isNotificationActive
} from './services/permissions'

const serverMiddleware = () => {
  const def = [
    { handler: '~/server-middleware/api' },
    '~/server-middleware/auth0/routes/metadata.ts',
    '~/server-middleware/auth0/routes/roles.ts'
  ]
  const streams = isNotificationActive() ? ['~/server-middleware/streams'] : []

  return [...def, ...streams]
}

export default {
  ssr: true,
  privateRuntimeConfig: {
    FSXA_EDITOR_MODE: process.env.FSXA_EDITOR_MODE
  },
  publicRuntimeConfig: {
    FSXA_AUTH0_CLIENT_ID: process.env.FSXA_AUTH0_CLIENT_ID,
    FSXA_AUTH0_DOMAIN: process.env.FSXA_AUTH0_DOMAIN,
    FSXA_MODE: process.env.FSXA_MODE,
    FSXA_CS_WS_URL: process.env.FSXA_CS_WS_URL,
    FSXA_CLIENT_BASE_URL:
      process.env.FSXA_HOST +
      (process.env.FSXA_PORT ? ':' + process.env.FSXA_PORT : ''),
    NUXT_HOST: process.env.NUXT_HOST,
    NUXT_PORT: process.env.NUXT_PORT,
    FSXA_HOST: process.env.FSXA_HOST,
    FSXA_PORT: process.env.FSXA_PORT,
    FSXA_MAPS_APIKEY: process.env.FSXA_MAPS_APIKEY,
    FSXA_EDITOR_MODE: process.env.FSXA_EDITOR_MODE,
    FSXA_LOGIN_PATH_DE: process.env.FSXA_LOGIN_PATH_DE,
    FSXA_LOGIN_PATH_EN: process.env.FSXA_LOGIN_PATH_EN
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  serverMiddleware: serverMiddleware(),
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    'fsxa-pattern-library/dist/fsxa-pattern-library.css',
    // 'fsxa-ui/dist/fsxa-ui.css',
    '~/assets/css/global.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/apexcharts.ts', ssr: false },
    { src: '~/plugins/scrollTo.ts' }
    // { src: '~/plugins/appmetadata.ts', ssr: false }
  ],
  router: {
    middleware: isAuthorisationActive() ? ['authLoggedInCheck'] : []
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/pwa',
    'nuxt-fontawesome'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    [
      'fsxa-nuxt-module',
      {
        NUXT_HOST: process.env.NUXT_HOST,
        NUXT_PORT: process.env.NUXT_PORT,
        FSXA_HOST: process.env.FSXA_HOST,
        FSXA_PORT: process.env.FSXA_PORT
      }
    ],
    '@nuxtjs/auth-next'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  auth: {
    local: false,
    redirect: {
      callback: '/callback/'
    },
    strategies: {
      auth0: {
        domain: process.env.FSXA_AUTH0_DOMAIN,
        clientId: process.env.FSXA_AUTH0_CLIENT_ID
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: ['appmetadata'],
    babel: {
      plugins: [
        [
          '@babel/plugin-proposal-decorators',
          {
            legacy: true
          }
        ],
        [
          '@babel/plugin-proposal-class-properties',
          {
            loose: true
          }
        ]
      ]
    },
    /*
     ** You can extend webpack config here
     */
    extend(config: any) {
      config!.resolve!.alias!.vue = path.resolve('./node_modules/vue')
      /* config.node = {
        fs: 'empty'
      } */
    }
  },
  buildDir: 'dist',
  server: {
    port: 3000
  },
  pwa: {
    manifest: {
      name: 'smartliving-app'
    }
  },
  fontawesome: {
    component: 'fa',
    icons: {
      solid: ['faHome'],
      regular: ['faAdjust']
    }
  }
}
