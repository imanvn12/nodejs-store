const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");

const RBACvalidator = Joi.object({
    title: Joi.string().min(3).max(20).error(createHttpError.BadRequest('title is invalid')),
    permissions: Joi.array()
})

const RBACperValidator = Joi.object({
    title: Joi.string().min(3).max(20).error(createHttpError.BadRequest('title is invalid')),
    description: Joi.string().min(5).max(100).error(createHttpError.BadRequest('description is invalid'))
})


module.exports = {
    RBACvalidator,
    RBACperValidator
}