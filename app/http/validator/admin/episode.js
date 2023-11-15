const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");

const episodeValidator = Joi.object({
    title: Joi.string().min(2).max(15).error(createHttpError.BadRequest('invalid title')),
    text: Joi.string().min(5).max(20).error(createHttpError.BadRequest('invalid text')),
    type: Joi.string().regex(/(lock|unock)/i).error(createHttpError.BadRequest('invalid type')),
    time: Joi.string().regex(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/i).error(createHttpError.BadRequest('invalid time')),
    chapterID: Joi.string().error(createHttpError.BadRequest('invalid chapter ID')),
    courseID: Joi.string().error(createHttpError.BadRequest('invalid course ID')),
    filename: Joi.string().regex(/(.mp4|.mov|.mkv|.mpg)$/).error(createHttpError.BadRequest('invalid file name')),
    videopath: Joi.allow('') 
})

module.exports = {
    episodeValidator
}