import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import VisitorDao from "../dao/visitorDao";
const router = express.Router();

// 获取访客
router.get("/", async (req, res) => {
  let visitorDao = new VisitorDao();
  const result = await visitorDao.findAll();
  res.json({ status: 200, result: result });
});

// 获取访客数量
router.get("/count", async (req, res) => {
  let visitorDao = new VisitorDao();
  const result = await visitorDao.count({});
  res.json({ status: 200, result: result });
});

// 新增访客
router.post(
  "/create",
  [check("uid").notEmpty().withMessage("缺少参数：uid")],
  async (req: Request, res: Response) => {
    // 校验
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: 403, errors: errors.mapped() });
    }
    let visitorDao = new VisitorDao();
    try {
      // 创建
      const result = await visitorDao.create({
        uid: req.body.uid,
        username: req.body.username,
        time: new Date().getTime(),
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

export default router;
