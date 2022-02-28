"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
var schema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "作者不能为空"],
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "分类不能为空"],
    },
    tags: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: { createdAt: "createTime" },
});
// 3. Create a Model.
var ArticleModel = (0, mongoose_1.model)("Article", schema);
exports.default = ArticleModel;
