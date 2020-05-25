var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let tagSchema = new Schema({
  name: {
    type: String,
    unique: true,
    max: 50,
    trim: true,
    required: [true, "名字不能为空"],
  },
  color: String,
  count: Number,
});

module.exports = mongoose.model("Tag", tagSchema);
