'use strict';

var express = require('express');

var controller = require('./refund.controller');

var router = express.Router();

router.get('/:returnID', controller.get);

module.exports = router;
