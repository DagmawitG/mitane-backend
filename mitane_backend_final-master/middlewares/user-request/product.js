const Joi = require('joi');

exports.createProductRequest = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required()
});