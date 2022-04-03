// var express = require('express'); 
// var router = express.Router();  
// /* GET users listing. */ 
// router.get('/', function(req, res, next) { 
//   res.send('respond with a resource'); 
// }); 
 
/** 
 * @typedef User 
 * @property {string} name.required - User's full name 
 * @property {string} password.required - A strong password length of 3-30 consisting lowercase, uppercase, and numbers 
 * @property {number} phone_no.required - User's phone number 
 */   
var router = require("express-promise-router")();  
const userController = require('../controllers/user-controller'); 

  
/** 
 * Returns ALL Users 
 *   
 * @route GET /users 
 * @group User - Deals with all CRUD operations with user model 
 * @param {string} sort.query - sort parament 
 * @param {string} page.query - set the page number 
 * @param {string} filter.query - set filter query  
 * @security JWT 
 * @returns {object} 200 - Array of users 
 * @returns {Error}  default - Unexpected error 
 */ 
router.get('/', userController.getUsers); 

/** 
 * Get roles
 *   
 * @route GET /users/roles/
 * @security JWT 
 * @returns {object} 200 - Array of Role objects 
 * @returns {Error}  default - Unexpected error 
 */ 
 router.get('/roles/', userController.getRoles); 
 
/** 
 * Get a user by id  
 *   
 * @route GET /users/{id} 
 * @group User  
 * @param {string} id.path.required - user id 
 * @security JWT 
 * @returns {object} 200 - User object 
 * @returns {Error}  default - Unexpected error 
 */ 
router.get('/:id', userController.getUserById); 

 
/** 
 * Returns filetered Users by name 
 *  
 * @route GET /users/filter/:name 
 * @group User 
 * @param {string} name.query - name as a filter query  
 * @security JWT 
 * @returns {object} 200 - Array of users 
 * @returns {Error}  default - Unexpected error 
 */ 
router.get('/filter/:name', userController.filterUsers); 

 
/** 
 * Returns filetered Users by phone no 
 *  
 * @route GET /users/filter/:phone_no 
 * @group User 
 * @param {number} phone_no.query - phone no as a filter query  
 * @security JWT 
 * @returns {object} 200 - Array of users 
 * @returns {Error}  default - Unexpected error 
 */ 
router.get('/filter/:phone_no', userController.filterUsers); 

 
/** 
 * Create a new user  
 *  
 * @route Post /users 
 * @group User 
 * @param {string} id.path.required - user id 
 * @param {USER.model} user.body - the new user object 
 * @security JWT  
 * @returns {USER.model} 200 - User object 
 * @returns {Error}  default - Unexpected error 
 */ 
router.post('/', userController.createUser); 

  
/** 
 * Update an existing user by id  
 *  
 * @route Put /users/:id 
 * @group User 
 * @param {string} id.path.required - user id 
 * @param {USER.model} user.body - the new user object 
 * @security JWT 
 * @returns {USER.model} 200 - User object 
 * @returns {Error}  default - Unexpected error 
 */ 
router.put('/update/:id', userController.updateUser); 

 
/** 
 * Remove a user  with id 
 *  
 * @route DELETE /users/{id} 
 * @group User  
 * @param {string} id.path.required - user id 
 * @security JWT 
 * @returns {object} 200 - User object 
 * @returns {Error}  default - Unexpected error 
 */ 
router.delete('/delete/:id', userController.deleteUser); 
 
 
// to be worked on; returns with empty roles 
router.get('/role/:role', userController.getUserByRole); 

 
module.exports = router;  
 