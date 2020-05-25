var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let webSchema = new Schema({
  name: String,
  icon: String,
  uri: String,
});

let bloggerSchema = new Schema({
  // 用户名
  username: {
    type: String,
    max: 50,
    trim: true,
    required: [true, "用户名不能为空"],
  },
  // 邮箱
  email: {
    type: String,
    max: 50,
    trim: true
  },
  // 个人网站链接
  webs: [webSchema],
  // UV(Unique Visitor，访客数)
  uniqueVisitorNum: Number,
  // 头像地址
  avatar: String,
});

module.exports = mongoose.model("Blogger", bloggerSchema);
