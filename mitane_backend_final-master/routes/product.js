const {
    getProducts,
    getProductById,
    getProductByName,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products-controller');
const {createProductRequest} = require('../middlewares/user-request/product');
const {permission} = require('../middlewares/permission');
const express = require('express');
const router = express.Router({mergeParams: true});
const validator = require('express-joi-validation').createValidator({});
/**
 * @typedef Product
 * @property {string} name.required - Product name
 * @property {string} category.required - Category id
 */

/**
 * Get products 
 * 
 * @route Get /product
 * @group Product 
 * @security JWT
 * @param {string} keyword.query - category or product name
 * @returns {object} 200 - Product Object
 * @returns {Error}  default - Unexpected error
 */
router.route('/').get(getProducts);

/**
 * Create product
 * 
 * @route Post /product
 * @group Product 
 * @security JWT
 * @param {string} name.body.required - name of product
 * @param {string} category.body.required - name of category 
 * @returns {object} 200 - Product Object
 * @returns {Error}  default - Unexpected error
 */
router.route('/create').post(permission(),validator.body(createProductRequest),createProduct);

/**
 * Get product by Id 
 * 
 * @route Get /product/{id}
 * @group Product 
 * @security JWT
 * @param {string} id.path.required - category Id
 * @returns {object} 200 - Product Object
 * @returns {Error}  default - Unexpected error
 */
router.route('/:id').get(getProductById);

/**
 * Get product by Name
 * 
 * @route Get /products/n/{name}
 * @group Product 
 * @security JWT
 * @param {string} name.path.required - product name
 * @returns {object} 200 - Product Object
 * @returns {Error}  default - Unexpected error
 */
 router.route('/n/:name').get(getProductByName);

/**
 * Update a product
 * 
 * @route Put /product/{name}
 * @group Product 
 * @security JWT
 * @param {string} name.path.required - product name
 * @returns {object} 200 - Product Object
 * @returns {Error}  default - Unexpected error
 */
router.route('/:name').put(permission(),updateProduct);

/**
 * Delete a product 
 * 
 * @route Delete /product/:name
 * @group Product 
 * @security JWT
 * @param {string} name.path.required - product name
 * @returns {object} 200 - Product Object
 * @returns {Error}  default - Unexpected error
 */
router.route('/:name').delete(permission(),deleteProduct);


module.exports = router;