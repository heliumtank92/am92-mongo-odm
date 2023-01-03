"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var DEFAULT_ERROR_MSG = 'Mongo Error';
var DEFAULT_ERROR_STATUS_CODE = 500;
var DEFAULT_ERROR_CODE = 'MONGO_ERROR';
var STATUS_CODE_MAP = {
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
};
class MongoError extends Error {
  constructor() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var eMap = arguments.length > 1 ? arguments[1] : undefined;
    if (e._isCustomError && !eMap) {
      return e;
    }
    super();
    var {
      message,
      statusCode,
      errorCode
    } = eMap || {};
    var {
      message: eMessage,
      name: eName,
      msg: eMsg
    } = e;
    var {
      npm_package_name: pkgName = '',
      npm_package_version: pkgVersion = ''
    } = process.env;
    var service = "".concat(pkgName, "@").concat(pkgVersion);
    this._isCustomError = true;
    this._isMongoError = true;
    this.service = service;
    this.message = message || eMessage || eMsg || DEFAULT_ERROR_MSG;
    this.statusCode = statusCode || STATUS_CODE_MAP[eName] || DEFAULT_ERROR_STATUS_CODE;
    this.errorCode = errorCode || DEFAULT_ERROR_CODE;
    this.error = _objectSpread(_objectSpread({}, e), {}, {
      message: eMessage || eMsg || this.message,
      errorCode: this.errorCode
    });
  }
}
exports.default = MongoError;