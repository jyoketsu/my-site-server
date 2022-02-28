"use strict";
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
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var linkDao_1 = __importDefault(require("../dao/linkDao"));
var checkAuth_1 = require("../util/checkAuth");
var router = express_1.default.Router();
// 获取链接
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var linkDao, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                linkDao = new linkDao_1.default();
                return [4 /*yield*/, linkDao.find()];
            case 1:
                result = _a.sent();
                res.json({ status: 200, result: result });
                return [2 /*return*/];
        }
    });
}); });
// 创建链接
router.post("/create", [
    (0, express_validator_1.check)("name").notEmpty().withMessage("缺少参数：name"),
    (0, express_validator_1.check)("name").isLength({ max: 50 }).withMessage("name最多50个字符！"),
    (0, express_validator_1.check)("icon").notEmpty().withMessage("缺少参数：icon"),
    (0, express_validator_1.check)("uri").notEmpty().withMessage("缺少参数：uri"),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, editable, linkDao, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.json({ status: 403, errors: errors.mapped() })];
                }
                editable = (0, checkAuth_1.checkEditable)(req, res);
                if (!editable) {
                    return [2 /*return*/];
                }
                linkDao = new linkDao_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, linkDao.create({
                        name: req.body.name,
                        icon: req.body.icon,
                        uri: req.body.uri,
                    })];
            case 2:
                result = _a.sent();
                res.json({ status: 200, result: result });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.json({
                    status: 500,
                    error: error_1,
                    msg: error_1 && error_1.code === 11000 ? "该链接名已存在！" : "服务出错！",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// 修改链接
router.patch("/update", [
    (0, express_validator_1.check)("_id").notEmpty().withMessage("缺少_id！"),
    (0, express_validator_1.check)("updater").notEmpty().withMessage("缺少参数updater"),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, editable, linkDao, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.json({ status: 403, errors: errors.mapped() })];
                }
                editable = (0, checkAuth_1.checkEditable)(req, res);
                if (!editable) {
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                linkDao = new linkDao_1.default();
                return [4 /*yield*/, linkDao.update({ _id: req.body._id }, req.body.updater)];
            case 2:
                result = _a.sent();
                res.json({ status: 200, result: result });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.json({
                    status: 500,
                    error: error_2,
                    msg: error_2 && error_2.code === 11000 ? "该链接名已存在！" : "服务出错！",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// 删除链接
router.delete("/delete", [(0, express_validator_1.check)("_id").notEmpty().withMessage("缺少_id！")], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, editable, linkDao, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.json({ status: 403, errors: errors.mapped() })];
                }
                editable = (0, checkAuth_1.checkEditable)(req, res);
                if (!editable) {
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                linkDao = new linkDao_1.default();
                return [4 /*yield*/, linkDao.deleteOne({ _id: req.body._id })];
            case 2:
                result = _a.sent();
                res.json({ status: 200, result: result });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.json({
                    status: 500,
                    error: error_3,
                    msg: "服务出错！",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
