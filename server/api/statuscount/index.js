 'use strict';

 var express = require('express');
 
 var controller =  require('./statuscount.controller');

 var router = express.Router();


 router.get('/type/:arraytype', controller.get);
 router.get('/dashboardCount', controller.getDashboardCounts);
 

 module.exports = router;
