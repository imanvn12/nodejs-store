const { default: mongoose } = require("mongoose");

const episode = mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, default: 'free' }
})

const chapter = mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String },
    episodes: { type: [episode], default: []}
})


const coureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    shortdescription: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId },
    comments: { type: [], default: [] },
    like: { type: [mongoose.Types.ObjectId], default: [] },
    dislike: { type: [mongoose.Types.ObjectId], default: [] },
    bookmark: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number },
    type: { type: String, required: true },
    time: { type: String },
    status: {type: String},
    format: { type: String, default: 'not started' },
    teacher: { type: mongoose.Types.ObjectId },
    students: { type: [mongoose.Types.ObjectId], default: [] },
    chapters: { type: [chapter] }
})

coureSchema.index({title: "text", shortdescription: "text", description: "text"})

module.exports = {
    courseModel: mongoose.model('course', coureSchema)
}