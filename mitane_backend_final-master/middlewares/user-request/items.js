const Joi = require('joi');

exports.itemsRequest = schemaName => async (req,res,next) => {
    let validationObjects = {
        addProduct: () => 
            Joi.object({
                name: Joi.string().required(),
                category: Joi.string().required(),
            }),
        updateProduct: () => 
            Joi.object({
                name: Joi.string().required(),
            }),
        addMachinery: () => 
            Joi.object({
                name: Joi.string().required(),
                category: Joi.string().required(),
            }),
        updateMachinery: () => 
            Joi.object({
                name: Joi.string().required(),
            }),
        addIngredient: () => 
            Joi.object({
                name: Joi.string().required(),
                category: Joi.string().required(),
            }),
        updateIngredient: () => 
            Joi.object({
                name: Joi.string().required(),
            }),
        addCategory: () => 
            Joi.object({
                name: Joi.string().required(),
            }),
        updateCategory: () => 
            Joi.object({
                name: Joi.string().required(),
            }),
        }
    try {
       const {error } =  validationObjects[schemaName]().validate(req.body)
       if(!error) {
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
