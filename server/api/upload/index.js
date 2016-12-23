'use strict';

var express = require('express');
var controller = require('./upload.controller');
var router = express.Router();

router.put('/return/:orderLineId', controller.put);

module.exports = router;