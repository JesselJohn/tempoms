'use strict';

var express = require('express');
var controller = require('./failorders.controller');

var router = express.Router();

router.get('/query', controller.get);

router.get('/qcfail/query', controller.getqc);


module.exports = router;
