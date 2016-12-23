'use strict';

var config = require('../../config');
var ConsignmentService = require('../service');
var ConsolidationService = require('../service');
var ConsolidationHelper = require('../Helper/consolidation.helper.js');
var q = require('q');
var environment = require('../../config/environment');
var _ = require('lodash');
var util = require('util');

var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};

var get = function(req, res) {
    // Return item ID  And Consignment ID
    // Update the Item In UI

    var itemID = '';
    var consignmentID = '';
    var data = {};


    var options = {};


    _.extend(options , environment.optimusPrime.options);


    options.headers = {
        'Authorization': req.headers.authorization
    };

    options.method = "GET";

    // console.log(options);

    var optionsWHID = {};
    var optionsConsignmentID = {};
    _.extend(optionsWHID, options);

    optionsWHID.path = environment.optimusPrime.domainName + '/warehouseItemId/' + req.params.huCode + '/orderItemId';


    _.extend(optionsConsignmentID, options);

    optionsConsignmentID.path = environment.optimusPrime.domainName + '/warehouseItemId/' + req.params.huCode + '/consignmentId';



    var deffered = q.defer();
    var promises = [];

    promises.push(ConsolidationService.getData(optionsWHID));
    promises.push(ConsolidationService.getData(optionsConsignmentID));
    //hAS TO HANDLE nOT FOUND THING??????
    q.all(promises).then(function(response) {
        var response1 = {};
        var response2 = {};
        response1 = JSON.parse(response[0]);
        response2 = JSON.parse(response[1]);
        //  Item Found But Not SAPPICK
        data['orderItemId'] = response1['itemId'];
        data['itemStatus'] = response1['itemStatus']['name'];
        data['consignmentId'] = response2['consignmentId'];
        if (data['itemStatus'] === 'SAPPICKPASS') {
            console.log("info" , "huCode is found and ready to proceess");
            res.status(200).send(data);
        } else if (
                data['itemStatus'] === 'INITIATED' ||
                data['itemStatus'] === 'UNASSIGNED' ||
                data['itemStatus'] === 'ASSIGNED' ||
                data['itemStatus'] === 'CANCELLED' ||
                data['itemStatus'] === 'SAPPICKFAIL'
                ) {
            res.status(299).send({ 'picked': false , 'data':data });
        }else{
            res.status(299).send({ 'picked': true, 'data':data });
        }
    }, function(error) {
        // Process Some 
        console.log("Error in fetching HU code =>" + req.params.huCode);
        console.log(util.inspect(error, false, null));
        res.status(error.status).send(error);
    });
};

var getDetail = function(res, req) {

    // Get Details And Slot ID
    var options = {};

    _.extend(options , environment.optimusPrime.options);


    options.headers = {
        'Authorization': res.headers.authorization
    };

    options.method = "GET";



    options.path = environment.optimusPrime.domainName + '/consignment/' + res.params.consignmentID;




    ConsolidationService.getData(options).then(function(response) {



        var response = JSON.parse(response);
        var processedData = {};

        processedData = ConsolidationHelper.getConsolidationDetails(response);



        return req.status(200).send(processedData);


    }, function(error) {
        console.log(error);
        return req.status(error.status).send(error);
    });
};



exports.get = get;

exports.getDetail = getDetail;
