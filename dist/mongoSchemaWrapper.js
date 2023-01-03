"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mongoSchemaWrapper;
var _mongoose = require("mongoose");
var _mongooseLeanVirtuals = _interopRequireDefault(require("mongoose-lean-virtuals"));
var _CONFIG = _interopRequireDefault(require("./CONFIG.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var {
  REPLICASET_COUNT
} = _CONFIG.default;
var maxWriteCount = REPLICASET_COUNT ? REPLICASET_COUNT + 1 : 'majority';
var DEFAULT_OPTIONS = {
  timestamps: true
};
function mongoSchemaWrapper(schemaObject) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var schemaOptions = _objectSpread(_objectSpread({}, DEFAULT_OPTIONS), options);

  // Additional Feature: writeConcern.w = 'all'
  if (schemaOptions.writeConcern && schemaOptions.writeConcern.w === 'all') {
    schemaOptions.writeConcern.w = maxWriteCount;
  }
  var schema = new _mongoose.Schema(schemaObject, schemaOptions);
  schema.plugin(_mongooseLeanVirtuals.default);
  return schema;
}