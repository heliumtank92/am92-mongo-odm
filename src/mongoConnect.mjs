import mongoose from 'mongoose'
import MONGO_CONFIG from './MONGO_CONFIG.mjs'

const { CONNECTION_URI, OPTIONS } = MONGO_CONFIG

const mongoConnect = async () => {
  console.log('[Connection] Connecting to MongoDB...')
  await mongoose.connect(CONNECTION_URI, OPTIONS)
}

export default mongoConnect

mongoose.set('strictQuery', true)

mongoose.connection.on('connected', () => {
  console.log('[Info] Mongo Connection Established')
})

mongoose.connection.on('reconnected', () => {
  console.log('[Info] Mongo Connection Re-established')
})

mongoose.connection.on('disconnected', () => {
  console.log('[Error] Mongo Connection Disconnected')
})

mongoose.connection.on('close', () => {
  console.log('[Info] Mongo Connection Closed')
})

mongoose.connection.on('error', (error) => {
  throw error
})

if (process.env.NODE_ENV === 'development') { mongoose.set('debug', true) }
