const router = require("express-promise-router")();
const storeController = require('../controllers/store-controller');
const  {storeRequest} = require('../middlewares/user-request/store');

/**
 * @typedef Store
 * @property {string} user.required - A trader or a farmer's id
 * @property {array} product_items.required - {product_id, price, quatity}
 * @property {array} machinery_items.required - {machinery_id, price, quatity}
 * @property {array} ingredient_items.required - {ingredient_id, price, quatity}
 * @property {array} location.required - latitude, longitude
 */

/**
 * Get stores with the machinery
 * 
 * @route Post /store/machinery_id
 * @group Store 
 * @security JWT
 * @param {number} latitude.body.required - latitude of the user
 * @param {number} longitude.body.required - longitude of the user
 * @returns {object} 200 - Store objects nearby
 * @returns {Error}  default - Unexpected error
 */
 router.post('/machinery_id', storeRequest('getMachinery'), storeController.getByMachineryId);

 /**
 * Get stores with  machineries
 * 
 * @route Post /store/machinery
 * @group Store 
 * @security JWT
 * @param {number} latitude.body.required - latitude of the user
 * @param {number} longitude.body.required - longitude of the user
 * @returns {object} 200 - Store objects nearby
 * @returns {Error}  default - Unexpected error
 */
  router.post('/machinery',  storeController.getMachineries);

 /**
 * Get stores with the product
 * 
 * @route Post /store/product_id
 * @group Store 
 * @security JWT
 * @param {number} latitude.body.required - latitude of the user
 * @param {number} longitude.body.required - longitude of the user
 * @returns {object} 200 - Store objects nearby
 * @returns {Error}  default - Unexpected error
 */
 router.post('/product_id', storeRequest('getProduct'), storeController.getByProductId);

 /**
 * Get ordered product
 * 
 * @route get /store/sorted/product
 * @group Store 
 * @security JWT
 * @param {number} latitude.body.required - latitude of the user
 * @param {number} longitude.body.required - longitude of the user
 * @returns {object} 200 - Store objects nearby
 * @returns {Error}  default - Unexpected error
 */
 router.get('/sorted/products', require('express-mongoose-sort'), storeController.getOrderedProducts);
 
 /**
 * Get ordered ingredient
 * 
 * @route get /store/sorted/ingredient
 * @group Store 
 * @security JWT
 * @param {number} latitude.body.required - latitude of the user
 * @param {number} longitude.body.required - longitude of the user
 * @returns {object} 200 - Store objects nearby
 * @returns {Error}  default - Unexpected error
 */
 router.get('/sorted/ingredient', require('express-mongoose-sort'), storeController.getOrderedIngrident);
 
 /**
 * Get ordered machinery
 * 
 * @route get /store/sorted/machinery
 * @group Store 
 * @security JWT
 * @param {number} latitude.body.required - latitude of the user
 * @param {number} longitude.body.required - longitude of the user
 * @returns {object} 200 - Store objects nearby
 * @returns {Error}  default - Unexpected error
 */
 router.get('/sorted/machinery', require('express-mongoose-sort'), storeController.getOrderedMachinery);

  /**
 * Get stores with products
 * 
 * @route Post /store/product
 * @group Store 
 * @security JWT
 * @param {number} latitude.body.required - latitude of the user
 * @param {number} longitude.body.required - longitude of the user
 * @returns {object} 200 - Store objects nearby
 * @returns {Error}  default - Unexpected error
 */
   router.post('/product', storeController.getProducts);


  /**
 * Get stores with ingredients
 * 
 * @route Post /store/ingredient
 * @group Store 
 * @security JWT
 * @param {number} latitude.body.required - latitude of the user
 * @param {number} longitude.body.required - longitude of the user
 * @returns {object} 200 - Store objects nearby
 * @returns {Error}  default - Unexpected error
 */
   router.post('/ingredient', storeController.getIngredients);
 /**
 * Get stores with the ingredient
 * 
 * @route Post /store/ingredients_id
 * @group Store 
 * @security JWT
 * @param {number} latitude.body.required - latitude of the user
 * @param {number} longitude.body.required - longitude of the user
 * @returns {object} 200 - Store objects nearby
 * @returns {Error}  default - Unexpected error
 */
 router.post('/ingredients_id', storeRequest('getIngredient'), storeController.getByingredientsId);

/**
 * Get a store 
 * 
 * @route GET /store/self
 * @group Store 
 * @security JWT
 * @returns {object} 200 - Store object of that user
 * @returns {Error}  default - Unexpected error
 */
 router.get('/self', storeController.getSelfStore);
 
/**
 * Get a store 
 * 
 * @route GET /store/self
 * @group Store 
 * @security JWT
 * @returns {object} 200 - Store object of that user
 * @returns {Error}  default - Unexpected error
 */
 router.get('/self/machinery', storeController.getSelfMachinery);

