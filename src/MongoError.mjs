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

export default class MongoError {
  constructor (error) {
    const {
      _isMongoError,
      name,
      msg,
      code,
      errors
    } = error

    if (_isMongoError) { return error }

    const statusCode = STATUS_CODE_MAP[name] || 500
    const err = { name, code, errors }

    this._isMongoError = true
    this.name = name
    this.code = code

    this.message = msg
    this.statusCode = statusCode
    this.error = err
  }

  toJSON () {
    const { message, statusCode, error } = this
    return { message, statusCode, error }
  }
}
