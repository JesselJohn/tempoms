 'use strict';

 var express = require('express');
 
 var controller =  require('./slot.controller');

 var router = express.Router();

 router.get('/:consignmentID', controller.get);

 router.delete('/:consignmentID', controller.deleteFn);


 module.exports = router;
