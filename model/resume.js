var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let articleSchema = new Schema(
  {
    // 个人信息
    profile: {
      // 姓名
      name: { type: String, max: 200 },
      // 地点
      location: { type: String, max: 200 },
      // 职位
      post: { type: String, max: 200 },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "用户不能为空"],
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
    timestamps: { createdAt: "createTime" },
  }
);

module.exports = mongoose.model("Article", articleSchema);
