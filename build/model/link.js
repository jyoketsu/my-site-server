"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
var order = 1;
// 用户排序的字段
var Order = { type: Number, default: function () { return order++; } };
var schema = new mongoose_1.Schema({
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
}, {
    timestamps: { createdAt: "createTime", updatedAt: "updateTime" },
});
// 3. Create a Model.
var LinkModel = (0, mongoose_1.model)("Link", schema);
exports.default = LinkModel;
// model
//   .find({ order: { $gt: 0 } })
//   .sort({ order: -1 })
//   .then(([first, ...others]) => {
//     if (first) {
//       order = first.order + 1;
//     }
//   });
