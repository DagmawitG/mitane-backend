const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({})
const {
    getDailyPriceByCategory,
    getDailyPrice,
    createDailyPrice,
    deleteProductPrice,
    deleteDailyPrice,
    addDailyPrice,
} = require('../controllers/price-controller');
const {pricePermission, permission} = require('../middlewares/permission');
const {
    priceByCategoryRequest,
    createDailyPriceRequest,
    addDailyPriceRequest,
    deleteDailyPriceRequest} = require('../middlewares/user-request/price');
/**
 * @typedef Price
 * @property {string} product.required - Product id
 * @property {array} price_of_the_day.required - price, day
 */

/**
 * Get daily price by category
 * @route Get /price
 * @group Price
 * @security JWT
 * @param {string} category.query.required - products category
 * @param {string} date.query.required - price date
 * @returns {object} 200 - Price object
 * @returns {Error}  default - Unexpected error
 */
router.route('/').get(validator.query(priceByCategoryRequest),getDailyPriceByCategory);


 /**
 * Get daily price
 * @route Get /price/{date}
 * @group Price
 * @security JWT
 * @param {string} date.path.required - date
 * @returns {object} 200 - Price object
 * @returns {Error}  default - Unexpected error
 */
  router.route('/:date').get(getDailyPrice);

/**
 * Create daily price
 * @route Post /price
 * @group Price
 * @security JWT
 * @param {string} product.body.required - product name 
 * @param {string} category.body.required - category name 
 * @returns {object} 200 - A Price object
 * @returns {Error}  default - Unexpected error
 */
router.route('/').post(pricePermission(),validator.body(createDailyPriceRequest),createDailyPrice);

    
/**
 * Insert daily price of a product
 * @route Put /price/{product}
 * @group Price
 * @security JWT
 * @param {string} product.path.required - product name
 * @param {number} price.body.required - daily price of product
 * @returns {object} 200 - An array of resource info
 * @returns {Error}  default - Unexpected error
 */
router.route('/:product').put(pricePermission(),validator.body(addDailyPriceRequest),addDailyPrice);

/**
 * Delete prices of a product
 * @route Delete /price/{product}
 * @group Price
 * @security JWT
 * @param {string} productName.path.required - product name
 * @returns {object} 200 - An array of resource info
 * @returns {Error}  default - Unexpected error
 */
router.route('/:product').delete(pricePermission(),deleteProductPrice);

/**
 * Delete daily price of product by date
 * @route Put /price
 * @group Price
 * @security JWT
 * @param {string} product.body.required- product name
 * @param {string} date.body.required- date name
 * @returns {object} 200 - An array of resource info
 * @returns {Error}  default - Unexpected error
 */
router.route('/').put(pricePermission(),validator.body(deleteDailyPriceRequest),deleteDailyPrice);

module.exports = router;