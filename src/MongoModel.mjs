import mongoose from 'mongoose'
import MongoError from './MongoError.mjs'
import {
  DEFAULT_SKIP,
  DEFAULT_LIMIT,
  DEFAULT_SORT
} from './CONSTANTS.mjs'

const { ERROR_TYPE } = MongoError

export default class MongoModel {
  constructor (modelName = '', Schema) {
    this.ModelName = modelName
    this.Schema = Schema
    this.MongooseModel = mongoose.model(modelName, Schema)

    // Method Hard Binding
    this.getCount = this.getCount.bind(this)

    this.createOne = this.createOne.bind(this)
    this.createMany = this.createMany.bind(this)
    this.replaceAll = this.replaceAll.bind(this)

    this.findOne = this.findOne.bind(this)
    this.findMany = this.findMany.bind(this)
    this.findById = this.findById.bind(this)
    this.findOneBy = this.findOneBy.bind(this)
    this.findManyBy = this.findManyBy.bind(this)

    this.updateOne = this.updateOne.bind(this)
    this.updateMany = this.updateMany.bind(this)
    this.updateById = this.updateById.bind(this)
    this.updateOneBy = this.updateOneBy.bind(this)
    this.updateManyBy = this.updateManyBy.bind(this)

    this.remove = this.remove.bind(this)
    this.removeById = this.removeById.bind(this)

    this.list = this.list.bind(this)
    this.search = this.search.bind(this)
  }

  async getCount (query = {}) {
    const count = await this.MongooseModel.count(query)
    return count
  }

  async createOne (attrs = {}) {
    const object = await this.MongooseModel.create(attrs)
    return object
  }

  async createMany (attrs = []) {
    if (!attrs.length) { return [] }
    const objects = await this.MongooseModel.create(attrs)
    return objects
  }

  async replaceAll (attrs = []) {
    await this.remove({})
    const objects = await this.createMany(attrs)
    return objects
  }

  async findOne (query = {}, projection = {}, options = {}) {
    const findOptions = { lean: { virtuals: true }, ...options, sanitizeProjection: true }
    const object = await this.MongooseModel.findOne(query, projection, findOptions)
    return object
  }

  async findMany (query = {}, projection = {}, options = {}) {
    const findOptions = { lean: { virtuals: true }, ...options, sanitizeProjection: true }
    const objects = await this.MongooseModel.find(query, projection, findOptions)
    return objects
  }

  async findById (id = '', projections = {}, options = {}) {
    const findOptions = { lean: { virtuals: true }, ...options, sanitizeProjection: true }
    const object = await this.MongooseModel.findById(id, projections, findOptions)

    if (!object) {
      const error = {
        message: 'Document Not Found',
        name: ERROR_TYPE.DocumentNotFoundError,
        errors: { id, options }
      }
      throw new MongoError(error)
    }

    return object
  }

  async findOneBy (key = '', value, projection = {}, options = {}) {
    const query = { [key]: value }
    const object = await this.findOne(query, projection, options)
    return object
  }

  async findManyBy (key = '', value, projection = {}, options = {}) {
    const query = { [key]: value }
    const objects = await this.findMany(query, projection, options)
    return objects
  }

  async updateOne (query = {}, updateObj = {}, options = {}) {
    const updateOptions = { new: true, rawResult: true, lean: { virtuals: true }, ...options, sanitizeProjection: true }
    const updateResponse = await this.MongooseModel.findOneAndUpdate(query, updateObj, updateOptions).orFail()
    const { value } = updateResponse
    const object = (updateOptions.rawResult && value) || updateResponse
    return object
  }

  async updateMany (query = {}, updateObj = {}, options = {}) {
    const updateResponse = await this.MongooseModel.updateMany(query, updateObj, options).orFail()
    return updateResponse
  }

  async updateById (id = '', updateObj = {}, options = {}) {
    const updateOptions = { new: true, rawResult: true, lean: { virtuals: true }, ...options, sanitizeProjection: true }
    const updateResponse = await this.MongooseModel.findByIdAndUpdate(id, updateObj, updateOptions)
    const { value } = updateResponse
    const object = (updateOptions.rawResult && value) || updateResponse

    if (!object) {
      const error = {
        message: 'Document Not Found',
        name: ERROR_TYPE.DocumentNotFoundError,
        errors: { id, options }
      }
      throw new MongoError(error)
    }

    return object
  }

  async updateOneBy (key = '', value, updateObj = {}, options = {}) {
    const query = { [key]: value }
    const object = await this.updateOne(query, updateObj, options)
    return object
  }

  async updateManyBy (key = '', value, updateObj = {}, options = {}) {
    const query = { [key]: value }
    const objects = await this.updateMany(query, updateObj, options)
    return objects
  }

  async remove (query = {}, options = {}) {
    const removeResponse = await this.MongooseModel.deleteMany(query, options)
    return removeResponse
  }

  async removeById (id = '', options = {}) {
    const removeOptions = { rawResult: true, lean: { virtuals: true }, ...options, sanitizeProjection: true }
    const removeResponse = await this.MongooseModel.findByIdAndRemove(id, removeOptions).orFail()
    const { value } = removeResponse
    const object = (removeOptions.rawResult && value) || removeResponse
    return object
  }

  async list (projection = {}, options = {}) {
    const objects = await this.findMany({}, projection, options)
    return objects
  }

  async search (query = {}, projections = {}, options = {}) {
    const searchOptions = {
      skip: options.skip || DEFAULT_SKIP,
      limit: options.limit || DEFAULT_LIMIT,
      sort: options.sort || DEFAULT_SORT
    }

    const promises = [
      this.getCount(query),
      this.findMany(query, projections, searchOptions)
    ]

    const [countResponse, findResponse] = await Promise.allSettled(promises)
    const countError = countResponse.status === 'rejected'
    const findError = findResponse.status === 'rejected'

    if (findError) { throw findResponse.reason }

    const { value: count } = countResponse
    const { value: objects } = findResponse
    const data = {
      _meta: {
        totalDocuments: countError ? null : count,
        documentsCount: objects.length
      },
      documents: objects
    }
    return data
  }
}
