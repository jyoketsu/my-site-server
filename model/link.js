var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let linkSchema = new Schema(
  {
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

module.exports = mongoose.model("Link", linkSchema);
