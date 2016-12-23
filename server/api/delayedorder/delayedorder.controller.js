'use strict';

var _ = require('lodash');

var environment = require('../../config/environment');
var Order = require('../service');
var ConsignmentCtrl = require('../consignment/consignment.controller.js');
var q = require('q');
var ConsignmentService = require('../service');

var newOption = function(options) {
        this.host = options.host;
        this.port = options.port;
        this.headers = options.headers;
        this.method = options.method;
    };
    var newURIOption = function(options) {
        this.host = options.host;
        this.port = options.port;
        this.headers = options.headers;
        this.method = options.method;
        this.path = options.path;
    };

var get = function(req, res) {


    var queryObject = req.query;

    var searchQuery = '';

    if (!req.headers.isadmin) {
        queryObject.fcId = req.headers.storeid;
    };


    var ASSIGNED = new Date(new Date().getTime() - 21600000).toISOString();
    var SAPPICKPASS = new Date(new Date().getTime() - 7200000).toISOString();
    var SAPPICKFAIL = new Date(new Date().getTime() - 720000).toISOString();
    var PICKPASS = new Date(new Date().getTime() - 3600000).toISOString();
    var PICKFAIL = new Date(new Date().getTime() - 720000).toISOString();
    var QCFAIL = new Date(new Date().getTime() - 720000).toISOString();
    var QCPASS = new Date(new Date().getTime() - 36000000).toISOString();
    var DELIVERYMODIFIED = new Date(new Date().getTime() - 36000000).toISOString();
    var PACKED = new Date(new Date().getTime() - 43200000).toISOString();
    var INVOICED = new Date(new Date().getTime() - 43200000).toISOString();
    var SHIPPED = new Date(new Date().getTime() - 43200000).toISOString();
    var READYFORCUSTOMERPICK = new Date(new Date().getTime() - 172800000).toISOString();
    var CANDIDATE_FOR_RTO = new Date(new Date().getTime() - 172800000).toISOString();
    var RTO_REATTEMPT = new Date(new Date().getTime() - 172800000).toISOString();
    var REPRINTINVOICE = new Date(new Date().getTime() - 7200000).toISOString();
    var POSPAYMENTPENDING = new Date(new Date().getTime() - 172800000).toISOString();


    var dateObject = {
        "ASSIGNED": ASSIGNED,
        "SAPPICKPASS": SAPPICKPASS,
        "SAPPICKFAIL": SAPPICKFAIL,
        "PICKPASS": PICKPASS,
        "PICKFAIL": PICKFAIL,
        "QCFAIL": QCFAIL,
        "QCPASS": QCPASS,
        "DELIVERYMODIFIED": DELIVERYMODIFIED,
        "PACKED": PACKED,
        "INVOICED": INVOICED,
        "SHIPPED": SHIPPED,
        "READYFORCUSTOMERPICK": READYFORCUSTOMERPICK,
        "CANDIDATE_FOR_RTO": CANDIDATE_FOR_RTO,
        "RTO_REATTEMPT": RTO_REATTEMPT,
        "REPRINTINVOICE": REPRINTINVOICE,
        "POSPAYMENTPENDING": POSPAYMENTPENDING
    };


    var options = {};

    _.extend(options , environment.optimusPrime.options);

    options.headers = {
        'Authorization': req.headers.authorization
    };


    options.method = "GET";



    var baseOption = {}; // For passing to Consignment Get As It will not have request body..

    var baseOptionForURI = {};


    _.extend(baseOption, options);


    var promisesarray = [];


    // For non object
    for (var query in queryObject) {
       
        if (typeof queryObject[query] !== 'object' && query !== 'consignmentStatus') {

            searchQuery = searchQuery + query + '=' + encodeURIComponent(queryObject[query]) + '&';
        };
    };

    for (var query in queryObject) {

        if (typeof queryObject[query] !== 'object' && query === 'consignmentStatus') {


            var processquerysingle = "";

            processquerysingle = query + '=' + encodeURIComponent(queryObject[query]) + '&';

            options.path = environment.optimusPrime.domainName + '/consignment' +
                '/stale?' + processquerysingle + searchQuery + 'date=' + dateObject[queryObject[query]];


            _.extend(baseOptionForURI, new newURIOption(options));


            promisesarray.push(Order.getData(baseOptionForURI));
            options.path = "";

           
        };
    };


    for (var query in queryObject) {

        if (typeof queryObject[query] === 'object') {

            var objectP = queryObject[query];

            for (var i = objectP.length - 1; i >= 0; i--) {


                var processquery = "";

                processquery = query + '=' + encodeURIComponent(objectP[i]) + '&';

                options.path = environment.optimusPrime.domainName + '/consignment' +
                    '/stale?' + processquery + searchQuery + 'date=' + dateObject[objectP[i]];


                _.extend(baseOptionForURI, options);


                promisesarray.push(Order.getData(baseOptionForURI));
                options.path = "";

            };
        }
    };



    q.all(promisesarray).then(function(responseArray) {

        var sumofitems = 0;
        var promises = [];
        var returnOrderArray = [];

        for (var i = 0; i < responseArray.length; i++) {

            var processobject = JSON.parse(responseArray[i]);
            console.log(processobject);
            for (var j = 0; j < processobject.content.length; j++) {

                promises.push(ConsignmentCtrl.get(processobject.content[j], new newOption(baseOption)));

            }

            sumofitems += processobject.totalElements;

        };
        var response = {};
        response.totalElements = sumofitems;
        q.all(promises).then(function(responseQ) {
            for (var i = 0; i < responseQ.length; i++) {
                if (!(_.isEmpty(responseQ[i])))
                    returnOrderArray.push(responseQ[i]);
            };
            response.consignment = returnOrderArray;

            res.status(200).send(response);
            // do things after your inner functions run 
        }, function(error) {
            console.log("Someone Fails TO fetch data");
            res.status(299).send(response);
        });



    }, function(error) {
        // soome fail to fetch data
        res.status(299).send(error);
    });

};




exports.get = get;
