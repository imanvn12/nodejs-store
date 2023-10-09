const joi = require('@hapi/joi')

const categoryValidationSchema = joi.object({
    title: joi.string().min(1).max(20),
    parents: joi.string().allow('')
})

module.exports = { categoryValidationSchema }