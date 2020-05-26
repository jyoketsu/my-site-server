var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// UV
let visitorSchema = new Schema(
  {
    uid: {
      type: String,
      unique: true,
    },
    username: String,
    createTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: { createdAt: "createTime" } }
);

module.exports = mongoose.model("Visitor", visitorSchema);
