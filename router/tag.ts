import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import TagDao from "../dao/tagDao";
import ArticleDao from "../dao/articleDao";
import { checkEditable } from "../util/checkAuth";
const router = express.Router();

// 获取标签
router.get("/", async (req, res) => {
  let tagDao = new TagDao();
  let articleDao = new ArticleDao();
  let result = await tagDao.findAll(undefined, undefined, {
    sort: { updateTime: -1 },
  });
  const countRes: any = await articleDao.tagArticleCount();
  for (let index = 0; index < result.length; index++) {
    const element = result[index];
    const target = countRes.find(
      (res: any) => String(res._id) === String(element._id)
    );
    element.count = target ? target.count : 0;
  }
  res.json({ status: 200, result: result });
});

// 创建标签
router.post(
  "/create",
  [
    check("name").notEmpty().withMessage("缺少参数：name"),
    check("name").isLength({ max: 50 }).withMessage("最多50个字符！"),
    check("color").notEmpty().withMessage("缺少参数：color"),
  ],
  async (req: Request, res: Response) => {
    const editable = checkEditable(req, res);
    if (!editable) {
      return;
    }
    // 校验
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: 403, errors: errors.mapped() });
    }
    let tagDao = new TagDao();
    try {
      // 创建
      const result = await tagDao.create({
        name: req.body.name,
        color: req.body.color,
        count: 0,
      });
      res.json({ status: 200, result: result });
    } catch (error: any) {
      res.json({
        status: 500,
        error,
        msg: error && error.code === 11000 ? "唯一字段重复！" : "服务出错！",
      });
    }
  }
);

// 修改标签
router.patch(
  "/update",
  [
    check("_id").notEmpty().withMessage("缺少_id！"),
    check("updater").notEmpty().withMessage("缺少参数updater"),
  ],
  async (req: Request, res: Response) => {
    const editable = checkEditable(req, res);
    if (!editable) {
      return;
    }

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: 403, errors: errors.mapped() });
    }
    try {
      let tagDao = new TagDao();
      // 更新
      const result = await tagDao.update(
        { _id: req.body._id },
        req.body.updater
      );
      res.json({ status: 200, result: result });
    } catch (error: any) {
      res.json({
        status: 500,
        error,
        msg: error && error.code === 11000 ? "该标签已存在！" : "服务出错！",
      });
    }
  }
);

// 删除标签
router.delete(
  "/delete",
  [check("_id").notEmpty().withMessage("缺少_id！")],
  async (req: Request, res: Response) => {
    const editable = checkEditable(req, res);
    if (!editable) {
      return;
    }

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: 403, errors: errors.mapped() });
    }
    try {
      let tagDao = new TagDao();
      // 删除
      const result = await tagDao.deleteOne({ _id: req.body._id });
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
    let tagDao = new TagDao();
    const result = await tagDao.count({});
    res.json({ status: 200, result: result });
  } catch (error) {
    res.json({
      status: 500,
      error,
      msg: "服务出错！",
    });
  }
});

export default router;
