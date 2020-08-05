const JwtUtil = require("./jwt");

function checkEditable(req, res) {
  let token = req.headers.token;
  let jwt = new JwtUtil(token);
  let result = jwt.verifyToken();
  if (result == "err") {
    res.send({ status: 403, msg: "登录已过期,请重新登录" });
    return false;
  } else {
    if (result.role > 0) {
      res.send({ status: 405, msg: "没有权限执行此操作！" });
      return false;
    } else {
      return true;
    }
  }
}

module.exports = { checkEditable };
