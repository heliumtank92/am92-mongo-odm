import mongoose from 'mongoose'
import CONFIG, { SERVICE } from './CONFIG.mjs'

const { CONNECTION_URI, OPTIONS } = CONFIG

const mongoConnect = async () => {
  if (process.env.NODE_ENV !== 'production') {
    console.debug(`[${SERVICE} MongoOdm] Mongoose Debug Mode Enabled for Non-Production Mode.`)
  }
  console.info(`[${SERVICE} MongoOdm] Establishing MongoDB Connection...`)
  await mongoose.connect(CONNECTION_URI, OPTIONS)
}

export default mongoConnect

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

mongoose.connection.on('error', (error) => {
  const logFunc = console.fatal || console.error
  logFunc(`[${SERVICE} MongoOdm] MongoDB Connection Error`, error)
  process.exit(1)
})

if (process.env.NODE_ENV !== 'production') { mongoose.set('debug', true) }
