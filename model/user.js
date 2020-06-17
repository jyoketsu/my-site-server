var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let userSchema = new Schema(
  {
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
    // 邮箱
    email: {
      type: String,
      unique: true,
      max: 50,
      trim: true,
    },
    // 头像地址
    avatar: String,
    // 权限：博主：0；用户、游客：1
    role: {
      type: Number,
      default: 1,
    },
    createTime: {
      type: Date,
      default: Date.now,
    },
    updateTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: "createTime", updatedAt: "updateTime" },
  }
);

module.exports = mongoose.model("User", userSchema);
