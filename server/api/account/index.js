'use strict';

var express = require('express');

var controller = require('./account.controller');

var router = express.Router();

router.get('/', controller.get);


module.exports = router;
