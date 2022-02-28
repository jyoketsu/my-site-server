import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface Category {
  name: string;
  count: number;
  createTime: Date;
  updateTime: Date;
}

// 2. Create a Schema corresponding to the document interface.
let schema = new Schema<Category>(
  {
    name: {
      type: String,
      unique: true,
      max: 50,
      trim: true,
      required: [true, "名字不能为空"],
    },
    count: Number,
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

// 3. Create a Model.
const CategoryModel = model<Category>("Category", schema);
export default CategoryModel;
