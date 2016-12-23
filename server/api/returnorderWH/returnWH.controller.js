'use strict';
var ReturnOrderService = require('../service');
var q = require('q');
var environment = require('../../config/environment');
var ReturnOrderHelper = require('../Helper/returnorder.helper.js');
var _ = require('lodash');
var ReturnOrderDetailCtrl = require('../returnorderdetail/returnorderdetail.controller.js');


var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};


var get = function(req, res) {
    var options = {};

    _.extend( options , environment.optimusPrime.options);


    options.headers = {
        'Authorization': req.headers.authorization
    };

    options.method = "GET";

    options.path = environment.optimusPrime.domainName + '/return/' + req.params.returnorderID;

    ReturnOrderService.getData(options).then(function(response) {
        
        response = JSON.parse(response);


        var processedArrayData = [];

        processedArrayData.push(ReturnOrderHelper.processReturnOrderObject(response));

        return res.status(200).send(processedArrayData);

    }, function(error) {
        res.status(error.status).send(error);
    });
};


var getDetail = function(req, res) { // Consignment ID Process


    var options = {};

    _.extend( options , environment.optimusPrime.options);

    options.headers = {
        'Authorization': req.headers.authorization
    };

    options.method = "GET";

    var baseOption = {};

    _.extend(baseOption, options);


    options.path = environment.optimusPrime.domainName + '/returnConsignment/' + req.params.consignmentID;

    ReturnOrderService.getData(options)
        .then(function(response) {


            var processedData = [];
            var responseArray ;
            response = JSON.parse(response);
            responseArray = response.returnIds;
            

            if (responseArray.length > 0) {

                var defered = q.defer();
                var promises = [];
                var returnOrderArray = [];

                for (var index in responseArray) {

                    promises.push(ReturnOrderDetailCtrl.getProcessedForWareHouse(responseArray[index], baseOption));

                };

                q.all(promises).then(function(responseQ) {
            

                    for (var i = 0; i < responseQ.length; i++) {
                        if (!(_.isEmpty(responseQ[i])))
                            returnOrderArray.push(responseQ[i]);
                    };

                    processedData = returnOrderArray;

                    return res.status(200).send(processedData);
                    // do things after your inner functions run 
                });

                
            } else {
                return res.status(299).send({ 'error': 'Not found' });
            }


        }, function(error) {

            return res.status(error.status).send(error);
        });
};



exports.getDetail = getDetail;
exports.get = get;
