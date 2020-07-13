var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { checkEditable } = require("../util/checkAuth");
const { spawn } = require("child_process");

// 重载pm2
router.post(
  "/reloadpm2",
  [check("name").notEmpty().withMessage("缺少参数：name")],
  async (req, res) => {
    // 校验
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ status: 403, errors: errors.mapped() });
    }

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

module.exports = router;
