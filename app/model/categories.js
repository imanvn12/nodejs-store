const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
        title: {type: String, required: true},
        parents: {type: mongoose.Types.ObjectId, default: undefined}
},{
    toJSON: {
        virtuals: true
    }
})

Schema.virtual('children', {
    ref: 'category',
    localField: '_id',
    foreignField: 'parents'
})
Schema.pre('findOne', function(next) {
    this.populate('children');
    next()
})
.pre('find', function(next) {
    this.populate('children');
    next()
})



module.exports = {
    categoriesModel: mongoose.model('category', Schema)
}