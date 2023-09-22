const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String },
    phone: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    otp: { type: Object, default: { code: 0, expiresIn: 0 } },
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    discount: { type: String },
    roles: { type: [String], default: ['user'] },
})

module.exports = {
    userModel: mongoose.model('user', Schema)
}