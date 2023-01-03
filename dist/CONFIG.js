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
var {
  // Basic Details
  MONGO_HOSTS = '',
  MONGO_DBNAME = '',
  // User Auth Details
  MONGO_USER_AUTH = 'false',
  MONGO_USERNAME = '',
  MONGO_PASSWORD = '',
  // Replica Details
  MONGO_REPLICASET = '',
  MONGO_REPLICASET_COUNT = '0',
  MONGO_READ_PREFERENCE,
  // SSL Details
  MONGO_SSL_ENABLED = 'false',
  MONGO_SSL_VALIDATE = 'false',
  MONGO_PEM_PATH = '',
  // Other Details
  MONGO_POOL_SIZE = '5'
} = process.env;
var USER_AUTH = MONGO_USER_AUTH === 'true';
var REPLICASET_COUNT = parseInt(MONGO_REPLICASET_COUNT, 10);
var POOL_SIZE = parseInt(MONGO_POOL_SIZE, 10);
var SSL_ENABLED = MONGO_SSL_ENABLED === 'true';
var SSL_VALIDATE = MONGO_SSL_VALIDATE === 'true';
var REQUIRED_CONFIG = ['MONGO_DBNAME', 'MONGO_HOSTS'];
if (USER_AUTH) {
  REQUIRED_CONFIG.push('MONGO_USERNAME');
  REQUIRED_CONFIG.push('MONGO_PASSWORD');
}
if (SSL_ENABLED) {
  REQUIRED_CONFIG.push('MONGO_PEM_PATH');
}
REQUIRED_CONFIG.forEach(key => {
  if (!process.env[key]) {
    console.error('[Error] Missing MongoDB Config:', key);
    return process.exit(1);
  }
});
if (isNaN(REPLICASET_COUNT)) {
  console.error("[Error] Invalid MongoDB Config: MONGO_REPLICASET_COUNT=".concat(MONGO_REPLICASET_COUNT));
  process.exit(1);
}
if (isNaN(POOL_SIZE)) {
  console.error("[Error] Invalid MongoDB Config: MONGO_POOL_SIZE=".concat(MONGO_POOL_SIZE));
  process.exit(1);
}
var MONGO_CREDENTIALS = USER_AUTH && encodeURIComponent(MONGO_USERNAME) + ':' + encodeURIComponent(MONGO_PASSWORD);
var CONNECTION_URI = USER_AUTH ? "mongodb://".concat(MONGO_CREDENTIALS, "@").concat(MONGO_HOSTS, "/").concat(MONGO_DBNAME) : "mongodb://".concat(MONGO_HOSTS, "/").concat(MONGO_DBNAME);
var SSL_CONFIG = SSL_ENABLED ? {
  ssl: SSL_ENABLED,
  sslValidate: SSL_VALIDATE,
  sslCA: MONGO_PEM_PATH
} : {};
var CONFIG = {
  DBNAME: MONGO_DBNAME,
  CONNECTION_URI,
  REPLICASET_COUNT,
  OPTIONS: _objectSpread({
    retryWrites: false,
    replicaSet: MONGO_REPLICASET || undefined,
    readPreference: MONGO_READ_PREFERENCE
  }, SSL_CONFIG)
};
var _default = CONFIG;
exports.default = _default;