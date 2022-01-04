import Koa from 'koa'
import helmet from 'koa-helmet'
import winston from 'winston'
import cors from '@koa/cors'
import jwt from 'koa-jwt'
import bodyParser from 'koa-body'
import router from './routes'
import { JWTConfig } from './configs/jwt.config'

const app = new Koa()

app.use(helmet())

app.use(cors())

app.use(bodyParser())

app.use(
  jwt({ secret: JWTConfig.secret }).unless({
    path: [/\/register/, /\/signIn/],
  })
)

app.use(router.routes())

app.listen(3000, () => {
  console.log(`listening at http://localhost:3000`)
})
