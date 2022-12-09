const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Account = new Schema(
    {
        accountId: { type: ObjectId },
        username: { type: String, required: true, unique: true, max: 50 },
        password: { type: String, required: true, max: 50 },
        role: {type: String, default: "USER"},
        email: {type: String, default: "none@gmail.com"},
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Account', Account);
