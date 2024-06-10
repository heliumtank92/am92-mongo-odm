import mongoose, { ConnectOptions } from 'mongoose'
import CONFIG, { SERVICE } from '../CONFIG'

/** @ignore */
const { CONNECTION_URI, OPTIONS } = CONFIG

/**
 * Connects to the MongoDB database using Mongoose.
 *
 * This function establishes a connection to the MongoDB database using the provided connection URI and options.
 * It also sets up various event listeners to handle connection events such as 'connected', 'reconnected', 'disconnected', 'close', and 'error'.
 *
 * In non-production environments, it enables Mongoose debug mode for more detailed logging.
 *
 * @export
 * @async
 * @param {?ConnectOptions} [connectOptions] Optional connection options to override the default options.
 * @returns {Promise<void>} A promise that resolves when the connection is successfully established.
 */
export async function mongoConnect(connectOptions?: ConnectOptions) {
  if (process.env.NODE_ENV !== 'production') {
    console.debug(
      `[${SERVICE} MongoOdm] Mongoose Debug Mode Enabled for Non-Production Mode.`
    )
  }

  console.info(`[${SERVICE} MongoOdm] Establishing MongoDB Connection...`)

  const thisConnectOptions = { ...connectOptions, ...OPTIONS }
  await mongoose.connect(CONNECTION_URI, thisConnectOptions)
}

mongoose.set('strictQuery', true)

mongoose.connection.on('connected', () => {
  const logFunc = console.success || console.info
  logFunc(`[${SERVICE} MongoOdm] MongoDB Connection Established`)
})

mongoose.connection.on('reconnected', () => {
  const logFunc = console.success || console.info
  logFunc(`[${SERVICE} MongoOdm] MongoDB Connection Re-established`)
})

mongoose.connection.on('disconnected', () => {
  console.error(`[${SERVICE} MongoOdm] MongoDB Connection Disconnected`)
})

mongoose.connection.on('close', () => {
  console.info(`[${SERVICE} MongoOdm] MongoDB Connection Closed`)
})

mongoose.connection.on('error', error => {
  const logFunc = console.fatal || console.error
  logFunc(`[${SERVICE} MongoOdm] MongoDB Connection Error`, error)
  process.exit(1)
})

if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true)
}
