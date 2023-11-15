const { default: mongoose } = require("mongoose");

const paymentSchema = new mongoose.Schema({
    invoiceNumber: {type: String},
    authority: {type: String},
    amount: {type: Number},
    paymentdate: {type: Number},
    description: {type: String, default: "برای خرید"},
    verify: {type: Boolean, default: false},
    user: {type: mongoose.Types.ObjectId, ref: "user"},
    basket: {type: Object, default: {}},
    refID: {type: String, default: undefined},
    cardHash: {type: String, default: undefined},
}, {timestamps: true})

const paymentmodel = mongoose.model("payment", paymentSchema)

module.exports = {
    paymentmodel

}