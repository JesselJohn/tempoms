var _ = require('lodash');
var environment = require('../../config/environment');
var BinService = require('../service');

var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};

var get = function(baseOption, consignmentID) {


    var options = {};
    
    _.extend(options , baseOption);
    
    options.path = environment.optimusPrime.domainName + '/getSlotId/' + consignmentID;

    return BinService.getData(options)
        .then(function(response) {

                response = JSON.parse(response);
                return response;
            },
            function(err) {
                console.log("error fetching bin number");
                return { error: "Not Found" };
            });
};




exports.get = get;
