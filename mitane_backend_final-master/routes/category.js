const {
    getCategory,
    getCategoryById,
    getCategoryByType,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category-controller');
const {permission} = require('../middlewares/permission');
const {createCategoryRequest} = require('../middlewares/user-request/category');
//Include other resource routes
const productRouter = require('./product');

const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator();

//Re-route to other resource route
router.use('/:categoryName/products',productRouter);

/**
 * Get category 
 * 
 * @route GET /category
 * @group Category 
 * @security JWT
 * @param {string} keyword.query - category name
 * @returns {object} 200 - Category object
 * @returns {Error}  default - Unexpected error
 */
router.route('/').get(getCategory);

/**
 * Create category 
 * 
 * @route Post /category
 * @group Category 
 * @security JWT
 * @param {string} name.body.required - Category name
 * @returns {object} 200 - A category object
 * @returns {Error}  default - Unexpected error
 */
router.route('/').post(permission(),validator.body(createCategoryRequest),createCategory);

/**
 * Get a category by Id
 * 
 * @route GET /category/{id}
 * @group Category 
 * @security JWT
 * @param {string} id.path.required - category id
 * @returns {object} 200 - A single category object
 * @returns {Error}  default - Unexpected error
 */
router.route('/:id').get(getCategoryById);

/**
 * Get a category by Id
 * 
 * @route GET /category/type/{name}
 * @group Category 
 * @security JWT
 * @param {string} name.path.required - type of product
 * @returns {object} 200 - A single category object
 * @returns {Error}  default - Unexpected error
 */
 router.route('/type/:name').get(getCategoryByType);

/**
 * Update a category 
 * 
 * @route Put /category/{name}
 * @group Category 
 * @security JWT
 * @param {string} - Category name
 * @param {string} name.path.required - category name
 * @returns {object} 200 - Category Object
 * @returns {Error}  default - Unexpected error
 */
router.route('/:name').put(permission(),updateCategory);

/**
 * Delete a category 
 * 
 * @route Delete /category/{name}
 * @group Category 
 * @security JWT
 * @param {string} name.path.required - category name
 * @returns {object} 200 - Category Object
 * @returns {Error}  default - Unexpected error
 */
router.route('/:name').delete(permission(),deleteCategory);


module.exports = router;