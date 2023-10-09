const Joi = require('@hapi/joi');
const createHttpError = require('http-errors');



const productValidator = Joi.object({
    title: Joi.string().min(3).max(15).error( createHttpError.BadRequest('invalid title')),
    shortdescription: Joi.string().min(3).max(15).error(createHttpError.BadRequest('invalid shortdescription')),
    description: Joi.string().min(10).max(50).error(createHttpError.BadRequest('invalid description')),
    tags: Joi.array(),
    imagepath: Joi.allow(),
    filename: Joi.allow(),
})

module.exports = {
    productValidator
}