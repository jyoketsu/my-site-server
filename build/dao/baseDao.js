"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseDao = /** @class */ (function () {
    /**
     * 子类构造传入对应的 Model 类
     *
     * @param model
     */
    function BaseDao(model) {
        this.model = model;
    }
    /**
     * 使用 Model 的 静态方法 create() 添加 doc
     *
     * @param docs 构造实体的对象
     * @returns {Promise}
     */
    BaseDao.prototype.create = function (docs) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var entity = new _this.model(docs);
            _this.model.create(entity, function (error, result) {
                if (error) {
                    console.log("create error--> ", error);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    };
    /**
     * 使用 Model save() 添加 doc
     *
     * @param docs 构造实体的对象
     * @returns {Promise}
     */
    BaseDao.prototype.save = function (docs) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var entity = new _this.model(docs);
            entity.save(function (error, result) {
                if (error) {
                    console.log("save error--> ", error);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    };
    BaseDao.prototype.findById = function (_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.model.findById(_id, function (error, results) {
                if (error) {
                    console.log("findById error--> ", error);
                    reject(error);
                }
                else {
                    resolve(results);
                }
            });
        });
    };
    /**
     * 查询所有符合条件 docs
     *
     * @param filter 查询条件
     * @param projection 指定要包含或排除哪些 document 字段(也称为查询“投影”)
     * @param options
     * @returns {Promise}
     */
    BaseDao.prototype.findAll = function (filter, projection, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (filter) {
                _this.model.find(filter, projection ? projection : null, options ? options : null, function (error, results) {
                    if (error) {
                        console.log("findAll error--> ", error);
                        reject(error);
                    }
                    else {
                        resolve(results);
                    }
                });
            }
            else {
                _this.model.find(function (error, results) {
                    if (error) {
                        console.log("findAll error--> ", error);
                        reject(error);
                    }
                    else {
                        resolve(results);
                    }
                });
            }
        });
    };
    /**
     * 查找符合条件的第一条 doc
     *
     * @param filter
     * @param projection
     * @param options
     * @returns {Promise}
     */
    BaseDao.prototype.findOne = function (filter, projection, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.model.findOne(filter, projection, options, function (error, results) {
                if (error) {
                    console.log("findOne error--> ", error);
                    reject(error);
                }
                else {
                    resolve(results);
                }
            });
        });
    };
    /**
     * 查找排序之后的第一条
     *
     * @param filter
     * @param orderColumn
     * @param orderType
     * @returns {Promise}
     */
    BaseDao.prototype.findOneByOrder = function (filter, orderColumn, orderType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a;
            _this.model
                .findOne(filter)
                .sort((_a = {}, _a[orderColumn] = orderType, _a))
                .exec(function (err, record) {
                console.log(record);
                if (err) {
                    reject(err);
                }
                else {
                    resolve(record);
                }
            });
        });
    };
    /**
     * 更新 docs
     *
     * @param filter 查找条件
     * @param update 更新操作
     * @param options 更新操作
     * @returns {Promise}
     */
    BaseDao.prototype.update = function (filter, update, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.model.updateOne(filter, update, options, function (error, results) {
                if (error) {
                    console.log("update error--> ", error);
                    reject(error);
                }
                else {
                    resolve(results);
                }
            });
        });
    };
    /**
     * 移除 doc
     *
     * @param filter 查找条件
     * @returns {Promise}
     */
    BaseDao.prototype.deleteOne = function (filter, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.model.deleteOne(filter, options, function (error) {
                if (error) {
                    console.log("remove error--> ", error);
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    };
    /**
     * 获取数量
     *
     * @param filter
     * @returns {Promise}
     */
    BaseDao.prototype.count = function (filter) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.model.countDocuments(filter, function (error, results) {
                if (error) {
                    console.log("countDocuments error--> ", error);
                    reject(error);
                }
                else {
                    resolve(results);
                }
            });
        });
    };
    return BaseDao;
}());
exports.default = BaseDao;
