const Joi = require("@hapi/joi")
const createHttpError = require("http-errors")

const blogValidation = Joi.object({
    author: Joi.string().error(createHttpError.BadRequest('author is not valid')),
    title: Joi.string().min(2).max(20).error(createHttpError.BadRequest('title is not valid')),
    shorttext: Joi.string().min(2).max(30).error(createHttpError.BadRequest('short text is not valid')),
    text: Joi.string().min(2).max(100).error(createHttpError.BadRequest('text is not valid')),
    filename: Joi.string().error(createHttpError.BadRequest('image path is not valid')),
    tags: Joi.array().min(0).max(3).error(createHttpError.BadRequest('tag is not valid')),
    category: Joi.string().error(createHttpError.BadRequest('category is not valid')),
    imagepath: Joi.allow('')
})

module.exports = {
    blogValidation
}