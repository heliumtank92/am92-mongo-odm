import { SERVICE } from './CONFIG'
import { MongoErrorMap } from './TYPES'

/** @ignore */
const DEFAULT_ERROR_MSG = 'Mongo Error'
/** @ignore */
const DEFAULT_ERROR_STATUS_CODE = 500
/** @ignore */
const DEFAULT_ERROR_CODE = 'Mongo::GENERIC'

/** @ignore */
const STATUS_CODE_MAP = {
  MongooseError: 500,
  CastError: 422,
  DisconnectedError: 500,
  DivergentArrayError: 409,
  DocumentNotFoundError: 404,
  ValidatorError: 422,
  ValidationError: 422,
  MissingSchemaError: 500,
  ObjectExpectedError: 422,
  ObjectParameterError: 500,
  OverwriteModelError: 500,
  ParallelSaveError: 409,
  StrictModeError: 500,
  VersionError: 409,
  RuntimeError: 500
}

/**
 * Error class whose instance is thrown in case of any error.
 *
 * @class
 * @typedef {MongoError}
 * @extends {Error}
 */
export class MongoError extends Error {
  /**
   * Flag to identify if error is a custom error.
   */
  readonly _isCustomError = true
  /**
   * Flag to identify if error is a MongoError.
   */
  readonly _isMongoError = true
  /**
   * Node project from which Error is thrown.
   */
  readonly service: string
  /**
   * Error's message string.
   */
  message: string
  /**
   * HTTP status code associated with the error.
   */
  statusCode: number
  /**
   * Error Code.
   */
  errorCode: string
  /**
   * Error object.
   */
  error?: any
  /**
   * Creates an instance of MongoError.
   *
   * @constructor
   * @param [e] Any Error instance to wrap with MongoError.
   * @param [eMap] MongoErrorMap to rewrap error for better understanding.
   */
  constructor(e?: any, eMap?: MongoErrorMap) {
    super()

    this.service = SERVICE
    this.message = eMap?.message || e?.message || DEFAULT_ERROR_MSG
    this.statusCode =
      eMap?.statusCode ||
      e?.statusCode ||
      (e?.name && STATUS_CODE_MAP[e?.name as keyof typeof STATUS_CODE_MAP]) ||
      DEFAULT_ERROR_STATUS_CODE
    this.errorCode =
      eMap?.errorCode || e?.errorCode || e?.code || DEFAULT_ERROR_CODE
    this.error = e
  }
}
