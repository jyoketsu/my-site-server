var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const CategoryDao = require("../dao/categoryDao");
const ArticleDao = require("../dao/articleDao");
const { checkEditable } = require("../util/checkAuth");

// 获取分类
router.get("/", async (req, res) => {
  let categoryDao = new CategoryDao();
  let articleDao = new ArticleDao();
  let result = await categoryDao.findAll();
  const countRes = await articleDao.categoryArticleCount();
  for (let index = 0; index < result.length; index++) {
    const element = result[index];
    const target = countRes.find(
      (res) => String(res._id) === String(element._id)
    );
    element.count = target ? target.count : 0;
  }
  res.json({ status: 200, result: result });
});

// 创建分类
router.post(
  "/create",
  [
    check("name").notEmpty().withMessage("缺少参数：name"),
    check("name").isLength({ max: 50 }).withMessage("最多50个字符！"),
  ],
  async (req, res) => {
    const editable = checkEditable(req, res);
    if (!editable) {
      return;
    }
    // 校验
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: 403, errors: errors.mapped() });
    }
    let categoryDao = new CategoryDao();
    try {
      // 创建
      const result = await categoryDao.create({
        name: req.body.name,
        count: 0,
      });
      res.json({ status: 200, result: result });
    } catch (error) {
      res.json({
        status: 500,
        error,
        msg: error && error.code === 11000 ? "该分类已存在！" : "服务出错！",
      });
    }
  }
);

// 修改分类
router.post(
  "/update",
  [
    check("_id").notEmpty().withMessage("缺少_id！"),
    check("updater").notEmpty().withMessage("缺少参数updater"),
  ],
  async (req, res) => {
    const editable = checkEditable(req, res);
    if (!editable) {
      return;
    }

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: 403, errors: errors.mapped() });
    }
    try {
      let categoryDao = new CategoryDao();
      // 更新
      const result = await categoryDao.update(
        { _id: req.body._id },
        req.body.updater
      );
      res.json({ status: 200, result: result });
    } catch (error) {
      res.json({
        status: 500,
        error,
        msg: error && error.code === 11000 ? "该分类已存在！" : "服务出错！",
      });
    }
  }
);

// 删除分类
router.delete(
  "/delete",
  [check("_id").notEmpty().withMessage("缺少_id！")],
  async (req, res) => {
    const editable = checkEditable(req, res);
    if (!editable) {
      return;
    }

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: 403, errors: errors.mapped() });
    }
    try {
      let categoryDao = new CategoryDao();
      // 删除
      const result = await categoryDao.deleteOne({ _id: req.body._id });
      res.json({ status: 200, result: result });
    } catch (error) {
      res.json({
        status: 500,
        error,
        msg: "服务出错！",
      });
    }
  }
);

// 计数
router.get("/count", async (req, res) => {
  try {
    let categoryDao = new CategoryDao();
    const result = await categoryDao.count();
    res.json({ status: 200, result: result });
  } catch (error) {
    res.json({
      status: 500,
      error,
      msg: "服务出错！",
    });
  }
});

module.exports = router;
