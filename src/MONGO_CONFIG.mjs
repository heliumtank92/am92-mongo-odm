const {
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

const USER_AUTH = MONGO_USER_AUTH === 'true'
const REPLICASET_COUNT = parseInt(MONGO_REPLICASET_COUNT, 10)
const POOL_SIZE = parseInt(MONGO_POOL_SIZE, 10)

const SSL_ENABLED = MONGO_SSL_ENABLED === 'true'
const SSL_VALIDATE = MONGO_SSL_VALIDATE === 'true'

const REQUIRED_CONFIG = [
  'MONGO_DBNAME',
  'MONGO_HOSTS'
]

if (USER_AUTH) {
  REQUIRED_CONFIG.push('MONGO_USERNAME')
  REQUIRED_CONFIG.push('MONGO_PASSWORD')
}

if (SSL_ENABLED) {
  REQUIRED_CONFIG.push('MONGO_PEM_PATH')
}

REQUIRED_CONFIG.forEach(key => {
  if (!process.env[key]) {
    console.error('[Error] Missing MongoDB Config:', key)
    return process.exit(1)
  }
})

if (isNaN(REPLICASET_COUNT)) {
  console.error(`[Error] Invalid MongoDB Config: MONGO_REPLICASET_COUNT=${MONGO_REPLICASET_COUNT}`)
  process.exit(1)
}

if (isNaN(POOL_SIZE)) {
  console.error(`[Error] Invalid MongoDB Config: MONGO_POOL_SIZE=${MONGO_POOL_SIZE}`)
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

const MONGO_CONFIG = {
  DBNAME: MONGO_DBNAME,
  CONNECTION_URI,
  REPLICASET_COUNT,
  OPTIONS: {
    retryWrites: false,
    replicaSet: MONGO_REPLICASET || undefined,
    readPreference: MONGO_READ_PREFERENCE,
    ...SSL_CONFIG
  }
}

export default MONGO_CONFIG
