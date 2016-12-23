'use strict';

var express = require('express');
var controller = require('./orderline.controller');
var router = express.Router();

router.post('/:orderlineId', controller.post);

module.exports = router;