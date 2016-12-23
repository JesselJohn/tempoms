'use strict';

var express = require('express');
var controller = require('./order.controller');

var router = express.Router();

router.get('/query', controller.get);

router.get('/placedbymequery', controller.getplacedbyme);

router.get('/getReasons',controller.getRejectionReasons);
// Return Consignment For 
router.get('/consigment/:orderID', controller.getConsignmentList);


module.exports = router;
