"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _CONFIG = _interopRequireDefault(require("./CONFIG.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var {
  CONNECTION_URI,
  OPTIONS
} = _CONFIG.default;
var mongoConnect = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    yield _mongoose.default.connect(CONNECTION_URI, OPTIONS);
  });
  return function mongoConnect() {
    return _ref.apply(this, arguments);
  };
}();
var _default = mongoConnect;
exports.default = _default;
_mongoose.default.set('strictQuery', true);
_mongoose.default.connection.on('connected', () => {
  console.log('[Info] Mongo Connection Established');
});
_mongoose.default.connection.on('reconnected', () => {
  console.log('[Info] Mongo Connection Re-established');
});
_mongoose.default.connection.on('disconnected', () => {
  console.log('[Error] Mongo Connection Disconnected');
});
_mongoose.default.connection.on('close', () => {
  console.log('[Info] Mongo Connection Closed');
});
_mongoose.default.connection.on('error', error => {
  throw error;
});
if (process.env.NODE_ENV === 'development') {
  _mongoose.default.set('debug', true);
}