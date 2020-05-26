var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let articleSchema = new Schema(
  {
    title: {
      type: String,
      max: 200,
      required: [true, "标题不能为空"],
    },
    content: {
      type: String,
      required: [true, "内容不能为空"],
    },
    // 文章类型 1:markdown；2:富文本
    type: {
      type: Number,
      required: [true, "类型不能为空"],
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    auth: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "作者不能为空"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "分类不能为空"],
    },
    tag: {
      type: Schema.Types.ObjectId,
      ref: "Tag",
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

module.exports = mongoose.model("Article", articleSchema);
