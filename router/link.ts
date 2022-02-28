import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import LinkDao from "../dao/linkDao";
import { checkEditable } from "../util/checkAuth";
const router = express.Router();

// 获取链接
router.get("/", async (req: Request, res: Response) => {
  let linkDao = new LinkDao();
  const result = await linkDao.find();
  res.json({ status: 200, result: result });
});

// 创建链接
router.post(
  "/create",
  [
    check("name").notEmpty().withMessage("缺少参数：name"),
    check("name").isLength({ max: 50 }).withMessage("name最多50个字符！"),
    check("icon").notEmpty().withMessage("缺少参数：icon"),
    check("uri").notEmpty().withMessage("缺少参数：uri"),
  ],
  async (req: Request, res: Response) => {
    // 校验
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: 403, errors: errors.mapped() });
    }

    const editable = checkEditable(req, res);
    if (!editable) {
      return;
    }

    let linkDao = new LinkDao();
    try {
      // 创建
      const result = await linkDao.create({
        name: req.body.name,
        icon: req.body.icon,
        uri: req.body.uri,
      });
      res.json({ status: 200, result: result });
    } catch (error: any) {
      res.json({
        status: 500,
        error,
        msg: error && error.code === 11000 ? "该链接名已存在！" : "服务出错！",
      });
    }
  }
);

// 修改链接
router.patch(
  "/update",
  [
    check("_id").notEmpty().withMessage("缺少_id！"),
    check("updater").notEmpty().withMessage("缺少参数updater"),
  ],
  async (req: Request, res: Response) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: 403, errors: errors.mapped() });
    }

    const editable = checkEditable(req, res);
    if (!editable) {
      return;
    }

    try {
      let linkDao = new LinkDao();
      // 更新
      const result = await linkDao.update(
        { _id: req.body._id },
        req.body.updater
      );
      res.json({ status: 200, result: result });
    } catch (error: any) {
      res.json({
        status: 500,
        error,
        msg: error && error.code === 11000 ? "该链接名已存在！" : "服务出错！",
      });
    }
  }
);

// 删除链接
router.delete(
  "/delete",
  [check("_id").notEmpty().withMessage("缺少_id！")],
  async (req: Request, res: Response) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: 403, errors: errors.mapped() });
    }

    const editable = checkEditable(req, res);
    if (!editable) {
      return;
    }

    try {
      let linkDao = new LinkDao();
      // 删除
      const result = await linkDao.deleteOne({ _id: req.body._id });
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

export default router;
