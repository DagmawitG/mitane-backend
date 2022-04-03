const Joi = require('joi');

exports.createCategoryRequest = Joi.object({
    name: Joi.string().required(),
});