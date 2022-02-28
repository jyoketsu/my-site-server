import { Schema, model } from "mongoose";
// 1. Create an interface representing a document in MongoDB.
interface Link {
  order: number;
  name: string;
  icon: string;
  uri: string;
  createTime: Date;
  updateTime: Date;
}

// 2. Create a Schema corresponding to the document interface.
let order = 1;
// 用户排序的字段
let Order = { type: Number, default: () => order++ };

let schema = new Schema<Link>(
  {
    order: Order,
    name: {
      type: String,
      unique: true,
      max: 50,
      trim: true,
      required: [true, "不能为空"],
    },
    icon: {
      type: String,
      trim: true,
      required: [true, "不能为空"],
    },
    uri: {
      type: String,
      required: [true, "不能为空"],
      max: 500,
      trim: true,
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

// 3. Create a Model.
const LinkModel = model<Link>("Link", schema);
export default LinkModel;

// model
//   .find({ order: { $gt: 0 } })
//   .sort({ order: -1 })
//   .then(([first, ...others]) => {
//     if (first) {
//       order = first.order + 1;
//     }
//   });
