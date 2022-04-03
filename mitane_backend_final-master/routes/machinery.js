var router = require("express-promise-router")();
const machineryController = require('../controllers/machinery-controller');
const  {itemsRequest} = require('../middlewares/user-request/items');

/**
 * @typedef Machinery
 * @property {string} name.required - Machinery name
 */

/**
 * fetch all machinery
 * 
 * @route GET machinery/
 * @group Machinery
 * @security JWT
 * @param {name} - name of a machinery
 * @returns {object} 200 - Machinery object
 * @returns {Error}  default - Unexpected error
 */
router.get('/', machineryController.getAll);

/**
 * fetch machinery by id
 * 
 * @route GET /machinery/{id}
 * @group Machinery 
 * @security JWT
 * @param {id} - ID of a machinery
 * @returns {object} 200 - Machinery object
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', machineryController.getByID);

/**
 * create machinery
 * 
 * @route POST /machinery/
 * @group Machinery 
 * @security JWT
 * @param {name} - name of machinery 
 * @returns {object} 200 - new Machinery object created
 * @returns {Error}  default - Unexpected error
 */
router.post('/', itemsRequest('addMachinery'), machineryController.createMachinery);

/**
 * Update Machinery
 * 
 * @route Put /machinery/{id}
 * @group Machinery 
 * @security JWT
 * @param {id} - id of machinery 
 * @returns {object} 200 - new Machinery object created
 * @returns {Error}  default - Unexpected error
 */
router.put('/:id', itemsRequest('updateMachinery'), machineryController.updateMachinery);

/**
 * DELETE Machinery
 * 
 * @route DELETE machinery/{id}
 * @group Machinery 
 * @security JWT
 * @param {id} - id of machinery to be deleted
 * @returns {object} 200 - Machinery object deleted
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id',machineryController.deleteMachinery)




module.exports = router;