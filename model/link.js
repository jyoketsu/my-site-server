var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let order = 1;
// 用户排序的字段
let Order = { type: Number, default: () => order++ };

let linkSchema = new Schema(
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

const model = mongoose.model("Link", linkSchema);
module.exports = model;

model
  .find({ order: { $gt: 0 } })
  .sort({ order: -1 })
  .then(([first, ...others]) => {
    if (first) {
      order = first.order + 1;
    }
  });
