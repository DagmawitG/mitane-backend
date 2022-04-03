var express = require('express');

var router = express.Router();

/**
 * Returns API status
 * 
 * @route GET /
 * @group Index - Validates and gives back API service status
 * @returns {object} 200 - {
 *  title: 'Mitane api',
 *  version: '1.0.0',
 *   description: 'description .....'
 * }
 * @returns {Error}  default - Unexpected error
 */
router.get('/', async function(req, res, next) {
  return res.json({
    title: 'Mitane api',
    version: '1.0.0',
    description: 'description .....'
  })
});

module.exports = router;
