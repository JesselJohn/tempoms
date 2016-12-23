 'use strict';

 var express = require('express');
 
 var controller =  require('./returnWH.controller');

 var router = express.Router();


router.get('/orderID/:returnorderID', controller.get); 

router.get('/detail/:consignmentID', controller.getDetail); 

module.exports = router;

