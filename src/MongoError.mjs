const DEFAULT_ERROR_MSG = 'Mongo Error'
const DEFAULT_ERROR_STATUS_CODE = 500
const DEFAULT_ERROR_CODE = 'MONGO_ERROR'

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

export default class MongoError extends Error {
  constructor (e = {}, eMap) {
    if (e._isCustomError && !eMap) { return e }

    super()

    const { message, statusCode, errorCode } = eMap || {}
    const {
      message: eMessage,
      name: eName,
      msg: eMsg
    } = e

    const {
      npm_package_name: pkgName = '',
      npm_package_version: pkgVersion = ''
    } = process.env
    const service = `${pkgName}@${pkgVersion}`

    this._isCustomError = true
    this._isMongoError = true
    this.service = service
    this.message = message || eMessage || eMsg || DEFAULT_ERROR_MSG
    this.statusCode = statusCode || STATUS_CODE_MAP[eName] || DEFAULT_ERROR_STATUS_CODE
    this.errorCode = errorCode || DEFAULT_ERROR_CODE
    this.error = {
      ...e,
      message: eMessage || eMsg || this.message,
      errorCode: this.errorCode
    }
  }
}
