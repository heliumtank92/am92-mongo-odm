import mongoose from 'mongoose'
import CONFIG from './CONFIG.mjs'
import logger from '@am92/api-logger'

const { CONNECTION_URI, OPTIONS } = CONFIG

const mongoConnect = async () => {
  logger.trace('[MongoOdm] Establishing MongoDB Connection...')
  await mongoose.connect(CONNECTION_URI, OPTIONS)
}

export default mongoConnect

mongoose.set('strictQuery', true)

mongoose.connection.on('connected', () => {
  logger.success('[MongoOdm] MongoDB Connection Established')
})

mongoose.connection.on('reconnected', () => {
  logger.success('[MongoOdm] MongoDB Connection Re-established')
})

mongoose.connection.on('disconnected', () => {
  logger.error('[MongoOdm] MongoDB Connection Disconnected')
})

mongoose.connection.on('close', () => {
  logger.trace('[MongoOdm] MongoDB Connection Closed')
})

mongoose.connection.on('error', (error) => {
  throw error
})

if (process.env.NODE_ENV === 'development') { mongoose.set('debug', true) }
