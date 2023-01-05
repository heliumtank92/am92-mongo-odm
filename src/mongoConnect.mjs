import mongoose from 'mongoose'
import CONFIG, { SERVICE } from './CONFIG.mjs'

const { CONNECTION_URI, OPTIONS } = CONFIG

const mongoConnect = async () => {
  if (process.env.NODE_ENV !== 'production') {
    console.info(`[${SERVICE} MongoOdm] Mongoose Debug Mode Enabled for Non-Production Mode.`)
  }
  console.trace(`[${SERVICE} MongoOdm] Establishing MongoDB Connection...`)
  await mongoose.connect(CONNECTION_URI, OPTIONS)
}

export default mongoConnect

mongoose.set('strictQuery', true)

mongoose.connection.on('connected', () => {
  console.info(`[${SERVICE} MongoOdm] MongoDB Connection Established`)
})

mongoose.connection.on('reconnected', () => {
  console.info(`[${SERVICE} MongoOdm] MongoDB Connection Re-established`)
})

mongoose.connection.on('disconnected', () => {
  console.error(`[${SERVICE} MongoOdm] MongoDB Connection Disconnected`)
})

mongoose.connection.on('close', () => {
  console.trace(`[${SERVICE} MongoOdm] MongoDB Connection Closed`)
})

mongoose.connection.on('error', (error) => {
  console.error(`[${SERVICE} MongoOdm] MongoDB Connection Error`, error)
  throw error
})

if (process.env.NODE_ENV !== 'production') { mongoose.set('debug', true) }
