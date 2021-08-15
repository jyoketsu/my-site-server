const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user = require("./router/user");
const category = require("./router/category");
const tag = require("./router/tag");
const visitor = require("./router/visitor");
const link = require("./router/link");
const article = require("./router/article");
const system = require("./router/system");
const resume = require("./router/resume");

// 连接数据库
mongoose.connect("mongodb://139.155.124.76/mySite", { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("数据库连接了");
});

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT,POST,PATCH,GET,DELETE,OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type,token");
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
app.use("/tag", tag);
app.use("/visitor", visitor);
app.use("/link", link);
app.use("/article", article);
app.use("/system", system);
app.use("/resume", resume);

// 启动服务
var server = app.listen(8099, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("kaoru started! http://%s:%s", host, port);
});
