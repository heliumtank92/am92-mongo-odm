"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _MongoError = _interopRequireDefault(require("./MongoError.js"));
var _CONSTANTS = require("./CONSTANTS.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
class MongoModel {
  constructor() {
    var modelName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var Schema = arguments.length > 1 ? arguments[1] : undefined;
    this.ModelName = modelName;
    this.Schema = Schema;
    this.MongooseModel = _mongoose.default.model(modelName, Schema);

    // Method Hard Binding
    this.getCount = this.getCount.bind(this);
    this.createOne = this.createOne.bind(this);
    this.createMany = this.createMany.bind(this);
    this.replaceAll = this.replaceAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.findMany = this.findMany.bind(this);
    this.findById = this.findById.bind(this);
    this.findOneBy = this.findOneBy.bind(this);
    this.findManyBy = this.findManyBy.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.updateMany = this.updateMany.bind(this);
    this.updateById = this.updateById.bind(this);
    this.updateOneBy = this.updateOneBy.bind(this);
    this.updateManyBy = this.updateManyBy.bind(this);
    this.remove = this.remove.bind(this);
    this.removeById = this.removeById.bind(this);
    this.list = this.list.bind(this);
    this.search = this.search.bind(this);
    this.aggregate = this.aggregate.bind(this);
  }
  getCount() {
    var _arguments = arguments,
      _this = this;
    return _asyncToGenerator(function* () {
      var query = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : {};
      try {
        var count = yield _this.MongooseModel.count(query);
        return count;
      } catch (error) {
        throw new _MongoError.default(error);
      }
    })();
  }
  createOne() {
    var _arguments2 = arguments,
      _this2 = this;
    return _asyncToGenerator(function* () {
      var attrs = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : {};
      try {
        var object = yield _this2.MongooseModel.create(attrs);
        return object;
      } catch (error) {
        throw new _MongoError.default(error);
      }
    })();
  }
  createMany() {
    var _arguments3 = arguments,
      _this3 = this;
    return _asyncToGenerator(function* () {
      var attrs = _arguments3.length > 0 && _arguments3[0] !== undefined ? _arguments3[0] : [];
      if (!attrs.length) {
        return [];
      }
      try {
        var objects = yield _this3.MongooseModel.create(attrs);
        return objects;
      } catch (error) {
        throw new _MongoError.default(error);
      }
    })();
  }
  replaceAll() {
    var _arguments4 = arguments,
      _this4 = this;
    return _asyncToGenerator(function* () {
      var attrs = _arguments4.length > 0 && _arguments4[0] !== undefined ? _arguments4[0] : [];
      yield _this4.remove({});
      var objects = yield _this4.createMany(attrs);
      return objects;
    })();
  }
  findOne() {
    var _arguments5 = arguments,
      _this5 = this;
    return _asyncToGenerator(function* () {
      var query = _arguments5.length > 0 && _arguments5[0] !== undefined ? _arguments5[0] : {};
      var projection = _arguments5.length > 1 && _arguments5[1] !== undefined ? _arguments5[1] : {};
      var options = _arguments5.length > 2 && _arguments5[2] !== undefined ? _arguments5[2] : {};
      try {
        var findOptions = _objectSpread(_objectSpread({
          lean: {
            virtuals: true
          }
        }, options), {}, {
          sanitizeProjection: true
        });
        var object = yield _this5.MongooseModel.findOne(query, projection, findOptions);
        return object;
      } catch (error) {
        throw new _MongoError.default(error);
      }
    })();
  }
  findMany() {
    var _arguments6 = arguments,
      _this6 = this;
    return _asyncToGenerator(function* () {
      var query = _arguments6.length > 0 && _arguments6[0] !== undefined ? _arguments6[0] : {};
      var projection = _arguments6.length > 1 && _arguments6[1] !== undefined ? _arguments6[1] : {};
      var options = _arguments6.length > 2 && _arguments6[2] !== undefined ? _arguments6[2] : {};
      try {
        var findOptions = _objectSpread(_objectSpread({
          lean: {
            virtuals: true
          }
        }, options), {}, {
          sanitizeProjection: true
        });
        var objects = yield _this6.MongooseModel.find(query, projection, findOptions);
        return objects;
      } catch (error) {
        throw new _MongoError.default(error);
      }
    })();
  }
  findById() {
    var _arguments7 = arguments,
      _this7 = this;
    return _asyncToGenerator(function* () {
      var id = _arguments7.length > 0 && _arguments7[0] !== undefined ? _arguments7[0] : '';
      var projections = _arguments7.length > 1 && _arguments7[1] !== undefined ? _arguments7[1] : {};
      var options = _arguments7.length > 2 && _arguments7[2] !== undefined ? _arguments7[2] : {};
      try {
        var findOptions = _objectSpread(_objectSpread({
          lean: {
            virtuals: true
          }
        }, options), {}, {
          sanitizeProjection: true
        });
        var object = yield _this7.MongooseModel.findById(id, projections, findOptions);
        if (!object) {
          var error = {
            message: 'Document Not Found',
            name: 'DocumentNotFoundError',
            errors: {
              id,
              options
            }
          };
          throw new _MongoError.default(error);
        }
        return object;
      } catch (error) {
        throw new _MongoError.default(error);
      }
    })();
  }
  findOneBy() {
    var _arguments8 = arguments,
      _this8 = this;
    return _asyncToGenerator(function* () {
      var key = _arguments8.length > 0 && _arguments8[0] !== undefined ? _arguments8[0] : '';
      var value = _arguments8.length > 1 ? _arguments8[1] : undefined;
      var projection = _arguments8.length > 2 && _arguments8[2] !== undefined ? _arguments8[2] : {};
      var options = _arguments8.length > 3 && _arguments8[3] !== undefined ? _arguments8[3] : {};
      var query = {
        [key]: value
      };
      var object = yield _this8.findOne(query, projection, options);
      return object;
    })();
  }
  findManyBy() {
    var _arguments9 = arguments,
      _this9 = this;
    return _asyncToGenerator(function* () {
      var key = _arguments9.length > 0 && _arguments9[0] !== undefined ? _arguments9[0] : '';
      var value = _arguments9.length > 1 ? _arguments9[1] : undefined;
      var projection = _arguments9.length > 2 && _arguments9[2] !== undefined ? _arguments9[2] : {};
      var options = _arguments9.length > 3 && _arguments9[3] !== undefined ? _arguments9[3] : {};
      var query = {
        [key]: value
      };
      var objects = yield _this9.findMany(query, projection, options);
      return objects;
    })();
  }
  updateOne() {
    var _arguments10 = arguments,
      _this10 = this;
    return _asyncToGenerator(function* () {
      var query = _arguments10.length > 0 && _arguments10[0] !== undefined ? _arguments10[0] : {};
      var updateObj = _arguments10.length > 1 && _arguments10[1] !== undefined ? _arguments10[1] : {};
      var options = _arguments10.length > 2 && _arguments10[2] !== undefined ? _arguments10[2] : {};
      try {
        var updateOptions = _objectSpread(_objectSpread({
          new: true,
          rawResult: true,
          lean: {
            virtuals: true
          }
        }, options), {}, {
          sanitizeProjection: true
        });
        var updateResponse = yield _this10.MongooseModel.findOneAndUpdate(query, updateObj, updateOptions).orFail();
        var {
          value
        } = updateResponse;
        var object = updateOptions.rawResult && value || updateResponse;
        return object;
      } catch (error) {
        throw new _MongoError.default(error);
      }
    })();
  }
  updateMany() {
    var _arguments11 = arguments,
      _this11 = this;
    return _asyncToGenerator(function* () {
      var query = _arguments11.length > 0 && _arguments11[0] !== undefined ? _arguments11[0] : {};
      var updateObj = _arguments11.length > 1 && _arguments11[1] !== undefined ? _arguments11[1] : {};
      var options = _arguments11.length > 2 && _arguments11[2] !== undefined ? _arguments11[2] : {};
      try {
        var updateResponse = yield _this11.MongooseModel.updateMany(query, updateObj, options).orFail();
        return updateResponse;
      } catch (error) {
        throw new _MongoError.default(error);
      }
    })();
  }
  updateById() {
    var _arguments12 = arguments,
      _this12 = this;
    return _asyncToGenerator(function* () {
      var id = _arguments12.length > 0 && _arguments12[0] !== undefined ? _arguments12[0] : '';
      var updateObj = _arguments12.length > 1 && _arguments12[1] !== undefined ? _arguments12[1] : {};
      var options = _arguments12.length > 2 && _arguments12[2] !== undefined ? _arguments12[2] : {};
      try {
        var updateOptions = _objectSpread(_objectSpread({
          new: true,
          rawResult: true,
          lean: {
            virtuals: true
          }
        }, options), {}, {
          sanitizeProjection: true
        });
        var updateResponse = yield _this12.MongooseModel.findByIdAndUpdate(id, updateObj, updateOptions);
        var {
          value
        } = updateResponse;
        var object = updateOptions.rawResult && value || updateResponse;
        if (!object) {
          var error = {
            message: 'Document Not Found',
            name: 'DocumentNotFoundError',
            errors: {
              id,
              options
            }
          };
          throw new _MongoError.default(error);
        }
        return object;
      } catch (error) {
        throw new _MongoError.default(error);
      }
    })();
  }
  updateOneBy() {
    var _arguments13 = arguments,
      _this13 = this;
    return _asyncToGenerator(function* () {
      var key = _arguments13.length > 0 && _arguments13[0] !== undefined ? _arguments13[0] : '';
      var value = _arguments13.length > 1 ? _arguments13[1] : undefined;
      var updateObj = _arguments13.length > 2 && _arguments13[2] !== undefined ? _arguments13[2] : {};
      var options = _arguments13.length > 3 && _arguments13[3] !== undefined ? _arguments13[3] : {};
      var query = {
        [key]: value
      };
      var object = yield _this13.updateOne(query, updateObj, options);
      return object;
    })();
  }
  updateManyBy() {
    var _arguments14 = arguments,
      _this14 = this;
    return _asyncToGenerator(function* () {
      var key = _arguments14.length > 0 && _arguments14[0] !== undefined ? _arguments14[0] : '';
      var value = _arguments14.length > 1 ? _arguments14[1] : undefined;
      var updateObj = _arguments14.length > 2 && _arguments14[2] !== undefined ? _arguments14[2] : {};
      var options = _arguments14.length > 3 && _arguments14[3] !== undefined ? _arguments14[3] : {};
      var query = {
        [key]: value
      };
      var objects = yield _this14.updateMany(query, updateObj, options);
      return objects;
    })();
  }
  remove() {
    var _arguments15 = arguments,
      _this15 = this;
    return _asyncToGenerator(function* () {
      var query = _arguments15.length > 0 && _arguments15[0] !== undefined ? _arguments15[0] : {};
      var options = _arguments15.length > 1 && _arguments15[1] !== undefined ? _arguments15[1] : {};
      try {
        var removeResponse = yield _this15.MongooseModel.deleteMany(query, options);
        return removeResponse;
      } catch (error) {
        throw new _MongoError.default(error);
      }
    })();
  }
  removeById() {
    var _arguments16 = arguments,
      _this16 = this;
    return _asyncToGenerator(function* () {
      var id = _arguments16.length > 0 && _arguments16[0] !== undefined ? _arguments16[0] : '';
      var options = _arguments16.length > 1 && _arguments16[1] !== undefined ? _arguments16[1] : {};
      try {
        var removeOptions = _objectSpread(_objectSpread({
          rawResult: true,
          lean: {
            virtuals: true
          }
        }, options), {}, {
          sanitizeProjection: true
        });
        var removeResponse = yield _this16.MongooseModel.findByIdAndRemove(id, removeOptions).orFail();
        var {
          value
        } = removeResponse;
        var object = removeOptions.rawResult && value || removeResponse;
        return object;
      } catch (error) {
        throw new _MongoError.default(error);
      }
    })();
  }
  list() {
    var _arguments17 = arguments,
      _this17 = this;
    return _asyncToGenerator(function* () {
      var projection = _arguments17.length > 0 && _arguments17[0] !== undefined ? _arguments17[0] : {};
      var options = _arguments17.length > 1 && _arguments17[1] !== undefined ? _arguments17[1] : {};
      var objects = yield _this17.findMany({}, projection, options);
      return objects;
    })();
  }
  search() {
    var _arguments18 = arguments,
      _this18 = this;
    return _asyncToGenerator(function* () {
      var query = _arguments18.length > 0 && _arguments18[0] !== undefined ? _arguments18[0] : {};
      var projections = _arguments18.length > 1 && _arguments18[1] !== undefined ? _arguments18[1] : {};
      var options = _arguments18.length > 2 && _arguments18[2] !== undefined ? _arguments18[2] : {};
      var searchOptions = {
        skip: options.skip || _CONSTANTS.DEFAULT_SKIP,
        limit: options.limit || _CONSTANTS.DEFAULT_LIMIT,
        sort: options.sort || _CONSTANTS.DEFAULT_SORT
      };
      var promises = [_this18.getCount(query), _this18.findMany(query, projections, searchOptions)];
      var [countResponse, findResponse] = yield Promise.allSettled(promises);
      var countError = countResponse.status === 'rejected';
      var findError = findResponse.status === 'rejected';
      if (findError) {
        throw findResponse.reason;
      }
      var {
        value: count
      } = countResponse;
      var {
        value: objects
      } = findResponse;
      var data = {
        _meta: {
          totalDocuments: countError ? null : count,
          documentsCount: objects.length
        },
        documents: objects
      };
      return data;
    })();
  }
  aggregate() {
    var _arguments19 = arguments,
      _this19 = this;
    return _asyncToGenerator(function* () {
      var pipeline = _arguments19.length > 0 && _arguments19[0] !== undefined ? _arguments19[0] : [];
      try {
        var result = _this19.MongooseModel.aggregate(pipeline);
        return result;
      } catch (error) {
        throw new _MongoError.default(error);
      }
    })();
  }
}
exports.default = MongoModel;