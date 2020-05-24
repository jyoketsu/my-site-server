var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let vtourSchema = new Schema({
    name: {
        type: String,
        max: 12,
        required: [true, '请输入名字']
    },
    path: {
        type: String,
        required: [true, '全景路径是必须的']
    },
    // 全景图生成状态，0:生成中；1:生成完成；2:生成失败
    status: {
        type: Number,
        required: [true, '全景状态是必须的']
    },
    gyro: {
        type: Boolean
    },
    littleplanet: {
        type: Boolean,
    },
});

module.exports = mongoose.model('Vtour', vtourSchema);