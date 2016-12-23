'use strict';

var express = require('express');
var controller = require('./delayedorder.controller');

var router = express.Router();

router.get('/query', controller.get);

module.exports = router;
