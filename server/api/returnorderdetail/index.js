'use strict';

var express = require('express');
var controller = require('./returnorderdetail.controller');

var router = express.Router();

router.get('/:returnorderID', controller.getProcessed);

router.get('/wh/:returnorderID', controller.getProcessedWH);


module.exports = router;
