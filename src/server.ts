import Koa from 'koa'
import helmet from 'koa-helmet'
import winston from 'winston'
import router from './routes'

const app = new Koa()

app.use(helmet())

app.use(router.routes())

app.use(router.routes())

app.listen(3000, () => {
  console.log(`listening at http://localhost:3000`)
})
