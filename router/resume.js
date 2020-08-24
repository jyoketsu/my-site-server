var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const ResumeDao = require("../dao/resumeDao");
const { checkEditable } = require("../util/checkAuth");

// 获取简历
router.get("/", async (req, res) => {
  let resumeDao = new ResumeDao();
  let filter = {};
  const lang = req.query.lang;
  if (lang) {
    filter["lang"] = lang;
  }
  const result = await resumeDao.findAll(filter);
  res.json({ status: 200, result: result });
});

// 获取简历
router.get("/lang", async (req, res) => {
  let resumeDao = new ResumeDao();
  let filter = {};
  const lang = req.query.lang;
  if (lang) {
    filter["lang"] = lang;
  }
  const result = await resumeDao.findOne(filter);
  res.json({ status: 200, result: result });
});

// 创建简历
router.post(
  "/create",
  [
    check("lang").notEmpty().withMessage("缺少参数：lang"),
    check("user").notEmpty().withMessage("缺少参数：user"),
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
    let resumeDao = new ResumeDao();
    try {
      // 创建
      const result = await resumeDao.create({
        profile: req.body.profile,
        skills: req.body.skills,
        knowledge: req.body.knowledge,
        experience: req.body.experience,
        projects: req.body.projects,
        lang: req.body.lang,
        user: req.body.user,
      });
      res.json({ status: 200, result: result });
    } catch (error) {
      res.json({
        status: 500,
        error,
        msg: error && error.code === 11000 ? "唯一字段重复！" : "服务出错！",
      });
    }
  }
);

// 修改简历
router.patch(
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
      let resumeDao = new ResumeDao();
      // 更新
      const result = await resumeDao.update(
        { _id: req.body._id },
        req.body.updater
      );
      res.json({ status: 200, result: result });
    } catch (error) {
      res.json({
        status: 500,
        error,
        msg: error && error.code === 11000 ? "该简历已存在！" : "服务出错！",
      });
    }
  }
);

// 删除简历
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
      let resumeDao = new ResumeDao();
      // 删除
      const result = await resumeDao.deleteOne({ _id: req.body._id });
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

module.exports = router;
