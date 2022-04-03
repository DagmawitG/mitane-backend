const userModel = require('../models/user-model')

exports.signupUser = async (req, role) => {

    try {
        const user = await userModel.create({
            ...req.body, 
            roles: role,
            })

        return user

    } catch (error) {
        throw error;
    }

}