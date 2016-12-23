'use strict';

var express = require('express');
var controller = require('./item.controller');
var router = express.Router();

router.put('/:consignmentID', controller.put);


router.put('/wh/:consignmentID', controller.putwh);



module.exports = router;