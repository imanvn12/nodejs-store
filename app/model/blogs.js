const { default: mongoose } = require("mongoose");
const { comment } = require("./products");

const commentsSchema = new mongoose.Schema({
    writer: { type: mongoose.Types.ObjectId, ref: 'users' },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: new Date().getTime() },
    parents: { type: [mongoose.Types.ObjectId] }
});


const Schema = new mongoose.Schema({
    author: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    shorttext: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    price: { type: Number, default: 0 },
    category: { type: [mongoose.Types.ObjectId], required: true },
    comments: { type: [comment], default: [] },
    like: { type: [mongoose.Types.ObjectId], ref: 'user', default: [] },
    dislike: { type: [mongoose.Types.ObjectId], ref: 'user', default: [] },
    bookmark: { type: [mongoose.Types.ObjectId], ref: 'user', default: [] }
}, {
    toJSON: {
        virtuals: true
    }
})

module.exports = {
    BlogModel: mongoose.model('blog', Schema)
}