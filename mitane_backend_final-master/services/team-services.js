const teamModel = require('../models/team-model');

exports.createTeam = async (user_id, name, roles, coordinates, profile_image) => {
    try {
        if (
            (roles).includes('farmer') ||
            (roles).includes('admin')
        ) {
            const team = await teamModel.create({
                name: name,
                admin: user_id,
                profile_image: profile_image,
                users: [user_id],
                location: {
                    coordinates: coordinates
                }
            });
            console.log('create team called');
            team.populate([{
                    path: 'users'
                },
                {
                    path: 'admin'
                },
            ]);

            
            return team
        } else {
            throw new Error("Can't create store")
        }

    } catch (error) {
        throw error
    }
}

exports.addMember = async (team, new_users_id) => {
    try {
        const updateteam = await teamModel.findOneAndUpdate({
            _id: team._id
        }, {
            $push: {
                users: {
                    $each: new_users_id
                }
            }
        })
        return updateteam
    } catch (error) {
        throw error
    }

}
exports.leaveTeam = async (team, user_id) => {
    try {
        const updateteam = await teamModel.findOneAndUpdate({
            _id: team._id
        }, {
            $pull: {
                users: user_id
            }
        })
        return updateteam
    } catch (error) {
        throw error
    }

}

exports.updateProfile = async (team_id, profile_image) => {
    try {
        let updatedTeam = await teamModel.findByIdAndUpdate(team_id, {
            '$set': {
                profile_image: profile_image,
            }
        }, {
            new: true
        })

        return updatedTeam
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }

}
exports.updateName = async (team_id, name) => {
    try {
        let updatedTeam = await teamModel.findByIdAndUpdate(team_id, {
            '$set': {
                name: name,
            }
        }, {
            new: true
        })

        return updatedTeam
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }

}

exports.delete = async (team) => {
    try {
        const deleted = await teamModel.findOneAndDelete({
            _id: team._id
        });
        return deleted
    } catch (error) {
        throw error
    }

}

exports.searchItem = async (item_type, item) => {

}

exports.getTeamsNearby = async function (param) {
    const {
        latitude,
        longitude
    } = param

    let theNearest = await teamModel.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                },
            }
        }
    }).populate([{
            path: 'users'
        },
        {
            path: 'admin'
        },
    ])
    return theNearest

}