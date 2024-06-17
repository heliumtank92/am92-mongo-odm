import {
  AggregateOptions,
  ConnectOptions as MongoConnectOptions,
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

export { MongoConnectOptions }

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

/**
 * Configuration options for connecting to a MongoDB instance.
 *
 * @export
 * @interface MongoConfig
 * @typedef {MongoConfig}
 */
export interface MongoConfig {
  /**
   * The name of the database.
   *
   * @type {string}
   */
  DBNAME: string
  /**
   * The prefix to be used for collection names.
   *
   * @type {string}
   * @memberof MongoConfig
   */
  COLLECTION_PREFIX?: string
  /**
   * The URI for connecting to the MongoDB instance.
   *
   * @type {string}
   */
  CONNECTION_URI: string
  /**
   * The number of replica sets.
   *
   * @type {number}
   */
  REPLICASET_COUNT: number
  /**
   * Additional connection options.
   *
   * @type {MongoConnectOptions}
   */
  OPTIONS: MongoConnectOptions
}

/**
 * Options for counting documents in a MongoDB collection.
 *
 * @export
 * @typedef {MongoCountOptions}
 * @template TRawDocType
 */
export type MongoCountOptions<TRawDocType> =
  | (CountOptions & MongooseBaseQueryOptions<TRawDocType>)
  | null

/**
 * Conditional document type based on whether the document is lean.
 *
 * @export
 * @typedef {MongoConditionalDoc}
 * @template TMongoDoc
 * @template TDoc
 * @template TIsLean
 */
export type MongoConditionalDoc<TMongoDoc, TDoc, TIsLean> = TIsLean extends
  | null
  | false
  ? TMongoDoc
  : Require_id<TDoc>

/**
 * Options for lean queries in MongoDB.
 *
 * @export
 * @typedef {MongoLeanOption}
 */
export type MongoLeanOption =
  | boolean
  | { virtuals?: boolean | string[]; getters?: boolean; defaults: boolean }

/**
 * Options for converting a MongoDB document to an object.
 *
 * @export
 * @typedef {MongoToObjOptions}
 */
export type MongoToObjOptions = ToObjectOptions | null

/**
 * Options for creating a document in MongoDB.
 *
 * @export
 * @typedef {MongoCreateOptions}
 */
export type MongoCreateOptions = CreateOptions

/**
 * Type representing a MongoDB ObjectId.
 *
 * @export
 * @typedef {MongoId}
 */
export type MongoId = ObjectId | any

/**
 * Query type for filtering documents in MongoDB.
 *
 * @export
 * @typedef {MongoQuery}
 * @template TRawDocType
 */
export type MongoQuery<TRawDocType> = FilterQuery<TRawDocType>

/**
 * Options for querying documents in MongoDB.
 *
 * @export
 * @typedef {MongoQueryOptions}
 * @template TRawDocType
 */
export type MongoQueryOptions<TRawDocType> = QueryOptions<TRawDocType> & {
  lean?: MongoLeanOption
}

/**
 * Projection type for selecting fields in MongoDB queries.
 *
 * @export
 * @typedef {MongoProjection}
 * @template TRawDocType
 */
export type MongoProjection<TRawDocType> = ProjectionType<TRawDocType> | null

/**
 * Update query type for updating documents in MongoDB.
 *
 * @export
 * @typedef {MongoUpdateQuery}
 * @template TRawDocType
 */
export type MongoUpdateQuery<TRawDocType> = UpdateQuery<TRawDocType>

/**
 * Options for updating documents in MongoDB.
 *
 * @export
 * @typedef {MongoUpdateQueryOptions}
 * @template TRawDocType
 */
export type MongoUpdateQueryOptions<TRawDocType> =
  | (UpdateOptions & MongooseUpdateQueryOptions<TRawDocType>)
  | null

/**
 * Result type for update operations in MongoDB.
 *
 * @export
 * @typedef {MongoUpdateResult}
 */
export type MongoUpdateResult = UpdateResult

/**
 * Options for deleting documents in MongoDB.
 *
 * @export
 * @typedef {MongoDeleteQueryOptions}
 * @template TRawDocType
 */
export type MongoDeleteQueryOptions<TRawDocType> =
  | (DeleteOptions & MongooseBaseQueryOptions<TRawDocType>)
  | null

/**
 * Result type for delete operations in MongoDB.
 *
 * @export
 * @typedef {MongoDeleteResult}
 */
export type MongoDeleteResult = DeleteResult

/**
 * Interface for search queries in MongoDB.
 *
 * @export
 * @interface MongoSearchQuery
 * @typedef {MongoSearchQuery}
 * @template TRawDocType
 */
export interface MongoSearchQuery<TRawDocType> {
  /**
   * The query object for filtering documents.
   *
   * @type {?FilterQuery<TRawDocType>}
   */
  query?: FilterQuery<TRawDocType>
  /**
   * The page number for pagination.
   *
   * @type {?number}
   */
  page?: number
  /**
   * The number of documents per page for pagination.
   *
   * @type {?number}
   */
  pageSize?: number
  /**
   * The sort options for the query.
   *
   * @type {?QueryOptions<TRawDocType>['sort']}
   */
  sort?: QueryOptions<TRawDocType>['sort']
}

/**
 * Represents the result of a search query in MongoDB.
 *
 * @export
 * @interface MongoSearchResult
 * @typedef {MongoSearchResult}
 * @template TMongoDoc The type of the MongoDB document.
 * @template TDoc The type of the document after any transformations.
 * @template TIsLean Indicates whether the document is lean (plain JavaScript object) or not.
 */
export interface MongoSearchResult<TMongoDoc, TDoc, TIsLean> {
  /**
   * The page number for pagination.
   *
   * @type {number}
   */
  page: number
  /**
   * The number of documents per page for pagination.
   *
   * @type {number}
   */
  pageSize: number
  /**
   * The total number of documents that match the query.
   *
   * @type {number}
   */
  totalDocuments: number
  /**
   * The documents that match the query.
   *
   * @type {MongoConditionalDoc<TMongoDoc, TDoc, TIsLean>[]}
   */
  documents: MongoConditionalDoc<TMongoDoc, TDoc, TIsLean>[]
}

/**
 * Type representing a pipeline stage in MongoDB aggregation.
 *
 * @export
 * @typedef {MongoPipelineStage}
 */
export type MongoPipelineStage = PipelineStage

/**
 * Options for aggregation operations in MongoDB.
 *
 * @export
 * @typedef {MongoAggregateOptions}
 */
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
