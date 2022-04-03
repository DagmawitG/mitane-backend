const teamModel = require('../models/team-model');
const teamService = require('../services/team-services');
const uuid = require("uuid-v4");
var path = require('path');

const {
    admin
} = require("../firebase-service");
const bucket = admin.storage().bucket();

var fs = require('fs');


exports.getAll = async (req, res, next) => {

    try {

        let sort = {}
        if (req.query.sort) {
            sort[req.query.sort] = req.query.asc ? 1 : -1
        }

        let query = {}

        if (req.query.filter) {
            let filter = JSON.parse(req.query.filter);
            query = pick(filter, ['name', 'active'])

        }

        const options = {
            sort: Object.values(sort).length > 0 ? sort : {
                'created_at': -1
            },
            page: req.query.page || 1,
            limit: req.query.limit || 10,
            populate: [{
                path: 'users'
            }, {
                path: 'admin'
            }]
        }
        // TODO
        const teams = await teamModel.paginate(query, options)

        res.json(teams)

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}

exports.stat = async (req, res, next) => {

    try {
        const {
            user
        } = req
        const user_id = user.data._id

        // TODO
        const created = await teamModel.countDocuments({
            admin: user_id
        })
        const joined = await teamModel.countDocuments({
            users: user_id
        })
        res.json({
            success: true,
            joined: joined,
            created: created
        })

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}

exports.getByID = async (req, res) => {

    try {
        const team = await teamModel.findById(req.params.id).populate([{
            path: 'users'
        }, {
            path: 'admin'
        }])
        res.json(team)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }
}


exports.getSelfTeam = async (req, res) => {
    const {
        user
    } = req
    const user_id = user.data._id
    try {
        const team = await teamModel.find({
            admin: user_id
        }).populate([{
                path: 'users'
            },
            {
                path: 'admin'
            },
        ])

        res.json(team)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }

}

exports.getJoinedTeam = async (req, res) => {
    const {
        user
    } = req
    const user_id = user.data._id
    try {
        const team = await teamModel.find({
            users: user_id
        }).populate([{
                path: 'users'
            },
            {
                path: 'admin'
            },
        ])

        res.json(team)
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }

}

exports.createTeam = async (req, res) => {
    const {
        user
    } = req
    const roles = user.data.roles
    const user_id = user.data._id
    const name = req.body.name
    const imageFile = req.files.image;

    const coordinates = [req.body.longitude, req.body.latitude]

    try {
        if (user) {
            //Upload profile image
            const uuid4 = uuid();
            const filename = path.join(process.cwd(), 'uploads', 'teams', uuid4+ '.png');
            fs.writeFileSync(filename, 'create file!');

            imageFile.mv(filename)
            var uploaded = await uploadFile(filename)
            console.log("uploaded", uploaded);
            const team = await teamService.createTeam(user_id, name, roles, coordinates, uploaded);
            res.json({
                success: true,
                data: team
            })
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

exports.addMemeberToTeam = async (req, res) => {
    const {
        user
    } = req
    let user_id = user.data._id;
    let team_id = req.body.team_id;
    let new_users_id = req.body.new_users_id;
    try {
        if (user) {
            const team = await teamModel.findById(team_id)
            if (team) {
                // if (user_id != team.admin) throw new Error("Only admin can add new member");

                var newteam = await teamService.addMember(team, new_users_id);
                newteam = await teamModel.findOne({
                    _id: newteam._id
                }).populate([{
                        path: 'users'
                    },
                    {
                        path: 'admin'
                    },
                ])

                res.json(newteam);
            } else {
                throw new Error("team not found")
            }
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}
exports.leaveTeam = async (req, res) => {
    const {
        user
    } = req
    let user_id = user.data._id;
    let team_id = req.body.team_id;
    try {
        if (user) {
            const team = await teamModel.findById(team_id)
            if (team) {
                newteam = await teamService.leaveTeam(team, user_id);
                res.json(newteam);
            } else {
                throw new Error("team not found")
            }
        } else {
            throw new Error('You have to login first')
        }

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}

exports.updateProfileImage = async (req, res) => {
    const {
        user
    } = req
    let team_id = req.body.team_id;
    const imageFile = req.files.image;
    try {
        if (user) {
            team = await teamModel.findById(team_id)
            if (team) {
                if (user_id != team.admin) throw new Error("Only admin can change profile image");
                const uuid4 = uuid();
                const filename = path.join(process.cwd(), 'uploads', 'teams', uuid4+'.png');
                fs.writeFileSync(filename, 'create file!');

                imageFile.mv(filename)
                var uploaded = await uploadFile(filename)
                team = await teamService.updateProfile(team_id, uploaded);
                res.json(team);
            } else {
                throw new Error("team not found")
            }
        } else {
            throw new Error('You have to login first')
        }
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}
exports.updateName = async (req, res) => {
    const {
        user
    } = req
    const team_id = req.body.team_id;
    const name = req.body.name;
    try {
        if (user) {
            team = await teamModel.findById(team_id)
            if (team) {
                if (user_id != team.admin) throw new Error("Only admin can change team name");
                team = await teamService.updateName(team_id, name);
                res.json(team);
            } else {
                throw new Error("team not found")
            }
        } else {
            throw new Error('You have to login first')
        }
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}
exports.nearByTeam = async (req, res) => {

    const latitude = req.params.latitude || 50;
    const longitude = req.params.longitude || 60;
    try {
        team = await teamService.getTeamsNearby({
            latitude,
            longitude
        });
        res.json(team);
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}

exports.delete = async (req, res) => {
    const {
        user
    } = req
    const user_id = user.data._id
    const team_id = req.params.id;
    try {
        if (user) {
            team = await teamModel.findById(team_id)
            if (team) {
                if (user_id != team.admin && user.data.roles != "admin") throw new Error("Only admin can delete team");
                await teamModel.findOneAndDelete({
                    _id: team_id
                })
                res.json({
                    "error": false,
                    msg: "Team deleted!"
                });
            } else {
                throw new Error("team not found")
            }
        } else {
            throw new Error('You have to login first')
        }
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}

async function uploadFile(filename, dest, type, uuid4 = uuid()) {
    const metadata = {
        metadata: {
            firebaseStorageDownloadTokens: uuid4,
        },
        contentType: type == null ? "image/jpg" : type,
        cacheControl: "public, max-age=31536000",
    };
    // Uploads a local file to the bucket
    let file = (await bucket.upload(filename, {
        gzip: true,
        destination: (dest != undefined && dest) ?
            dest : "uploads/team/" + uuid4 + ".jpg",
        metadata: metadata,
    }))[0];

    console.log(`${filename} uploaded.`);
    return "https://storage.googleapis.com/" + bucket.name + "/" + (file.name);
}