var router = require("express-promise-router")();
const teamController = require('../controllers/team-controller');
const {
  teamRequest
} = require('../middlewares/user-request/team');

/**
 * @typedef Team
 * @property {string} name.required - Team name
 * @property {number} admin.required - Admin's user id
 * @property {string} profile_image.required - profile picture for the team
 * @property {array} users.required - List of members of the team
 * @property {array} location.required - latitude, longitude
 */

/**
 * Get all teams
 * 
 * @route Get /team
 * @group Team 
 * @security JWT
 * @returns {object} 200 - Team objects nearby
 * @returns {Error}  default - Unexpected error
 */
router.get('/', teamController.getAll);

/**
 * Get logged in user's team
 * 
 * @route Get /team/self
 * @group Team 
 * @security JWT
 * @returns {object} 200 - Team objects nearby
 * @returns {Error}  default - Unexpected error
 */
router.get('/self', teamController.getSelfTeam);

/**
 * Get Joined teams
 * 
 * @route Get /team/joined
 * @group Team 
 * @security JWT
 * @returns {object} 200 - Team objects nearby
 * @returns {Error}  default - Unexpected error
 */
router.get('/joined', teamController.getJoinedTeam);



/**
 * Post create team
 * 
 * @route Post /team/new
 * @group Team 
 * @security JWT
 * @param {string} name.body.required - name of the team
 * @param {file} image.body.required - profile image of team
 * @returns {object} 200 - Team objects nearby
 * @returns {Error}  default - Unexpected error
 */
router.post('/new', teamRequest("create"), teamController.createTeam);


/**
 * Post add member to team
 * 
 * @route Post /team/add
 * @group Team 
 * @security JWT
 * @param {number} team_id.body.required - the team id
 * @param {array} new_users_id.body.required - list of new team ids
 * @returns {object} 200 - Team objects nearby
 * @returns {Error}  default - Unexpected error
 */

router.post('/add', teamRequest("addMemeberToTeam"), teamController.addMemeberToTeam);

/**
 * Patch Leave Team
 * 
 * @route Patch /team/leave
 * @group Team 
 * @security JWT
 * @param {number} team_id.body.required - the team id
 * @returns {object} 200 - Team objects nearby
 * @returns {Error}  default - Unexpected error
 */

router.patch('/leave', teamRequest("leaveTeam"), teamController.leaveTeam);

/**
 * Patch update profile image
 * 
 * @route Patch /team/image
 * @group Team 
 * @security JWT
 * @param {file} image.body.required - the new image
 * @param {number} team_id.body.required - the team id
 * @returns {object} 200 - Team objects nearby
 * @returns {Error}  default - Unexpected error
 */
router.patch('/image', teamRequest('updateProfileImage'), teamController.updateProfileImage);

/**
 * Patch update team name
 * 
 * @route Patch /team/name
 * @group Team 
 * @security JWT
 * @param {string} name.body.required - the new name
 * @param {number} team_id.body.required - the team id
 * @returns {object} 200 - Team objects nearby
 * @returns {Error}  default - Unexpected error
 */
router.patch('/name', teamRequest('updateName'), teamController.updateName);

/**
 * Get a near by teams 
 * 
 * @route GET /team/nearby
 * @group Team 
 * @security JWT
 * @returns {object} 200 - Team object of that user
 * @returns {Error}  default - Unexpected error
 */
router.get('/near', teamController.nearByTeam);



/**
 * Get team stat of authenticated user
 * 
 * @route Get /team/stat
 * @group Team 
 * @security JWT
 * @returns {object} 200 - Team objects nearby
 * @returns {Error}  default - Unexpected error
 */
router.get('/stat', teamController.stat);


/**
 * Get team by  team id
 * 
 * @route Get /team/:team_id
 * @group Team 
 * @security JWT
 * @returns {object} 200 - Team objects nearby
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', teamController.getByID);


/**
 * Delete Team  
 * @route Delete /:id
 * @group Team 
 * @security JWT
 * @returns {object} 200 - Team object
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', teamController.delete);


module.exports = router;