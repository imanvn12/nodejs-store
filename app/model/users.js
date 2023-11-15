const { default: mongoose } = require("mongoose");

const BlogBasket = new mongoose.Schema({
    BlogID: { type: mongoose.Types.ObjectId, ref: "blog" },
    count: { type: Number, default: 1 }
}, {toJSON: {
    virtuals: true
}})

const CourseBasket = new mongoose.Schema({
    CourseID: { type: mongoose.Types.ObjectId, ref: "course" },
    count: { type: Number, default: 1 }
})

const ProductBasket = new mongoose.Schema({
    ProductID: { type: mongoose.Types.ObjectId, ref: "product" },
    count: { type: Number, default: 1 }
})

const basketSchema = new mongoose.Schema({
    blog: { type: [BlogBasket], default: [] },
    course: { type: [CourseBasket], default: [] },
    product: { type: [ProductBasket], default: [] },
}, {toJSON: {
    virtuals: true
}})

const userSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String },
    phone: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    otp: { type: Object, default: { code: 0, expiresIn: 0 } },
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    courses: { type: [mongoose.Types.ObjectId], ref: "course", default: []},
    role: { type: String, default: 'user' },
    basket: { type: basketSchema }
}, {
    toJSON: {
        virtuals: true
    }
})

userSchema.index({ first_name: 'text', last_name: 'text', username: 'text', phone: 'text', email: 'text' })

module.exports = {
    userModel: mongoose.model('user', userSchema)
}