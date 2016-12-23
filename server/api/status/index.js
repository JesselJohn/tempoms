 'use strict';

 var express = require('express');
 
 var controller =  require('./status.controller');

 var router = express.Router();


 router.get('/consignment', controller.getconsignment);
 router.get('/order', controller.getorder);
 router.get('/fullNdelivery', controller.getfullNdelivery);
 router.get('/returnorder', controller.getreturnorder);
 

 module.exports = router;
