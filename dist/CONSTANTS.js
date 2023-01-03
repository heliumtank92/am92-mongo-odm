"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DEFAULT_SORT = exports.DEFAULT_SKIP = exports.DEFAULT_LIMIT = void 0;
var DEFAULT_SKIP = 0;
exports.DEFAULT_SKIP = DEFAULT_SKIP;
var DEFAULT_LIMIT = 10;
exports.DEFAULT_LIMIT = DEFAULT_LIMIT;
var DEFAULT_SORT = '-_id';
exports.DEFAULT_SORT = DEFAULT_SORT;
var MONGO_CONSTANTS = {
  DEFAULT_SKIP,
  DEFAULT_LIMIT,
  DEFAULT_SORT
};
var _default = MONGO_CONSTANTS;
exports.default = _default;