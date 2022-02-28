import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { checkEditable, checkLogin } from "../util/checkAuth";
import { spawn } from "child_process";
const router = express.Router();

// pm2服务列表
router.post("/listpm2", async (req, res) => {
  // 校验用户状态
  const isLogin = checkLogin(req, res);
  if (!isLogin) {
    return;
  }

  let result: any;

  // 执行命名
  const exec = spawn("pm2", ["jlist"]);

  // 执行命令成功
  exec.on("close", (code, signal) => {
    res.json({ status: 200, result });
  });

  // 获取指令返回的stdout
  exec.stdout.on("data", (data) => {
    result = JSON.parse(`${data}`);
  });

  // 执行命令失败
  exec.on("error", (err) => {
    res.json({
      status: 500,
      msg: err,
    });
  });
});

// 重载pm2
router.post(
  "/reloadpm2",
  [check("name").notEmpty().withMessage("缺少参数：name")],
  async (req: Request, res: Response) => {
    // 校验
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: 403, errors: errors.mapped() });
    }

    // 校验用户权限
    const editable = checkEditable(req, res);
    if (!editable) {
      return;
    }

    const name = req.body.name;

    // 执行命名
    const exec = spawn("pm2", ["reload", name]);

    // 执行命令成功
    exec.on("close", (code) => {
      res.json({ status: 200 });
    });

    // 执行命令失败
    exec.on("error", (err) => {
      res.json({
        status: 500,
        msg: err,
      });
    });
  }
);

export default router;
