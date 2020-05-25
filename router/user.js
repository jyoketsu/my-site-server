var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const UserDao = require("../dao/userDao");
const JwtUtil = require("../util/jwt");

router.get("/", async (req, res) => {
  let userDao = new UserDao();
  const result = await userDao.findAll();
  res.json({ status: 200, result: result });
});

// 校验
const createValidationChecks = [
  check("username").isLength({ min: 1 }).withMessage("请输入用户名！"),
  check("username").isLength({ max: 50 }).withMessage("用户名最大50个字符！"),
  check("password").isLength({ min: 1 }).withMessage("请输入密码！"),
  check("password").isLength({ max: 50 }).withMessage("密码最大50个字符！"),
];

// 注册
router.post("/register", createValidationChecks, async (req, res) => {
  // 校验
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ status: 403, errors: errors.mapped() });
  }
  let userDao = new UserDao();
  try {
    // 创建用户
    const result = await userDao.create({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
    });
    // 将用户id传入并生成token
    let jwt = new JwtUtil(result._id);
    let token = jwt.generateToken();
    res.json({ status: 200, token: token, result: result });
  } catch (error) {
    res.json({
      status: 500,
      error,
      msg: error && error.code === 11000 ? "该用户名已存在！" : "服务出错！",
    });
  }
});

// token登录
router.get("/loginByToken", async (req, res) => {
  let token = req.headers.token;
  let jwt = new JwtUtil(token);
  let _id = jwt.verifyToken();
  if (_id == "err") {
    res.send({ status: 403, msg: "登录已过期,请重新登录" });
  } else {
    let userDao = new UserDao();
    const result = await userDao.findById(_id);
    res.json({ status: 200, token: token, result: result });
  }
});

// 登录
router.get("/login", async (req, res) => {
  let userDao = new UserDao();
  const result = await userDao.findOne({
    username: req.query.username,
    password: req.query.password,
  });
  if (result) {
    // 将用户id传入并生成token
    let jwt = new JwtUtil(result._id);
    let token = jwt.generateToken();
    res.json({ status: 200, token: token, result: result });
  } else {
    res.json({ status: 401, msg: "用户名或者密码错误！" });
  }
});

// 是否有博主
router.get("/blogger", async (req, res) => {
  let userDao = new UserDao();
  const result = await userDao.findOne({
    role: 1,
  });
  res.json({ status: 200, result: result });
});

// 校验
const updateValidationChecks = [
  check("_id").notEmpty().withMessage("缺少_id！"),
  check("updater").notEmpty().withMessage("缺少参数updater"),
];
// 修改
router.post("/update", updateValidationChecks, async (req, res) => {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ status: 403, errors: errors.mapped() });
  }
  try {
    let userDao = new UserDao();
    // 更新
    const result = await userDao.update(
      { _id: req.body._id },
      req.body.updater
    );
    res.json({ status: 200, result: result });
  } catch (error) {
    res.json({
      status: 500,
      error,
      msg: error && error.code === 11000 ? "该用户名已存在！" : "服务出错！",
    });
  }
});

module.exports = router;
