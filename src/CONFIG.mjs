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
  MONGO_POOL_SIZE = '5'
} = process.env

const SERVICE = `${pkgName}@${pkgVersion}`
const logFunc = console.fatal || console.error

const USER_AUTH = MONGO_USER_AUTH === 'true'
const SSL_ENABLED = MONGO_SSL_ENABLED === 'true'
const SSL_VALIDATE = MONGO_SSL_VALIDATE === 'true'

const MISSING_CONFIG = []
const REQUIRED_CONFIG = [
  'MONGO_DBNAME',
  'MONGO_HOSTS'
]
const INT_CONFIGS = {
  MONGO_REPLICASET_COUNT,
  MONGO_POOL_SIZE
}
const INVALID_INT_CONFIG = {}

if (USER_AUTH) {
  REQUIRED_CONFIG.push('MONGO_USERNAME')
  REQUIRED_CONFIG.push('MONGO_PASSWORD')
}

if (SSL_ENABLED) {
  REQUIRED_CONFIG.push('MONGO_PEM_PATH')
}

REQUIRED_CONFIG.forEach(key => {
  if (!process.env[key]) {
    MISSING_CONFIG.push(key)
  }
})

if (MISSING_CONFIG.length) {
  logFunc(`[${SERVICE} MongoOdm] MongoOdm Config Missing: ${MISSING_CONFIG.join(', ')}`)
  process.exit(1)
}

Object.keys(INT_CONFIGS).forEach(key => {
  const value = INT_CONFIGS[key]
  INT_CONFIGS[key] = parseInt(value, 10)

  if (isNaN(INT_CONFIGS[key])) {
    INVALID_INT_CONFIG[key] = value
  }
})

if (Object.keys(INVALID_INT_CONFIG).length) {
  const logFunc = console.fatal || console.error
  logFunc(`[${SERVICE} MongoOdm] Invalid MongoOdm Integer Configs:`, INVALID_INT_CONFIG)
  process.exit(1)
}

const MONGO_CREDENTIALS = USER_AUTH && (encodeURIComponent(MONGO_USERNAME) + ':' + encodeURIComponent(MONGO_PASSWORD))
const CONNECTION_URI = USER_AUTH
  ? `mongodb://${MONGO_CREDENTIALS}@${MONGO_HOSTS}/${MONGO_DBNAME}`
  : `mongodb://${MONGO_HOSTS}/${MONGO_DBNAME}`

const SSL_CONFIG = SSL_ENABLED
  ? {
      ssl: SSL_ENABLED,
      sslValidate: SSL_VALIDATE,
      sslCA: MONGO_PEM_PATH
    }
  : {}

const CONFIG = {
  DBNAME: MONGO_DBNAME,
  CONNECTION_URI,
  REPLICASET_COUNT: INT_CONFIGS.MONGO_REPLICASET_COUNT,
  OPTIONS: {
    maxPoolSize: INT_CONFIGS.MONGO_POOL_SIZE,
    retryWrites: false,
    replicaSet: MONGO_REPLICASET || undefined,
    readPreference: MONGO_READ_PREFERENCE,
    ...SSL_CONFIG
  }
}

export default CONFIG

export { SERVICE }
