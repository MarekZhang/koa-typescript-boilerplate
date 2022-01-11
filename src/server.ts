import Koa from 'koa'
import helmet from 'koa-helmet'
import winston from 'winston'
import cors from '@koa/cors'
import jwt from 'koa-jwt'
import bodyParser from 'koa-body'
import router from './routes'
import { JWTConfig, DBConfig } from './configs'
import { createConnection, ConnectionOptions } from 'typeorm'

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: DBConfig.host,
  port: DBConfig.port,
  username: DBConfig.username,
  password: DBConfig.password,
  database: DBConfig.database,
  entities: DBConfig.dbEntitiesPath,
  migrations: DBConfig.migrationsPath,
  logging: false,
  synchronize: true,
}

createConnection(connectionOptions)
  .then(async () => {
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

    const port = process.env.PORT || 3000

    app.listen(port, () => {
      console.log(`Server running on port: ${port}`)
    })
  })
  .catch((error: string) => console.log('TypeORM connection error: ', error))
