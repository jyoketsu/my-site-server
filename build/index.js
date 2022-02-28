"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var mongoose_1 = __importDefault(require("mongoose"));
var user_1 = __importDefault(require("./router/user"));
var category_1 = __importDefault(require("./router/category"));
var tag_1 = __importDefault(require("./router/tag"));
var visitor_1 = __importDefault(require("./router/visitor"));
var link_1 = __importDefault(require("./router/link"));
var article_1 = __importDefault(require("./router/article"));
var system_1 = __importDefault(require("./router/system"));
var resume_1 = __importDefault(require("./router/resume"));
// 连接数据库
mongoose_1.default.connect("mongodb://localhost:27017/mySite?authSource=admin", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    user: "jyoketsu",
    pass: "528931", // password
});
var db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "数据库连接失败！！"));
db.once("open", function () {
    console.log("数据库连接了");
});
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,token");
    next();
});
// 设定静态资源
app.use(express_1.default.static("public"));
// body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 设定路由
app.get("/", function (req, res) {
    res.send("Hello World");
});
app.use("/user", user_1.default);
app.use("/category", category_1.default);
app.use("/tag", tag_1.default);
app.use("/visitor", visitor_1.default);
app.use("/link", link_1.default);
app.use("/article", article_1.default);
app.use("/system", system_1.default);
app.use("/resume", resume_1.default);
// 启动服务
var server = app.listen(8099, function () {
    if (server && server.address() && server.address()) {
        // const host = server.address().address;
        // const port = server.address().port;
        // console.log("kaoru started! http://%s:%s", host, port);
        console.log("---started!! 8099---");
    }
});
