const { default: mongoose } = require("mongoose");
const { getTotalTimeOfChapters } = require("../http/middlewares/functions");

const episode = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    video: { type: String, required: true },
    type: { type: String, default: 'unlock' },
    videoaddress: { type: String, required: true }
}, {toJSON: {
    virtuals: true
}})

episode.virtual("videourl").get(function() {
    return `http://localhost:4000/${this.video}`
})


const chapter = new mongoose.Schema({
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
    category: { type: mongoose.Types.ObjectId, ref: 'category' },
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
    teacher: { type: mongoose.Types.ObjectId, ref: "user" },
    students: { type: [mongoose.Types.ObjectId], ref: "user" , default: [] },
    chapters: { type: [chapter] }
}, {toJSON: {
    virtuals: true
}})

coureSchema.index({title: "text", shortdescription: "text", description: "text"});

coureSchema.virtual("imageurl").get(function() {
    return `http://localhost:4000/${this.image}`
});

coureSchema.virtual("totaltime").get(function() {
    return getTotalTimeOfChapters(this.chapters)
})

module.exports = {
    courseModel: mongoose.model('course', coureSchema)
}