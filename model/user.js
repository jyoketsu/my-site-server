var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let userSchema = new Schema({
  // 用户名
  username: {
    type: String,
    unique: true,
    max: 50,
    trim: true,
    required: [true, "用户名不能为空"],
  },
  // 密码
  password: {
    type: String,
    max: 50,
    trim: true,
    required: [true, "密码不能为空"],
  },
  // 头像地址
  avatar: String,
  // 权限：博主：1；用户、游客：0
  role: Number,
});

module.exports = mongoose.model("User", userSchema);
