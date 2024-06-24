import { mongoose, MongoSchema } from './mongoose'
import { MongoError } from '../MongoError'
import {
  MongoAggregateOptions,
  MongoConditionalDoc,
  MongoCountOptions,
  MongoCreateOptions,
  MongoDeleteQueryOptions,
  MongoDeleteResult,
  MongoId,
  MongoModel,
  MongoPipelineStage,
  MongoProjection,
  MongoQuery,
  MongoQueryOptions,
  MongoSearchQuery,
  MongoSearchResult,
  MongoToObjOptions,
  MongoUpdateQuery,
  MongoUpdateQueryOptions,
  MongoUpdateResult
} from '../TYPES'
import { getLeanOption } from './helpers'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_SORT } from '../CONSTANTS'
import CONFIG from '../CONFIG'

/**
 * A generic model class for interacting with MongoDB collections using Mongoose.
 *
 * @export
 * @class Model
 * @typedef {Model}
 * @template TRawDocType
 * @template {MongoModel<TRawDocType>} [TMongoModel=MongoModel<TRawDocType>]
 */
export class Model<
  TRawDocType,
  TMongoModel extends MongoModel<TRawDocType> = MongoModel<TRawDocType>
> {
  /**
   * The name of the model.
   *
   * @type {string}
   */
  ModelName: string
  /**
   * The Mongoose model instance.
   *
   * @type {TMongoModel}
   */
  MongoModel: TMongoModel

  /**
   * Creates an instance of Model.
   *
   * @constructor
   * @param {string} [modelName=''] - The name of the model.
   * @param {MongoSchema} schema - The schema definition for the model.
   */
  constructor(modelName: string = '', schema: MongoSchema) {
    this.ModelName = `${CONFIG.COLLECTION_PREFIX}${modelName}`
    this.MongoModel = mongoose.model<TRawDocType, TMongoModel>(
      this.ModelName,
      schema
    )

    // Method Hard Binding
    this.getCount = this.getCount.bind(this)
    this.createOne = this.createOne.bind(this)
    this.createMany = this.createMany.bind(this)
    this.replaceAll = this.replaceAll.bind(this)

    this.findById = this.findById.bind(this)
    this.findOne = this.findOne.bind(this)
    this.findMany = this.findMany.bind(this)
    this.findOneBy = this.findOneBy.bind(this)
    this.findManyBy = this.findManyBy.bind(this)

    this.updateById = this.updateById.bind(this)
    this.updateOne = this.updateOne.bind(this)
    this.updateMany = this.updateMany.bind(this)
    this.updateOneBy = this.updateOneBy.bind(this)
    this.updateManyBy = this.updateManyBy.bind(this)

    this.removeById = this.removeById.bind(this)
    this.removeOne = this.removeOne.bind(this)
    this.removeMany = this.removeMany.bind(this)

    this.list = this.list.bind(this)
    this.search = this.search.bind(this)
    this.aggregate = this.aggregate.bind(this)
  }

  /**
   * Gets the count of documents matching the query.
   *
   * @async
   * @template {MongoQuery<TRawDocType>} TQuery
   * @template {MongoCountOptions<TRawDocType>} TOptions
   * @param {?TQuery} [query] The query object.
   * @param {?TOptions} [options] The options for counting documents.
   * @returns {Promise<number>} The count of documents.
   */
  async getCount<
    TQuery extends MongoQuery<TRawDocType>,
    TOptions extends MongoCountOptions<TRawDocType>
  >(query?: TQuery, options?: TOptions): Promise<number> {
    try {
      const count = await this.MongoModel.countDocuments(query, options)
      return count
    } catch (error) {
      throw new MongoError(error)
    }
  }

  /**
   * Creates a single document in the collection.
   *
   * @async
   * @template {Partial<TRawDocType>} TDoc
   * @template {MongoToObjOptions} TToObjOptions
   * @param {TDoc} doc The document to create.
   * @param {?TToObjOptions} [toObjOptions] Options for converting the document to an object.
   * @returns {Promise<MongoConditionalDoc<InstanceType<typeof this.MongoModel>, TRawDocType, TToObjOptions>>} The created document.
   */
  async createOne<
    TDoc extends Partial<TRawDocType>,
    TToObjOptions extends MongoToObjOptions
  >(
    doc: TDoc,
    toObjOptions?: TToObjOptions
  ): Promise<
    MongoConditionalDoc<
      InstanceType<typeof this.MongoModel>,
      TRawDocType,
      TToObjOptions
    >
  > {
    try {
      const document = await this.MongoModel.create(doc)

      if (toObjOptions === null) {
        return document as MongoConditionalDoc<
          InstanceType<typeof this.MongoModel>,
          TRawDocType,
          TToObjOptions
        >
      }

      const pojo = document.toObject(toObjOptions)
      return pojo as MongoConditionalDoc<
        InstanceType<typeof this.MongoModel>,
        TRawDocType,
        TToObjOptions
      >
    } catch (error) {
      throw new MongoError(error)
    }
  }

  /**
   * Creates multiple documents in the collection.
   *
   * @async
   * @template {Partial<TRawDocType>[]} TDocs
   * @template {MongoCreateOptions} TCreateOptions
   * @template {MongoToObjOptions} TToObjOptions
   * @param {TDocs} docs The documents to create.
   * @param {?TCreateOptions} [createOptions] Options for creating documents.
   * @param {?TToObjOptions} [toObjOptions] Options for converting the documents to objects.
   * @returns {Promise<MongoConditionalDoc<InstanceType<typeof this.MongoModel>, TRawDocType, TToObjOptions>[]>} The created documents.
   */
  async createMany<
    TDocs extends Partial<TRawDocType>[],
    TCreateOptions extends MongoCreateOptions,
    TToObjOptions extends MongoToObjOptions
  >(
    docs: TDocs,
    createOptions?: TCreateOptions,
    toObjOptions?: TToObjOptions
  ): Promise<
    MongoConditionalDoc<
      InstanceType<typeof this.MongoModel>,
      TRawDocType,
      TToObjOptions
    >[]
  > {
    try {
      const documents = await this.MongoModel.create(docs, createOptions)

      if (toObjOptions === null) {
        return documents as MongoConditionalDoc<
          InstanceType<typeof this.MongoModel>,
          TRawDocType,
          TToObjOptions
        >[]
      }

      const pojos = documents.map(document => document.toObject(toObjOptions))
      return pojos as MongoConditionalDoc<
        InstanceType<typeof this.MongoModel>,
        TRawDocType,
        TToObjOptions
      >[]
    } catch (error) {
      throw new MongoError(error)
    }
  }

  /**
   * Replaces all documents in the collection with the provided documents.
   *
   * @async
   * @template {Partial<TRawDocType>[]} TDocs
   * @template {MongoCreateOptions} TCreateOptions
   * @template {MongoToObjOptions} TToObjOptions
   * @param {TDocs} docs The documents to replace with.
   * @param {?TCreateOptions} [createOptions] Options for creating documents.
   * @param {?TToObjOptions} [toObjOptions] Options for converting the documents to objects.
   * @returns {Promise<MongoConditionalDoc<InstanceType<typeof this.MongoModel>, TRawDocType, TToObjOptions>[]>} The replaced documents.
   */
  async replaceAll<
    TDocs extends Partial<TRawDocType>[],
    TCreateOptions extends MongoCreateOptions,
    TToObjOptions extends MongoToObjOptions
  >(
    docs: TDocs,
    createOptions?: TCreateOptions,
    toObjOptions?: TToObjOptions
  ): Promise<
    MongoConditionalDoc<
      InstanceType<typeof this.MongoModel>,
      TRawDocType,
      TToObjOptions
    >[]
  > {
    await this.removeMany({})
    const documents = await this.createMany(docs, createOptions, toObjOptions)
    return documents
  }

  /**
   * Finds a document by its ID.
   *
   * @async
   * @template {MongoId} TId
   * @template {MongoProjection<TRawDocType>} TProjection
   * @template {MongoQueryOptions<TRawDocType>} TOptions
   * @param {TId} id The ID of the document to find.
   * @param {?TProjection} [projection] The projection for the query.
   * @param {?TOptions} [options] The options for the query.
   * @returns {Promise<MongoConditionalDoc<InstanceType<typeof this.MongoModel>, TRawDocType, TOptions['lean']>>} The found document.
   */
  async findById<
    TId extends MongoId,
    TProjection extends MongoProjection<TRawDocType>,
    TOptions extends MongoQueryOptions<TRawDocType>
  >(
    id: TId,
    projection?: TProjection,
    options?: TOptions
  ): Promise<
    MongoConditionalDoc<
      InstanceType<typeof this.MongoModel>,
      TRawDocType,
      TOptions['lean']
    >
  > {
    try {
      const findOptions = {
        sanitizeProjection: true,
        ...options,
        lean: getLeanOption(options?.lean)
      }

      const doc = await this.MongoModel.findById(id, projection, findOptions)

      if (!doc) {
        const error = {
          message: 'Document Not Found',
          name: 'DocumentNotFoundError',
          errors: { id, projection, options }
        }
        throw new MongoError(error)
      }

      return doc as MongoConditionalDoc<
        InstanceType<typeof this.MongoModel>,
        TRawDocType,
        TOptions['lean']
      >
    } catch (error) {
      throw new MongoError(error)
    }
  }

  /**
   * Finds a single document matching the query.
   *
   * @async
   * @template {MongoQuery<TRawDocType>} TQuery
   * @template {MongoProjection<TRawDocType>} TProjection
   * @template {MongoQueryOptions<TRawDocType>} TOptions
   * @param {TQuery} query The query object.
   * @param {?TProjection} [projection] The projection for the query.
   * @param {?TOptions} [options] The options for the query.
   * @returns {Promise<null | MongoConditionalDoc<InstanceType<typeof this.MongoModel>, TRawDocType, TOptions['lean']>>} The found document or null if not found.
   */
  async findOne<
    TQuery extends MongoQuery<TRawDocType>,
    TProjection extends MongoProjection<TRawDocType>,
    TOptions extends MongoQueryOptions<TRawDocType>
  >(
    query: TQuery,
    projection?: TProjection,
    options?: TOptions
  ): Promise<null | MongoConditionalDoc<
    InstanceType<typeof this.MongoModel>,
    TRawDocType,
    TOptions['lean']
  >> {
    try {
      const findOptions = {
        sanitizeProjection: true,
        ...options,
        lean: getLeanOption(options?.lean)
      }

      const doc = await this.MongoModel.findOne(query, projection, findOptions)

      if (!doc) {
        return null
      }

      return doc as MongoConditionalDoc<
        InstanceType<typeof this.MongoModel>,
        TRawDocType,
        TOptions['lean']
      >
    } catch (error) {
      throw new MongoError(error)
    }
  }

  /**
   * Finds multiple documents matching the query.
   *
   * @async
   * @template {MongoQuery<TRawDocType>} TQuery
   * @template {MongoProjection<TRawDocType>} TProjection
   * @template {MongoQueryOptions<TRawDocType>} TOptions
   * @param {TQuery} query The query object.
   * @param {?TProjection} [projection] The projection for the query.
   * @param {?TOptions} [options] The options for the query.
   * @returns {Promise<MongoConditionalDoc<InstanceType<typeof this.MongoModel>, TRawDocType, TOptions['lean']>[]>} The found documents.
   */
  async findMany<
    TQuery extends MongoQuery<TRawDocType>,
    TProjection extends MongoProjection<TRawDocType>,
    TOptions extends MongoQueryOptions<TRawDocType>
  >(
    query: TQuery,
    projection?: TProjection,
    options?: TOptions
  ): Promise<
    MongoConditionalDoc<
      InstanceType<typeof this.MongoModel>,
      TRawDocType,
      TOptions['lean']
    >[]
  > {
    try {
      const findOptions = {
        sanitizeProjection: true,
        ...options,
        lean: getLeanOption(options?.lean)
      }

      const docs = await this.MongoModel.find(query, projection, findOptions)

      return docs as MongoConditionalDoc<
        InstanceType<typeof this.MongoModel>,
        TRawDocType,
        TOptions['lean']
      >[]
    } catch (error) {
      throw new MongoError(error)
    }
  }

  /**
   * Finds a single document by a key-value pair.
   *
   * @async
   * @template {string} TKey
   * @template {any} TValue
   * @template {MongoProjection<TRawDocType>} TProjection
   * @template {MongoQueryOptions<TRawDocType>} TOptions
   * @param {TKey} key The key to search by.
   * @param {TValue} value The value to search for.
   * @param {?TProjection} [projection] The projection for the query.
   * @param {?TOptions} [options] The options for the query.
   * @returns {Promise<null | MongoConditionalDoc<InstanceType<typeof this.MongoModel>, TRawDocType, TOptions['lean']>>} The found document or null if not found.
   */
  async findOneBy<
    TKey extends string,
    TValue extends any,
    TProjection extends MongoProjection<TRawDocType>,
    TOptions extends MongoQueryOptions<TRawDocType>
  >(
    key: TKey,
    value: TValue,
    projection?: TProjection,
    options?: TOptions
  ): Promise<null | MongoConditionalDoc<
    InstanceType<typeof this.MongoModel>,
    TRawDocType,
    TOptions['lean']
  >> {
    const query = { [key]: value } as MongoQuery<TRawDocType>
    const doc = this.findOne(query, projection, options)
    return doc
  }

  /**
   * Finds multiple documents by a key-value pair.
   *
   * @async
   * @template {string} TKey
   * @template {any} TValue
   * @template {MongoProjection<TRawDocType>} TProjection
   * @template {MongoQueryOptions<TRawDocType>} TOptions
   * @param {TKey} key The key to search by.
   * @param {TValue} value The value to search for.
   * @param {?TProjection} [projection] The projection for the query.
   * @param {?TOptions} [options] The options for the query.
   * @returns {Promise<MongoConditionalDoc<InstanceType<typeof this.MongoModel>, TRawDocType, TOptions['lean']>[]>} The found documents.
   */
  async findManyBy<
    TKey extends string,
    TValue extends any,
    TProjection extends MongoProjection<TRawDocType>,
    TOptions extends MongoQueryOptions<TRawDocType>
  >(
    key: TKey,
    value: TValue,
    projection?: TProjection,
    options?: TOptions
  ): Promise<
    MongoConditionalDoc<
      InstanceType<typeof this.MongoModel>,
      TRawDocType,
      TOptions['lean']
    >[]
  > {
    const query = { [key]: value } as MongoQuery<TRawDocType>
    const docs = this.findMany(query, projection, options)
    return docs
  }

  /**
   * Updates a document by its ID.
   *
   * @async
   * @template {MongoId} TId
   * @template {MongoUpdateQuery<TRawDocType>} TUpdateObj
   * @template {MongoQueryOptions<TRawDocType>} TOptions
   * @param {TId} id The ID of the document to update.
   * @param {TUpdateObj} updateObj The update object.
   * @param {?TOptions} [options] The options for the query.
   * @returns {Promise<MongoConditionalDoc<InstanceType<typeof this.MongoModel>, TRawDocType, TOptions['lean']>>} The updated document.
   */
  async updateById<
    TId extends MongoId,
    TUpdateObj extends MongoUpdateQuery<TRawDocType>,
    TOptions extends MongoQueryOptions<TRawDocType>
  >(
    id: TId,
    updateObj: TUpdateObj,
    options?: TOptions
  ): Promise<
    MongoConditionalDoc<
      InstanceType<typeof this.MongoModel>,
      TRawDocType,
      TOptions['lean']
    >
  > {
    try {
      const updateOptions = {
        new: true,
        sanitizeProjection: true,
        runValidators: true,
        ...options,
        lean: getLeanOption(options?.lean)
      }

      const doc = await this.MongoModel.findByIdAndUpdate(
        id,
        updateObj,
        updateOptions
      )

      if (!doc) {
        const error = {
          message: 'Document Not Found',
          name: 'DocumentNotFoundError',
          errors: { id, options }
        }
        throw new MongoError(error)
      }

      return doc as MongoConditionalDoc<
        InstanceType<typeof this.MongoModel>,
        TRawDocType,
        TOptions['lean']
      >
    } catch (error) {
      throw new MongoError(error)
    }
  }

  /**
   * Updates a single document that matches the provided query.
   *
   * @async
   * @template {MongoQuery<TRawDocType>} TQuery
   * @template {MongoUpdateQuery<TRawDocType>} TUpdateObj
   * @template {MongoQueryOptions<TRawDocType>} TOptions
   * @param {TQuery} query The query to match the document.
   * @param {TUpdateObj} updateObj The update operations to be applied to the document.
   * @param {?TOptions} [options] Optional settings for the update operation.
   * @returns {Promise<null | MongoConditionalDoc<InstanceType<typeof this.MongoModel>, TRawDocType, TOptions['lean']>>} The updated document or null if no document matched the query.
   */
  async updateOne<
    TQuery extends MongoQuery<TRawDocType>,
    TUpdateObj extends MongoUpdateQuery<TRawDocType>,
    TOptions extends MongoQueryOptions<TRawDocType>
  >(
    query: TQuery,
    updateObj: TUpdateObj,
    options?: TOptions
  ): Promise<null | MongoConditionalDoc<
    InstanceType<typeof this.MongoModel>,
    TRawDocType,
    TOptions['lean']
  >> {
    try {
      const updateOptions = {
        new: true,
        sanitizeProjection: true,
        runValidators: true,
        ...options,
        lean: getLeanOption(options?.lean)
      }

      const doc = await this.MongoModel.findOneAndUpdate(
        query,
        updateObj,
        updateOptions
      )

      if (!doc) {
        return null
      }

      return doc as MongoConditionalDoc<
        InstanceType<typeof this.MongoModel>,
        TRawDocType,
        TOptions['lean']
      >
    } catch (error) {
      throw new MongoError(error)
    }
  }

  /**
   * Updates multiple documents that match the provided query.
   *
   * @async
   * @template {MongoQuery<TRawDocType>} TQuery
   * @template {MongoUpdateQuery<TRawDocType>} TUpdateObj
   * @template {MongoUpdateQueryOptions<TRawDocType>} TOptions
   * @param {TQuery} query The query to match the documents.
   * @param {TUpdateObj} updateObj The update operations to be applied to the documents.
   * @param {?TOptions} [options] Optional settings for the update operation.
   * @returns {Promise<MongoUpdateResult>} The result of the update operation.
   */
  async updateMany<
    TQuery extends MongoQuery<TRawDocType>,
    TUpdateObj extends MongoUpdateQuery<TRawDocType>,
    TOptions extends MongoUpdateQueryOptions<TRawDocType>
  >(
    query: TQuery,
    updateObj: TUpdateObj,
    options?: TOptions
  ): Promise<MongoUpdateResult> {
    try {
      const updateOptions = {
        new: true,
        sanitizeProjection: true,
        runValidators: true,
        ...options,
        lean: getLeanOption(options?.lean)
      }

      const result = await this.MongoModel.updateMany(
        query,
        updateObj,
        updateOptions
      )

      return result
    } catch (error) {
      throw new MongoError(error)
    }
  }

  /**
   * Updates a single document that matches the provided key-value pair.
   *
   * @async
   * @template {string} TKey
   * @template {any} TValue
   * @template {MongoUpdateQuery<TRawDocType>} TUpdateObj
   * @template {MongoQueryOptions<TRawDocType>} TOptions
   * @param {TKey} key The key to match the document.
   * @param {TValue} value The value to match the document.
   * @param {TUpdateObj} updateObj The update operations to be applied to the document.
   * @param {?TOptions} [options] Optional settings for the update operation.
   * @returns {Promise<null | MongoConditionalDoc<InstanceType<typeof this.MongoModel>, TRawDocType, TOptions['lean']>>} The updated document or null if no document matched the key-value pair.
   */
  async updateOneBy<
    TKey extends string,
    TValue extends any,
    TUpdateObj extends MongoUpdateQuery<TRawDocType>,
    TOptions extends MongoQueryOptions<TRawDocType>
  >(
    key: TKey,
    value: TValue,
    updateObj: TUpdateObj,
    options?: TOptions
  ): Promise<null | MongoConditionalDoc<
    InstanceType<typeof this.MongoModel>,
    TRawDocType,
    TOptions['lean']
  >> {
    const query = { [key]: value } as MongoQuery<TRawDocType>
    const doc = this.updateOne(query, updateObj, options)
    return doc
  }

  /**
   * Updates multiple documents that match the provided key-value pair.
   *
   * @async
   * @template {string} TKey
   * @template {any} TValue
   * @template {MongoUpdateQuery<TRawDocType>} TUpdateObj
   * @template {MongoUpdateQueryOptions<TRawDocType>} TOptions
   * @param {TKey} key The key to match the documents.
   * @param {TValue} value The value to match the documents.
   * @param {TUpdateObj} updateObj The update operations to be applied to the documents.
   * @param {?TOptions} [options] Optional settings for the update operation.
   * @returns {Promise<MongoUpdateResult>} The result of the update operation.
   */
  async updateManyBy<
    TKey extends string,
    TValue extends any,
    TUpdateObj extends MongoUpdateQuery<TRawDocType>,
    TOptions extends MongoUpdateQueryOptions<TRawDocType>
  >(
    key: TKey,
    value: TValue,
    updateObj: TUpdateObj,
    options?: TOptions
  ): Promise<MongoUpdateResult> {
    const query = { [key]: value } as MongoQuery<TRawDocType>
    const result = this.updateMany(query, updateObj, options)
    return result
  }

  /**
   * Removes a document by its ID.
   *
   * @async
   * @template {MongoId} TId
   * @template {MongoQueryOptions<TRawDocType>} TOptions
   * @param {TId} id The ID of the document to be removed.
   * @param {?TOptions} [options] Optional settings for the remove operation.
   * @returns {Promise<MongoConditionalDoc<InstanceType<typeof this.MongoModel>, TRawDocType, TOptions['lean']>>} The removed document.
   */
  async removeById<
    TId extends MongoId,
    TOptions extends MongoQueryOptions<TRawDocType>
  >(
    id: TId,
    options?: TOptions
  ): Promise<
    MongoConditionalDoc<
      InstanceType<typeof this.MongoModel>,
      TRawDocType,
      TOptions['lean']
    >
  > {
    try {
      const removeOptions = {
        sanitizeProjection: true,
        ...options,
        lean: getLeanOption(options?.lean)
      }

      const doc = await this.MongoModel.findByIdAndDelete(id, removeOptions)

      if (!doc) {
        const error = {
          message: 'Document Not Found',
          name: 'DocumentNotFoundError',
          errors: { id, options }
        }
        throw new MongoError(error)
      }

      return doc as MongoConditionalDoc<
        InstanceType<typeof this.MongoModel>,
        TRawDocType,
        TOptions['lean']
      >
    } catch (error) {
      throw new MongoError(error)
    }
  }

  /**
   * Removes a single document that matches the provided query.
   *
   * @async
   * @template {MongoQuery<TRawDocType>} TQuery
   * @template {MongoDeleteQueryOptions<TRawDocType>} TOptions
   * @param {TQuery} query The query to match the document.
   * @param {?TOptions} [options] Optional settings for the remove operation.
   * @returns {Promise<MongoDeleteResult>} The result of the remove operation.
   */
  async removeOne<
    TQuery extends MongoQuery<TRawDocType>,
    TOptions extends MongoDeleteQueryOptions<TRawDocType>
  >(query: TQuery, options?: TOptions): Promise<MongoDeleteResult> {
    try {
      const result = await this.MongoModel.deleteOne(query, options)
      return result
    } catch (error) {
      throw new MongoError(error)
    }
  }

  /**
   * Removes multiple documents that match the provided query.
   *
   * @async
   * @template {MongoQuery<TRawDocType>} TQuery
   * @template {MongoDeleteQueryOptions<TRawDocType>} TOptions
   * @param {TQuery} query The query to match the documents.
   * @param {?TOptions} [options] Optional settings for the remove operation.
   * @returns {Promise<MongoDeleteResult>} The result of the remove operation.
   */
  async removeMany<
    TQuery extends MongoQuery<TRawDocType>,
    TOptions extends MongoDeleteQueryOptions<TRawDocType>
  >(query: TQuery, options?: TOptions): Promise<MongoDeleteResult> {
    try {
      const result = await this.MongoModel.deleteMany(query, options)
      return result
    } catch (error) {
      throw new MongoError(error)
    }
  }

  /**
   * Lists all documents with optional projection and query options.
   *
   * @async
   * @template {MongoProjection<TRawDocType>} TProjection
   * @template {MongoQueryOptions<TRawDocType>} TOptions
   * @param {?TProjection} [projection] The fields to include or exclude from the documents.
   * @param {?TOptions} [options] Optional settings for the list operation.
   * @returns {Promise<MongoConditionalDoc<InstanceType<typeof this.MongoModel>, TRawDocType, TOptions['lean']>[]>} The list of documents.
   */
  async list<
    TProjection extends MongoProjection<TRawDocType>,
    TOptions extends MongoQueryOptions<TRawDocType>
  >(
    projection?: TProjection,
    options?: TOptions
  ): Promise<
    MongoConditionalDoc<
      InstanceType<typeof this.MongoModel>,
      TRawDocType,
      TOptions['lean']
    >[]
  > {
    const docs = await this.findMany({}, projection, options)
    return docs
  }

  /**
   * Searches for documents based on the provided search query, projection, and options.
   *
   * @async
   * @template {MongoSearchQuery<TRawDocType>} TSearchQuery
   * @template {MongoProjection<TRawDocType>} TProjection
   * @template {MongoQueryOptions<TRawDocType>} TOptions
   * @param {?TSearchQuery} [searchQuery] The search query containing the query, pagination, and sorting information.
   * @param {?TProjection} [projection] The fields to include or exclude from the documents.
   * @param {?TOptions} [options] Optional settings for the search operation.
   * @returns {Promise<MongoSearchResult<InstanceType<typeof this.MongoModel>, TRawDocType, TOptions['lean']>>} The search result containing the documents and pagination information.
   */
  async search<
    TSearchQuery extends MongoSearchQuery<TRawDocType>,
    TProjection extends MongoProjection<TRawDocType>,
    TOptions extends MongoQueryOptions<TRawDocType>
  >(
    searchQuery?: TSearchQuery,
    projection?: TProjection,
    options?: TOptions
  ): Promise<
    MongoSearchResult<
      InstanceType<typeof this.MongoModel>,
      TRawDocType,
      TOptions['lean']
    >
  > {
    const {
      query = {},
      page = DEFAULT_PAGE,
      pageSize = DEFAULT_PAGE_SIZE,
      sort = DEFAULT_SORT
    } = searchQuery || {}

    const searchOptions = {
      skip: page * pageSize,
      limit: pageSize,
      sort,
      ...options
    }

    const [countResponse, findResponse] = await Promise.allSettled([
      this.getCount(query),
      this.findMany(query, projection, searchOptions)
    ])
    const countError = countResponse.status === 'rejected'
    const findError = findResponse.status === 'rejected'

    if (countError) {
      throw countResponse.reason as MongoError
    }

    if (findError) {
      throw findResponse.reason as MongoError
    }

    const { value: totalDocuments } =
      countResponse as PromiseFulfilledResult<number>
    const { value: documents } = findResponse as PromiseFulfilledResult<
      MongoConditionalDoc<
        InstanceType<typeof this.MongoModel>,
        TRawDocType,
        TOptions['lean']
      >[]
    >

    const data = {
      page,
      pageSize,
      totalDocuments,
      documents
    }

    return data
  }

  /**
   * Performs an aggregation operation on the documents.
   *
   * @async
   * @template [TResultType=any]
   * @param {MongoPipelineStage[]} pipeline The aggregation pipeline stages.
   * @param {?MongoAggregateOptions} [options] Optional settings for the aggregation operation.
   * @returns {Promise<TResultType[]>} The result of the aggregation operation.
   */
  async aggregate<TResultType = any>(
    pipeline: MongoPipelineStage[],
    options?: MongoAggregateOptions
  ): Promise<TResultType[]> {
    try {
      const result = await this.MongoModel.aggregate<TResultType>(
        pipeline,
        options
      )
      return result
    } catch (error) {
      throw new MongoError(error)
    }
  }
}
