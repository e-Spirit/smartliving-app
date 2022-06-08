import { NuxtConfig } from '@nuxt/types'

const isEditorMode = ($config: NuxtConfig | undefined = undefined) => {
  if (process.env?.FSXA_EDITOR_MODE) {
    return process.env.FSXA_EDITOR_MODE === 'on'
  }
  if ($config?.FSXA_EDITOR_MODE) {
    return $config.FSXA_EDITOR_MODE === 'on'
  }
  throw new Error('FSXA_EDITOR_MODE env/config is missing')
}
const isReleaseMode = ($notification: NuxtConfig | undefined = undefined) => {
  if (process.env?.FSXA_MODE) {
    return process.env.FSXA_MODE === 'preview'
  }
  if ($notification?.FSXA_MODE) {
    return $notification.FSXA_MODE === 'preview'
  }
  throw new Error('FSXA_MODE env/config is missing')
}

export const isAuthorisationActive = (
  $config: NuxtConfig | undefined = undefined
) => !isEditorMode($config)

export const isAuthenticationActive = (
  $config: NuxtConfig | undefined = undefined
) => !isEditorMode($config)

export const isNotificationActive = (
  $notification: NuxtConfig | undefined = undefined
) => !isReleaseMode($notification)
