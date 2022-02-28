"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 引入模块依赖
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// 创建 token 类
var Jwt = /** @class */ (function () {
    function Jwt(data) {
        this.data = data;
    }
    //生成token
    Jwt.prototype.generateToken = function () {
        var data = this.data;
        var created = Math.floor(Date.now() / 1000);
        var cert = fs_1.default.readFileSync(path_1.default.join(__dirname, "../private.pem")); //私钥 可以自己生成
        var token = jsonwebtoken_1.default.sign({
            data: data,
            // 有效期：7天
            exp: created + 60 * 60 * 24 * 7,
        }, { key: cert, passphrase: "jyoketsu" }, { algorithm: "RS256" });
        return token;
    };
    // 校验token
    Jwt.prototype.verifyToken = function () {
        var token = this.data;
        var cert = fs_1.default.readFileSync(path_1.default.join(__dirname, "../public.pem")); //公钥 可以自己生成
        var res;
        try {
            var result = jsonwebtoken_1.default.verify(token, cert, { algorithms: ["RS256"] }) || {};
            var _a = result.exp, exp = _a === void 0 ? 0 : _a, current = Math.floor(Date.now() / 1000);
            if (current <= exp) {
                res = result.data || {};
            }
        }
        catch (e) {
            res = "err";
        }
        return res;
    };
    return Jwt;
}());
exports.default = Jwt;
module.exports = Jwt;
