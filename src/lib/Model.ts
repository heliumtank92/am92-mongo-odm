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
  MongoToObjOptions,
  MongoUpdateQuery,
  MongoUpdateQueryOptions,
  MongoUpdateResult
} from '../TYPES'
import { getLeanOption } from './helpers'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_SORT } from '../CONSTANTS'

export class Model<
  TRawDocType,
  TMongoModel extends MongoModel<TRawDocType> = MongoModel<TRawDocType>
> {
  ModelName: string
  MongoModel: TMongoModel

  constructor(modelName: string = '', schema: MongoSchema) {
    this.ModelName = modelName
    this.MongoModel = mongoose.model<TRawDocType, TMongoModel>(
      modelName,
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
      const result = await this.MongoModel.updateMany(query, updateObj, options)

      return result
    } catch (error) {
      throw new MongoError(error)
    }
  }

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

  async search<
    TSearchQuery extends MongoSearchQuery<TRawDocType>,
    TProjection extends MongoProjection<TRawDocType>,
    TOptions extends MongoQueryOptions<TRawDocType>
  >(searchQuery: TSearchQuery, projection?: TProjection, options?: TOptions) {
    const {
      query,
      page = DEFAULT_PAGE,
      pageSize = DEFAULT_PAGE_SIZE,
      sort = DEFAULT_SORT
    } = searchQuery

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

    const { value: totalCount } =
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
      totalCount,
      documents
    }

    return data
  }

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
