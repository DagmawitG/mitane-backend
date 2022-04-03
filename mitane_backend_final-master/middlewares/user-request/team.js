const Joi = require('joi');
const Joi_Num = Joi.extend(require('joi-phone-number'));

exports.teamRequest = schemaName => async (req, res, next) => {
    let validationObjects = {

        create: () =>
            Joi.object({
                name: Joi.string().required(),
                image: Joi.any()
                    .meta({
                        swaggerType: 'file'
                    })
                    .description('image file'),
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),

            }),
        addMemeberToTeam: () =>
            Joi.object({
                team_id: Joi.string().required(),
                new_users_id: Joi.array().items(Joi.string()).required(),
            }),
        leaveTeam: () =>
            Joi.object({
                team_id: Joi.string().required(),
            }),

        updateProfileImage: () =>
            Joi.object({
                team_id: Joi.string().required(),
                image: Joi.any()
                    .meta({
                        swaggerType: 'file'
                    })
                    .description('image file'),
            }),
        updateName: () =>
            Joi.object({
                team_id: Joi.string().required(),
                name: Joi.string().required(),
            }),
        nearByTeam: () =>
            Joi.object({
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
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
        res.status(200).json({
            error: true,
            message: error.message
        })
    }

}