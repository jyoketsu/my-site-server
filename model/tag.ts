import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface Tag {
  name: string;
  color: string;
  count: number;
  createTime: Date;
  updateTime: Date;
}

// 2. Create a Schema corresponding to the document interface.
let schema = new Schema<Tag>(
  {
    name: {
      type: String,
      unique: true,
      max: 50,
      trim: true,
      required: [true, "名字不能为空"],
    },
    color: String,
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
const TagModel = model<Tag>("Tag", schema);
export default TagModel;
