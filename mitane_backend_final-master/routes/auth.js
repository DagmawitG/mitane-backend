var router = require("express-promise-router")(); 
 
const  {authFormRequest} = require('../middlewares/form-request/auth'); 
const authController = require('../controllers/auth-controller'); 
 
/** 
 * Login user  
 *  
 * @route POST /auth/login/ 
 * @group Auth   
 * @param {number} phone_no.body.required - phone number of the user 
 * @param {string} password.body.required - password of the user 
 * @returns {object} 200 - User object 
 * @returns {Error}  default - Unexpected error 
 */ 
router.post('/login', authFormRequest('loginUser'), authController.login); 
 
/** 
 * Create a new user  
 *  
 * @route POST /auth/u/signup/ 
 * @group Auth  
 * @param {string} phone_no.body.required - phone number of the user 
 * @param {string} password.body.required - password of the user 
 * @returns {object} 200 - User object 
 * @returns {Error}  default - Unexpected error  
 */ 
router.post('/u/signup', authFormRequest('createUser'), authController.signupUser); 
 
/** 
 * Create a new farmer  
 *  
 * @route POST /auth/f/signup/ 
 * @group Auth   
 * @param {number} phone_no.body.required - phone number of the farmer 
 * @param {string} password.body.required - password of the farmer 
 * @returns {object} 200 - User object 
 * @returns {Error}  default - Unexpected error 
 */ 
 router.post('/f/signup', authFormRequest('createUser'), authController.signupFarmer); 
 
/** 
 * Create a new accessory trader  
 *  
 * @route POST /auth/at/signup/ 
 * @group Auth  
 * @param {number} phone_no.body.required - phone number of the accessory trader 
 * @param {string} password.body.required - password of the accessory trader 
 * @returns {object} 200 - User object 
 * @returns {Error}  default - Unexpected error 
 */ 
 router.post('/at/signup', authFormRequest('createUser'), authController.signupAccessoryTrader); 
 
/** 
 * Create a new product trader  
 *  
 * @route POST /auth/pt/signup/ 
 * @group Auth  
 * @param {number} phone_no.body.required - phone number of the product trader 
 * @param {string} password.body.required - password of the product trader 
 * @returns {object} 200 - User object 
 * @returns {Error}  default - Unexpected error 
 */ 
 router.post('/pt/signup', authFormRequest('createUser'), authController.signupProductTrader); 
 
/** 
 * Create a new tool trader  
 *  
 * @route POST /auth/tt/signup/ 
 * @group Auth  
 * @param {number} phone_no.body.required - phone number of the tool trader 
 * @param {string} password.body.required - password of the tool trader 
 * @returns {object} 200 - User object 
 * @returns {Error}  default - Unexpected error 
 */ 
 router.post('/tt/signup', authFormRequest('createUser'), authController.signupToolTrader); 
 
module.exports = router; 
 