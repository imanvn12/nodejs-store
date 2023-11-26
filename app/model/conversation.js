const { default: mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Types.ObjectId, ref: "user" },
    message: { type: String },
    datetime: { type: String },

}, { timestamps: true })

const locationSchema = new mongoose.Schema({
    sender: { type: mongoose.Types.ObjectId, ref: "user" },
    location: { type: Object, default: {} },
    datetime: { type: String },

}, { timestamps: true })

const roomSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    messages: { type: [messageSchema], default: [] },
    locations: { type: [locationSchema], default: [] },
})

const conversationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    endpoint: { type: String, required: true },
    rooms: { type: [roomSchema], default: [] },
})

const conversationModel = mongoose.model("Conversation", conversationSchema);

module.exports = {
    conversationModel
}