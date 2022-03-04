import express from "express";
const app = express();
import mongoose from "mongoose";
import user from "./router/user";
import category from "./router/category";
import tag from "./router/tag";
import visitor from "./router/visitor";
import link from "./router/link";
import article from "./router/article";
import system from "./router/system";
import resume from "./router/resume";

// 连接数据库
mongoose.connect(
  process.env.MONGO_URL || "mongodb://localhost:27017/mySite?authSource=admin",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    user: process.env.MONGO_USER || "jyoketsu", // username
    pass: process.env.MONGO_PASS || "528931", // password
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "数据库连接失败！！"));
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
const bodyParser = require("body-parser");
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
const server = app.listen(process.env.PORT || 8099, () => {
  if (server && server.address() && server.address()) {
    // const host = server.address().address;
    // const port = server.address().port;
    // console.log("kaoru started! http://%s:%s", host, port);
    console.log(`---started!! ${process.env.PORT || 8099}---`);
  }
});
