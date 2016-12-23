'use strict';

var express = require('express');
var controller = require('./pakage.controller');

var router = express.Router();

// For Get Package of all Type
router.get('/', controller.get);

// For Posting or Updating the Package of a consignment
router.post('/', controller.post);

router.post('/dimension/:length/:breadth/:height', controller.postDimension);


module.exports = router;

