'use strict';

var express = require('express');
var controller = require('./returnconsignmentlist.controller');

var router = express.Router();

router.get('/query', controller.get);

router.get('/warehouse/query', controller.getwarehouse);

router.get('/consignmentdetail/:consignmentID', controller.getDetails);


module.exports = router;
