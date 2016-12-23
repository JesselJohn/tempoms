'use strict';

var express = require('express');
var controller = require('./qualitycheck.controller');
var router = express.Router();

router.get('/huCode/:huCode', controller.get); // Search By HU CODE FOR NORMAL QUALITY PAGE

router.get('/detail/:consignmentID', controller.getDetail); // Detail Of Consignment ID

module.exports = router;
