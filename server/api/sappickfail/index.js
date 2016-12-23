'use strict';

var express = require('express');
var controller = require('./sappickfail.controller');
var router = express.Router();

router.put('/save', controller.put);

module.exports = router;
