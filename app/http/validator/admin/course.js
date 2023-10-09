const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");

const courseValidator = Joi.object({
    title: Joi.string().min(2).max(17).error(createHttpError.BadRequest('title is invalid')),
    shortdescription: Joi.string().min(3).max(15).error(createHttpError.BadRequest('invalid shortdescription')),
    description: Joi.string().min(10).max(50).error(createHttpError.BadRequest('invalid description')),
    tags: Joi.array().allow(null, '', 'string'),
    imagepath: Joi.allow(),
    filename: Joi.allow(),
    type: Joi.allow(''),
})

module.exports = {
    courseValidator
}