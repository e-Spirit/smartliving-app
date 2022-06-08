import express, { NextFunction, Request, Response } from 'express'
import axios from 'axios'
import {
  AUTH0_API_BASE_URI,
  ROUTE_METADATA_URI,
  getAuthHeaders
} from './../sdk'

const app = express()
app.use(express.json())

app.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      data: [{ app_metadata: metadata }]
    } = await axios.get(
      `${AUTH0_API_BASE_URI}users?q=email:"${req.body.email}"&search_engine=v3`,
      {
        headers: await getAuthHeaders()
      }
    )
    res.json(metadata)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

export default {
  handler: app,
  route: ROUTE_METADATA_URI
}
