const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user = require("./router/user");
const category = require("./router/category");

// 连接数据库
mongoose.connect("mongodb://localhost/mySite", { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("数据库连接了");
});

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// 设定静态资源
app.use(express.static("public"));

// body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 设定路由
app.get("/", function (req, res) {
  res.send("Hello World");
});
app.use("/user", user);
app.use("/category", category);

// 启动服务
var server = app.listen(8099, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("kaoru started! http://%s:%s", host, port);
});
