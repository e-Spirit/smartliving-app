import axios from 'axios'

export class Caas {
  /**
   *
   * */
  async fetchEntity(id: string) {
    try {
      const { data } = await axios.get(
        `${process.env.FSXA_CAAS}/${process.env.FSXA_TENANT_ID}/${process.env.FSXA_PROJECT_ID}.${process.env.FSXA_MODE}.content/${id}`,
        {
          headers: {
            Authorization: `apikey="${process.env.FSXA_API_KEY}"`
          }
        }
      )
      return data
    } catch (err) {
      console.error('fetchEntity', err)
    }

    return new Promise(function (resolve) {
      resolve(undefined)
    })
  }
}
