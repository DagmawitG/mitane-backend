const Joi = require('joi');

exports.priceByCategoryRequest = Joi.object({
    category: Joi.string().required(),
    date: Joi.string().required()
});

exports.createDailyPriceRequest = Joi.object({
    product: Joi.string().required(),
    category: Joi.string().required()
});

exports.addDailyPriceRequest = Joi.object({
    price: Joi.number().required()
});


exports.deleteDailyPriceRequest = Joi.object({
    product: Joi.string().required(),
    date: Joi.string().required()
});

