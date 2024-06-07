import {
  AggregateOptions,
  ConnectOptions,
  CreateOptions,
  FilterQuery,
  MongooseBaseQueryOptions,
  MongooseUpdateQueryOptions,
  ObjectId,
  PipelineStage,
  ProjectionType,
  QueryOptions,
  Require_id,
  ToObjectOptions,
  UpdateQuery
} from 'mongoose'

import {
  CountOptions,
  DeleteOptions,
  DeleteResult,
  UpdateOptions,
  UpdateResult
} from 'mongodb'

export {
  Types as MongoTypes,
  WriteConcern as MongoWriteConcern,
  Model as MongoModel,
  SchemaDefinition as MongoSchemaDefinition,
  SchemaOptions as MongoSchemaOptions,
  HydrateOptions as MongoHydrateOptions,
  HydratedDocument as MongoHydratedDocument,
  HydratedDocumentFromSchema as MongoHydratedDocumentFromSchema,
  HydratedSingleSubdocument as MongoHydratedSingleSubdocument,
  HydratedArraySubdocument as MongoHydratedArraySubdocument
} from 'mongoose'

/** @ignore */
export type IntConfigKeys =
  | 'MONGO_REPLICASET_COUNT'
  | 'MONGO_MIN_POOL_SIZE'
  | 'MONGO_MAX_POOL_SIZE'

/** @ignore */
export type IntConfigs<T> = {
  [key in IntConfigKeys]?: T
}

export interface MongoConfig {
  DBNAME: string
  CONNECTION_URI: string
  REPLICASET_COUNT: number
  OPTIONS: ConnectOptions
}

export type MongoCountOptions<TRawDocType> =
  | (CountOptions & MongooseBaseQueryOptions<TRawDocType>)
  | null

export type MongoConditionalDoc<TMongoDoc, TDoc, TIsLean> = TIsLean extends
  | null
  | false
  ? TMongoDoc
  : Require_id<TDoc>

export type MongoLeanOption =
  | boolean
  | { virtuals?: boolean | string[]; getters?: boolean; defaults: boolean }

export type MongoToObjOptions = ToObjectOptions | null

export type MongoCreateOptions = CreateOptions

export type MongoId = ObjectId | any

export type MongoQuery<TRawDocType> = FilterQuery<TRawDocType>

export type MongoQueryOptions<TRawDocType> = QueryOptions<TRawDocType> & {
  lean?: MongoLeanOption
}

export type MongoProjection<TRawDocType> = ProjectionType<TRawDocType> | null

export type MongoUpdateQuery<TRawDocType> = UpdateQuery<TRawDocType>

export type MongoUpdateQueryOptions<TRawDocType> =
  | (UpdateOptions & MongooseUpdateQueryOptions<TRawDocType>)
  | null

export type MongoUpdateResult = UpdateResult

export type MongoDeleteQueryOptions<TRawDocType> =
  | (DeleteOptions & MongooseBaseQueryOptions<TRawDocType>)
  | null

export type MongoDeleteResult = DeleteResult

export interface MongoSearchQuery<TRawDocType> {
  query: FilterQuery<TRawDocType>
  page?: number
  pageSize?: number
  sort?: QueryOptions<TRawDocType>['sort']
}

export type MongoPipelineStage = PipelineStage

export type MongoAggregateOptions = AggregateOptions

/**
 * Error mapping for customizing error messages and codes in Mongo.
 *
 * @export
 * @interface MongoErrorMap
 * @typedef {MongoErrorMap}
 */
export interface MongoErrorMap {
  /**
   * Custom message string for MongoError instance.
   */
  message?: string
  /**
   * Custom error code string for MongoError instance.
   */
  errorCode?: string
  /**
   * Custom HTTP status code for MongoError instance.
   */
  statusCode?: number
}

declare global {
  /** @ignore */
  interface Console {
    success?(...data: any[]): void
    fatal?(...data: any[]): void
  }
}
