'use strict';

var express = require('express');
var controller = require('./consignment.controller');

var router = express.Router();

router.get('/:consignmentID', controller.getProcessed);

router.put('/:consignmentID', controller.put);

router.get('/status/:consignmentID', controller.getStatus);

router.get('/reprintinvoice/:consignmentID', controller.reprintinvoice);

router.get('/consignmentparams/:consignmentID/paramGroup/consignment',controller.getUserDataForForm);

router.get('/custominvoice/:consignmentID',controller.getUserInvoiceInformation);

router.post('/:consignmentId/consignmentparams',controller.postUserDataForForm);

router.get('/invoice/:xyz',controller.getInvoiceData);

module.exports = router;
