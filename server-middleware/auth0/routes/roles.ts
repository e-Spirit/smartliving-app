import express, { NextFunction, Request, Response } from 'express'
import axios from 'axios'
import { AUTH0_API_BASE_URI, ROUTE_ROLES_URI, getAuthHeaders } from './../sdk'

const app = express()
app.use(express.json())

app.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data } = await axios.get(
      `${AUTH0_API_BASE_URI}users/${req.body.sub}/roles`,
      {
        headers: await getAuthHeaders()
      }
    )
    res.json(data)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

export default {
  handler: app,
  route: ROUTE_ROLES_URI
}
