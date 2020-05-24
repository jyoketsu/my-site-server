var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const VtourDao = require("../dao/vtourDao");

router.get("/vtours", async (req, res) => {
  let vtourDao = new VtourDao();
  const result = await vtourDao.findAll();
  res.json({ result: result });
});

const newVtourValidationChecks = [
  check("name").isLength({ min: 1 }).withMessage("全景名长度至少为1"),
];

router.delete("/delete", (req, res) => {
  const body = req.body;
  console.log(body);
  res.json({ result: "111" });
});

module.exports = router;
