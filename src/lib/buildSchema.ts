import mongooseLeanDefaults from 'mongoose-lean-defaults'
import mongooseLeanGetters from 'mongoose-lean-getters'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals'
import { MongoSchema } from './mongoose'

import CONFIG from '../CONFIG'
import {
  MongoModel,
  MongoSchemaDefinition,
  MongoSchemaOptions,
  MongoWriteConcern
} from '../TYPES'

export function buildSchema<
  TRawDocType,
  TMongoModel = MongoModel<TRawDocType>,
  TInstanceMethods = {},
  TQueryHelpers = {},
  TVirtuals = {},
  TStaticMethods = {}
>(
  schemaDefinition: MongoSchemaDefinition<TRawDocType>,
  options?: MongoSchemaOptions<
    TRawDocType,
    TInstanceMethods,
    TQueryHelpers,
    TStaticMethods,
    TVirtuals
  >
): MongoSchema<
  TRawDocType,
  TMongoModel,
  TInstanceMethods,
  TQueryHelpers,
  TVirtuals,
  TStaticMethods
> {
  const schemaOptions = {
    timestamps: true,
    writeConcern: {
      w: CONFIG.REPLICASET_COUNT ? CONFIG.REPLICASET_COUNT + 1 : 'majority'
    } as MongoWriteConcern,
    ...options
  }

  const schema = new MongoSchema<
    TRawDocType,
    TMongoModel,
    TInstanceMethods,
    TQueryHelpers,
    TVirtuals,
    TStaticMethods,
    MongoSchemaOptions<
      TRawDocType,
      TInstanceMethods,
      TQueryHelpers,
      TStaticMethods,
      TVirtuals
    >
  >(schemaDefinition, schemaOptions)

  schema.plugin(mongooseLeanDefaults)
  schema.plugin(mongooseLeanGetters)
  schema.plugin(mongooseLeanVirtuals)

  return schema
}
