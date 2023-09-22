const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    title: { type: String },
    text: { type: String },
    image: { type: String, required: true }
})

module.exports = {
    sliderModel: mongoose.model('slider', Schema)
}