/**
 * Get a store 
 * 
 * @route GET /store/self
 * @group Store 
 * @security JWT
 * @returns {object} 200 - Store object of that user
 * @returns {Error}  default - Unexpected error
 */
 router.get('/self/ingredient', storeController.getSelfIngredient);

/**
 * Get a store 
 * 
 * @route GET /store/self
 * @group Store 
 * @security JWT
 * @returns {object} 200 - Store object of that user
 * @returns {Error}  default - Unexpected error
 */
 router.get('/self/product', storeController.getSelfProduct);

/**
 * Returns ALL stores
 * 
 * @route GET /store
 * @group Store - Deals with all CRUD operations with store model
 * @param {string} sort.query - sort parament
 * @param {string} page.query - set the page number
 * @param {string} filter.query - set filter query 
 * @security JWT
 * @returns {object} 200 - Array of companies
 * @returns {Error}  default - Unexpected error
 */
router.get('/', storeController.getAll);

/**
 * Get a store 
 * 
 * @route GET /store/{id}
 * @group Store 
 * @param {string} id.path.required - store id
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', storeController.getByID);

/**
 * Create a new store 
 * 
 * @route POST /store
 * @group Store 
 * @security JWT
 * @param {number} latitude.body.required - latitude of the user
 * @param {number} longitude.body.required - longitude of the user
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
router.post('/', storeRequest('createStore'), storeController.createStore);

/**
 * Add new product
 * 
 * @route POST /store/add_product
 * @group Store 
 * @param {string} product.path.required - product id
 * @param {number} quantity.path.required - product quantity
 * @param {number} price.path.required - product price
 * @security JWT
 * @returns {object} 200 - Store object with the added product item
 * @returns {Error}  default - Unexpected error
 */
router.post('/add_product', storeRequest('addProduct'), storeController.addItemToStore);

/**
 * Add new product
 * 
 * @route POST /store/add_machinery
 * @group Store 
 * @param {string} machinery.path.required - machinery id
 * @param {number} quantity.path.required - machinery quantity
 * @param {number} price.path.required - machinery price
 * @security JWT
 * @returns {object} 200 - Store object with the added machinery item
 * @returns {Error}  default - Unexpected error
 */
router.post('/add_machinery', storeRequest('addMachinery'), storeController.addItemToStore);

/**
 * Add new product
 * 
 * @route POST /store/add_ingredients
 * @group Store 
 * @param {string} product.path.required - ingredient id
 * @param {number} quantity.path.required - ingredient quantity
 * @param {number} price.path.required - ingredient price
 * @security JWT
 * @returns {object} 200 - Store object with the added ingredient item
 * @returns {Error}  default - Unexpected error
 */
router.post('/add_ingredient', storeRequest('addIngredient'), storeController.addItemToStore);

/**
 * Update a store 
 * @route PUT /store/product/{id}
 * @group Store 
 * @param {string} product.path.required - product id
 * @param {number} quantity.path.required - product quantity
 * @param {number} price.path.required - product price
 * @param {string} id.path - store id
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
router.put('/product/:id', storeRequest('adjustProduct'), storeController.updateStore);

/**
 * Update a store 
 * @route PUT /store/machinery/{id}
 * @group Store 
 * @param {string} product.path.required - machinery id
 * @param {number} quantity.path.required - machinery quantity
 * @param {number} price.path.required - machinery price
 * @param {string} id.path - store id
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
router.put('/machinery/:id', storeRequest('adjustMachinery'), storeController.updateStore);

/**
 * Update a store 
 * @route PUT /store/ingredient/{id}
 * @group Store 
 * @param {string} product.path.required - ingredient id
 * @param {number} quantity.path.required - ingredient quantity
 * @param {number} price.path.required - ingredient price
 * @param {string} id.path - store id
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
router.put('/ingredient/:id', storeRequest('adjustIngredient'), storeController.updateStore);

/**
 * Delete product from store 
 * @route Delete /store/product
 * @group Store 
 * @param {string} product.path.required - product id
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
router.delete('/product', storeRequest('removeProduct'), storeController.deleteItem);

/**
 * Delete machinery from store 
 * @route Delete /store/machinery
 * @group Store 
 * @param {string} machinery.path.required - machinery id
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
 router.delete('/machinery', storeRequest('removeMachinery'), storeController.deleteItem);

 /**
 * Delete ingredient from store 
 * @route Delete /store/ingredient
 * @group Store 
 * @param {string} ingredient.path.required - ingredient id
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
router.delete('/ingredient', storeRequest('removeIngredient'), storeController.deleteItem);

 /**
 * Clear Store
 * @route Patch /store/clear_store
 * @group Store 
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
router.put('/clear_store', storeController.clearStore);

 /**
 * Clear Store
 * @route Patch /store/clear_store
 * @group Store 
 * @security JWT
 * @returns {object} 200 - Store object
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', storeController.deleteStore);
router.get('/user/:id', storeController.getByUserId);

// Todo


// Testing remains

module.exports = router;