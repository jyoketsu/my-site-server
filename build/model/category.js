"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
var schema = new mongoose_1.Schema({
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
}, {
    timestamps: { createdAt: "createTime", updatedAt: "updateTime" },
});
// 3. Create a Model.
var CategoryModel = (0, mongoose_1.model)("Category", schema);
exports.default = CategoryModel;
