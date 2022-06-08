import { CustomRoute, MiddlewareContext } from 'fsxa-nuxt-module/dist/api'
import { NextFunction, Request, Response } from 'express'
import { fsxaAPI } from '../api.sdk'

export const ROUTE_NAME = 'filter'

export default {
  handler: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: MiddlewareContext,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const result = await fsxaAPI().fetchByFilter(
      JSON.parse(request.query.params as string)
    )
    response.json(result)
    next()
  },
  route: `/${ROUTE_NAME}`
} as CustomRoute
