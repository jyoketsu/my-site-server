"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var baseDao_1 = __importDefault(require("./baseDao"));
var article_1 = __importDefault(require("../model/article"));
var ArticleDao = /** @class */ (function (_super) {
    __extends(ArticleDao, _super);
    function ArticleDao() {
        return _super.call(this, article_1.default) || this;
    }
    ArticleDao.prototype.findByIdDetail = function (_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.model
                .findById(_id)
                .populate("auth", { username: 1 })
                .populate("category", { name: 1 })
                .populate("tags", { name: 1, color: 1 })
                .exec(function (err, record) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(record);
                }
            });
        });
    };
    ArticleDao.prototype.find = function (filter, current, pageSize, sorter) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var count, skip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.count(filter)];
                    case 1:
                        count = _a.sent();
                        skip = (current - 1) * pageSize;
                        this.model
                            .find(filter)
                            .populate("auth", { username: 1 })
                            .populate("category", { name: 1 })
                            .populate("tags", { name: 1, color: 1 })
                            .skip(skip)
                            .limit(pageSize)
                            .sort(sorter ? sorter : { createTime: -1 })
                            .select("-content")
                            .exec(function (err, record) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve({ array: record, count: count });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    // 计算各个类别的文章数
    ArticleDao.prototype.categoryArticleCount = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.model
                .aggregate([
                {
                    $group: {
                        _id: "$category",
                        count: { $sum: 1 },
                    },
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "_id",
                        foreignField: "_id",
                        as: "category",
                    },
                },
                {
                    $unwind: "$category",
                },
                {
                    $project: { count: 1, name: "$category.name" },
                },
            ])
                .exec(function (err, record) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(record);
                }
            });
        });
    };
    // 计算各个标签的文章数
    ArticleDao.prototype.tagArticleCount = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.model
                .aggregate()
                .unwind("tags")
                .group({ _id: "$tags", count: { $sum: 1 } })
                .lookup({
                from: "tags",
                localField: "_id",
                foreignField: "_id",
                as: "tag",
            })
                .unwind("tag")
                .project({ count: 1, name: "$tag.name" })
                .exec(function (err, record) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(record);
                }
            });
        });
    };
    return ArticleDao;
}(baseDao_1.default));
exports.default = ArticleDao;
