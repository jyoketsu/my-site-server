import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB
interface Article {
  title: string;
  cover: string;
  snippet: string;
  content: string;
  type: number;
  viewCount: number;
  auth: string;
  category: string;
  tags: string[];
  createTime: Date;
  updateTime: Date;
}

// 2. Create a Schema corresponding to the document interface.
let schema = new Schema<Article>(
  {
    title: {
      type: String,
      max: 200,
      required: [true, "标题不能为空"],
    },
    cover: {
      type: String,
    },
    // 片段
    snippet: {
      type: String,
    },
    content: {
      type: String,
      required: [true, "内容不能为空"],
    },
    // 文章类型 1:markdown；2:富文本
    type: {
      type: Number,
      default: 1,
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
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
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

// 3. Create a Model.
const ArticleModel = model<Article>("Article", schema);
export default ArticleModel;
