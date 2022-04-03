const express = require('express');
const router = express.Router();
const sugggestionController = require('../controllers/suggestions-controller');
/**
 * @typedef Suggestion
 */

/**
 * Get product suggestion
 * @route Get /price
 * @group Suggestion
 * @security JWT
 * @returns {object} 200 - Product object
 * @returns {Error}  default - Unexpected error
 */
 router.get('/price', sugggestionController.getSuggestionsBasedOnPrice);

/**
 * Get product suggestion
 * @route Get /weather
 * @group Suggestion
 * @security JWT
 * @returns {object} 200 - Product object
 * @returns {Error}  default - Unexpected error
 */
 router.get('/weather', sugggestionController.getSuggestionsBasedOnWeather);

 
module.exports = router;