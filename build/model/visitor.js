"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
var schema = new mongoose_1.Schema({
    uid: {
        type: String,
        unique: true,
    },
    username: String,
    createTime: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: { createdAt: "createTime" } });
// 3. Create a Model.
var VisitorModel = (0, mongoose_1.model)("Visitor", schema);
exports.default = VisitorModel;
