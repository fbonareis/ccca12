import express, { Request, Response } from 'express'
import HttpServer from './HttpServer'
import cors from 'cors'

// Frameworks and Drivers
export default class ExpressAdapter implements HttpServer {
  app: any

  constructor() {
    this.app = express()
    this.app.use(express.json())
    this.app.use(cors())
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  on(method: string, url: string, callback: Function): void {
    this.app[method](
      url.replace(/\{|\}/g, ''),
      async function (req: Request, res: Response) {
        try {
          const output = await callback(req.params, req.body)
          res.json(output)
        } catch (e: any) {
          res.status(422).send(e.message)
        }
      },
    )
  }

  listen(port: number): void {
    this.app.listen(port)
  }
}
