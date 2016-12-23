'use strict';

var express = require('express');
var controller = require('./pickfailorderdetail.controller');

var router = express.Router();

router.get('/:itemID/:consignmentID/:reasonfromurl', controller.get);

module.exports = router;
