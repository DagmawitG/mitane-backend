const Joi = require('joi');
const Joi_Num = Joi.extend(require('joi-phone-number'));

exports.authFormRequest = schemaName => async (req, res, next) => {
    let validationObjects = {
        loginUser: () =>
            Joi.object({
                phone_no: Joi_Num.string().phoneNumber().required(),

                password: Joi.string().min(4).required()

            }),
        createUser: () =>
            Joi.object({
                name: Joi.string().required(),

                password: Joi.string().min(4).required(),

                repeat_password: Joi.ref('password'),

                phone_no: Joi_Num.string().phoneNumber().required(),
            }),
        forgetPassword: () =>
            Joi.object({
                phone_no: Joi_Num.string().phoneNumber().required(),
            }),
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