'use strict';

var express = require('express');
var controller = require('./returnorder.controller');

var router = express.Router();

router.get('/query', controller.get);

router.post('/create', controller.post);

router.put('/:retunorderID', controller.put);



module.exports = router;
