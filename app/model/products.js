
const { default: mongoose } = require("mongoose");


const answerComments = new mongoose.Schema({
    writer: { type: mongoose.Types.ObjectId, required: true },
    text: { type: String, default: '' },
    parents: {type: mongoose.Types.ObjectId, required: true},
    show: { type: Boolean, required: true, default: false },
    openToReplay: { type: Boolean, default: false }
}, { timestamps: { createdAt: true } })

const comment = new mongoose.Schema({
    writer: { type: mongoose.Types.ObjectId, required: true },
    text: { type: String, default: '' },
    answers: { type: [answerComments], default: [] },
    show: { type: Boolean, required: true, default: false },
    openToReplay: { type: Boolean, default: true }
}, { timestamps: { createdAt: true } })

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    shortdescription: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId },
    comments: { type: [comment], default: [] },
    like: { type: [mongoose.Types.ObjectId], default: [] },
    dislike: { type: [mongoose.Types.ObjectId], default: [] },
    bookmark: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number },
    type: { type: String },
    format: { type: String },
    owner: { type: mongoose.Types.ObjectId },
    feture: { type: Object, default: { length: '', width: '', height: '', colors: [], model: [], madein: '' } },
}, {
    toJSON: {
        virtuals: true
    }
})

productSchema.index({ title: 'text', shortdescription: 'text', description: 'text' });

productSchema.virtual("imagesurl").get(function () {
    return this.images.map(image => `http://localhost:4000/${image}`)
})

module.exports = {
    productModel: mongoose.model('product', productSchema),
    comment
}