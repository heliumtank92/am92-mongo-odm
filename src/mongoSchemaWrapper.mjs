import { Schema } from 'mongoose'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals'
import MONGO_CONFIG from './MONGO_CONFIG.mjs'

const { REPLICASET_COUNT } = MONGO_CONFIG
const maxWriteCount = REPLICASET_COUNT ? (REPLICASET_COUNT + 1) : 'majority'
const DEFAULT_OPTIONS = {
  timestamps: true
}

export default function mongoSchemaWrapper (schemaObject, options = {}) {
  const schemaOptions = { ...DEFAULT_OPTIONS, ...options }

  // Additional Feature: writeConcern.w = 'all'
  if (schemaOptions.writeConcern && schemaOptions.writeConcern.w === 'all') {
    schemaOptions.writeConcern.w = maxWriteCount
  }

  const schema = new Schema(schemaObject, schemaOptions)
  schema.plugin(mongooseLeanVirtuals)

  return schema
}
