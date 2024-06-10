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

/**
 * Builds a Mongoose schema with the provided schema definition and options.
 * This function also applies default plugins to the schema for handling lean queries.
 *
 * @export
 * @template TRawDocType The raw document type.
 * @template [TMongoModel=MongoModel<TRawDocType>] The Mongoose model type.
 * @template [TInstanceMethods={}] Instance methods for the schema.
 * @template [TQueryHelpers={}] Query helper methods for the schema.
 * @template [TVirtuals={}] Virtual properties for the schema.
 * @template [TStaticMethods={}] Static methods for the schema.
 * @param {MongoSchemaDefinition<TRawDocType>} schemaDefinition The definition of the schema.
 * @param {?MongoSchemaOptions<TRawDocType, TInstanceMethods, TQueryHelpers, TStaticMethods, TVirtuals>} [options] Optional settings for the schema.
 * @returns {MongoSchema<TRawDocType, TMongoModel, TInstanceMethods, TQueryHelpers, TVirtuals, TStaticMethods>} The constructed Mongoose schema.
 */
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
