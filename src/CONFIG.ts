import { ConnectOptions } from 'mongoose'
import { IntConfigKeys, IntConfigs, MongoConfig } from './TYPES'

/** @ignore */
const {
  npm_package_name: pkgName = '',
  npm_package_version: pkgVersion = '',

  // Basic Details
  MONGO_HOSTS = '',
  MONGO_DBNAME = '',

  // User Auth Details
  MONGO_USER_AUTH = 'false',
  MONGO_USERNAME = '',
  MONGO_PASSWORD = '',

  // Replica Details
  MONGO_REPLICASET = '',
  MONGO_REPLICASET_COUNT = '0',
  MONGO_READ_PREFERENCE,

  // SSL Details
  MONGO_SSL_ENABLED = 'false',
  MONGO_SSL_VALIDATE = 'false',
  MONGO_PEM_PATH = '',

  // Other Details
  MONGO_MIN_POOL_SIZE = '0',
  MONGO_MAX_POOL_SIZE = '100'
} = process.env

/** @ignore */
const errorLogFunc = console.fatal || console.error

/** @ignore */
export const SERVICE = `${pkgName}@${pkgVersion}`

/** @ignore */
const REQUIRED_CONFIG: string[] = ['MONGO_DBNAME', 'MONGO_HOSTS']
/** @ignore */
const MISSING_CONFIGS: string[] = []

/** @ignore */
const INT_ENV: IntConfigs<string> = {
  MONGO_REPLICASET_COUNT,
  MONGO_MIN_POOL_SIZE,
  MONGO_MAX_POOL_SIZE
}

/** @ignore */
const INT_CONFIG: IntConfigs<number> = {}

/** @ignore */
const INVALID_INT_CONFIG: IntConfigs<string> = {}

/** @ignore */
const USER_AUTH = MONGO_USER_AUTH === 'true'
/** @ignore */
const SSL_ENABLED = MONGO_SSL_ENABLED === 'true'
/** @ignore */
const SSL_VALIDATE = MONGO_SSL_VALIDATE === 'true'

if (USER_AUTH) {
  REQUIRED_CONFIG.push('MONGO_USERNAME')
  REQUIRED_CONFIG.push('MONGO_PASSWORD')
}

if (SSL_ENABLED) {
  REQUIRED_CONFIG.push('MONGO_PEM_PATH')
}

REQUIRED_CONFIG.forEach(key => {
  if (!process.env[key]) {
    MISSING_CONFIGS.push(key)
  }
})

if (MISSING_CONFIGS.length) {
  errorLogFunc(
    `[${SERVICE} MongoOdm] MongoOdm Config Missing: ${MISSING_CONFIGS.join(
      ', '
    )}`
  )
  process.exit(1)
}

Object.keys(INT_ENV).forEach(key => {
  const configKey = key as IntConfigKeys
  const value = INT_ENV[configKey] || '0'
  const intValue = parseInt(value, 10)

  if (isNaN(intValue)) {
    INVALID_INT_CONFIG[configKey] = value
  } else {
    INT_CONFIG[configKey] = intValue
  }
})

if (Object.keys(INVALID_INT_CONFIG).length) {
  const logFunc = console.fatal || console.error
  logFunc(
    `[${SERVICE} MongoOdm] Invalid MongoOdm Integer Configs:`,
    INVALID_INT_CONFIG
  )
  process.exit(1)
}

/** @ignore */
const MONGO_CREDENTIALS =
  USER_AUTH &&
  encodeURIComponent(MONGO_USERNAME) + ':' + encodeURIComponent(MONGO_PASSWORD)

/** @ignore */
const CONNECTION_URI = USER_AUTH
  ? `mongodb://${MONGO_CREDENTIALS}@${MONGO_HOSTS}/${MONGO_DBNAME}`
  : `mongodb://${MONGO_HOSTS}/${MONGO_DBNAME}`

/** @ignore */
const SSL_CONFIG = SSL_ENABLED
  ? {
      ssl: SSL_ENABLED,
      sslValidate: SSL_VALIDATE,
      sslCA: MONGO_PEM_PATH
    }
  : {}

const CONFIG: MongoConfig = {
  DBNAME: MONGO_DBNAME,
  CONNECTION_URI,
  REPLICASET_COUNT: INT_CONFIG.MONGO_REPLICASET_COUNT || 0,
  OPTIONS: {
    minPoolSize: INT_CONFIG.MONGO_MIN_POOL_SIZE || 0,
    maxPoolSize: INT_CONFIG.MONGO_MAX_POOL_SIZE || 100,
    retryWrites: false,
    replicaSet: MONGO_REPLICASET || undefined,
    readPreference: MONGO_READ_PREFERENCE as ConnectOptions['readPreference'],
    ...SSL_CONFIG
  }
}

export default CONFIG
