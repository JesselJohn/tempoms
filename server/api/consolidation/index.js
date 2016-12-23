'use strict';

var express = require('express');
var controller = require('./consolidation.controller');
var router = express.Router();

router.get('/huCode/:huCode', controller.get);

router.get('/detail/:consignmentID', controller.getDetail);

module.exports = router;