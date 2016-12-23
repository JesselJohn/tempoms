'use strict';

var express = require('express');
var controller = require('./qualitycheckmm.controller');
var router = express.Router();

router.get('/eanCode/:eanCode/:itemstatus/:fcID', controller.get);

module.exports = router;

