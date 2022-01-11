import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export interface DBConfig {
  port: number
  debugLogging: boolean
  host: string
  username: string
  password: string
  database: string
  dbEntitiesPath: string[]
  migrationsPath: string[]
}

const isDevMode = process.env.NODE_ENV == 'development'

const DBConfig: DBConfig = {
  port: +(process.env.PORT || 5432),
  debugLogging: isDevMode,
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'testDB',
  dbEntitiesPath: [
    ...(isDevMode ? ['src/entity/**/*.ts'] : ['dist/entity/**/*.js']),
  ],
  migrationsPath: ['src/migration/**/*ts'],
}

export default DBConfig
