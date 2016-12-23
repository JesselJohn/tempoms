'use strict';

var express = require('express');

var controller = require('./customerdetail.controller');

var router = express.Router();

router.get('/search/:customername', controller.get);

module.exports = router;
