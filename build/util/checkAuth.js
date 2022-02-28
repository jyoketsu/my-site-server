"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLogin = exports.checkEditable = void 0;
var jwt_1 = __importDefault(require("./jwt"));
function checkEditable(req, res) {
    var token = req.headers.token;
    var jwt = new jwt_1.default(token);
    var result = jwt.verifyToken();
    if (result == "err") {
        res.send({ status: 403, msg: "登录已过期,请重新登录" });
        return false;
    }
    else {
        if (result.role > 0) {
            res.send({ status: 405, msg: "没有权限执行此操作！" });
            return false;
        }
        else {
            return true;
        }
    }
}
exports.checkEditable = checkEditable;
function checkLogin(req, res) {
    var token = req.headers.token;
    var jwt = new jwt_1.default(token);
    var result = jwt.verifyToken();
    if (result == "err") {
        res.send({ status: 403, msg: "登录已过期,请重新登录" });
        return false;
    }
    else {
        return true;
    }
}
exports.checkLogin = checkLogin;
