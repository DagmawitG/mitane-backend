const Joi = require('joi');
const Joi_Num = Joi.extend(require('joi-phone-number'));

exports.storeRequest = schemaName => async (req, res, next) => {
    let validationObjects = {
        getProduct: () =>
            Joi.object({
                product: Joi.string().required(),
                latitude: Joi.number().min(-90).max(90).required(),
                longitude: Joi.number().min(-180).max(180).required()
            }),
        getOrderedProducts: () =>
            Joi.object({
                keyword: Joi.string(),
                categoryName: Joi.string(),
                latitude: Joi.number().min(-90).max(90).required(),
                longitude: Joi.number().min(-180).max(180).required()
            }),
        getMachinery: () =>
            Joi.object({
                machinery: Joi.string().required(),
                latitude: Joi.number().min(-90).max(90).required(),
                longitude: Joi.number().min(-180).max(180).required()
            }),
        getIngredient: () =>
            Joi.object({
                ingredient: Joi.string().required(),
                latitude: Joi.number().min(-90).max(90).required(),
                longitude: Joi.number().min(-180).max(180).required()
            }),
        addProduct: () =>
            Joi.object({
                product: Joi.string().required(),
                quantity: Joi.number().required(),
                image: Joi.any()
                    .meta({
                        swaggerType: 'file'
                    })
                    .description('image file'),
                price: Joi.number().required(),
            }),
        addMachinery: () =>
            Joi.object({
                machinery: Joi.string().required(),
                quantity: Joi.number().required(),
                image: Joi.any()
                    .meta({
                        swaggerType: 'file'
                    })
                    .description('image file'),
                price: Joi.number().required(),
            }),
        addIngredient: () =>
            Joi.object({
                ingredient: Joi.string().required(),
                quantity: Joi.number().required(),
                image: Joi.any()
                    .meta({
                        swaggerType: 'file'
                    })
                    .description('image file'),
                price: Joi.number().required(),
            }),
        adjustProduct: () =>
            Joi.object({
                product: Joi.string().required(),
                quantity: Joi.number().required(),
                price: Joi.number().required(),
                image: Joi.string(),
                storeitem: Joi.string().required(),
            }),
        adjustMachinery: () =>
            Joi.object({
                machinery: Joi.string().required(),
                quantity: Joi.number().required(),
                price: Joi.number().required(),
                image: Joi.string(),
                storeitem: Joi.string().required()
            }),
        adjustIngredient: () =>
            Joi.object({
                ingredient: Joi.string().required(),
                quantity: Joi.number().required(),
                price: Joi.number().required(),
                image: Joi.string(),
                storeitem: Joi.string().required()
            }),
        removeProduct: () =>
            Joi.object({
                product: Joi.string().required(),
            }),
        removeMachinery: () =>
            Joi.object({
                machinery: Joi.string().required(),
            }),
        removeIngredient: () =>
            Joi.object({
                ingredient: Joi.string().required(),
            }),
        createStore: () =>
            Joi.object({
                latitude: Joi.number().min(-90).max(90).required(),
                longitude: Joi.number().min(-180).max(180).required()
            })
    }
    try {
        const {
            error
        } = validationObjects[schemaName]().validate(req.body)
        if (!error) {
            return next();
        }
        throw new Error(error)
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}