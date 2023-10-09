const date = require("@hapi/joi/lib/types/date");
const { default: mongoose } = require("mongoose");

const comment = mongoose.Schema({
    writer: {type: mongoose.Types.ObjectId, required: true},
    createdAt: {type: Date, default: new Date().getTime()},
    text: {type: String, default: ''},
})

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
})

productSchema.index({title: 'text', shortdescription: 'text', description: 'text'})

module.exports = {
    productModel: mongoose.model('product', productSchema)
}