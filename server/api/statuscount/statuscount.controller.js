'use strict';

var Service = require('../service');
var environment = require('../../config/environment');
var q = require('q');
var _ = require('lodash');



var normalstore = [{
    "id": 5,
    "name": "Total",
    "type": true,
    "statusToCustomer": "In Progress",
    "statusToOms": "Assigned"
}, {
    "id": 5,
    "name": "ASSIGNED",
    "type": false,
    "statusToCustomer": "In Progress",
    "statusToOms": "Assigned"
}, {
    "id": 24,
    "name": "POSPAYMENTPENDING",
    "type": false,

    "statusToCustomer": "POS Payment Pending",
    "statusToOms": "POS Payment Pending"
}, {
    "id": 11,
    "name": "QCPASS",
    "type": false,

    "statusToCustomer": "Confirmed",
    "statusToOms": "QC Pass"
}, {
    "id": 12,
    "name": "DELIVERYMODIFIED",
    "type": false,

    "statusToCustomer": "In Progress",
    "statusToOms": "Delivery Modified"
}, {
    "id": 14,
    "name": "INVOICED",
    "type": false,

    "statusToCustomer": "Invoiced",
    "statusToOms": "Invoiced"
}, {
    "id": 16,
    "name": "READYFORCUSTOMERPICK",
    "type": false,

    "statusToCustomer": "Ready For Pickup",
    "statusToOms": "Ready For Customer Pick"
}, {
    "id": 17,
    "name": "CUSTOMERPICKCOMPLETE",
    "type": false,

    "statusToCustomer": "Items Have been Picked",
    "statusToOms": "Customer Pick Complete"
}];

var hidestore = [{
    "id": 5,
    "name": "INITIATED",
    "type": false,

    "statusToCustomer": "In Progress",
    "statusToOms": "Assigned"
}, {
    "id": 16,
    "name": "PICKPASS",
    "type": false,

    "statusToCustomer": "Ready For Pickup",
    "statusToOms": "Ready For Customer Pick"
}, {
    "id": 12,
    "name": "PICKFAIL",
    "type": false,

    "statusToCustomer": "In Progress",
    "statusToOms": "Delivery Modified"
}, {
    "id": 14,
    "name": "QCFAIL",
    "type": false,
    "statusToCustomer": "Invoiced",
    "statusToOms": "Invoiced"
}, {
    "id": 11,
    "name": "CANCELLED",
    "type": false,
    "statusToCustomer": "Confirmed",
    "statusToOms": "QC Pass"
}];

var delivery_store_normal = [{
    "id": 5,
    "name": "Total",
    "type": true,
    "statusToCustomer": "In Progress",
    "statusToOms": "Assigned"
}, {
    "id": 5,
    "name": "ASSIGNED",
    "type": false,
    "statusToCustomer": "In Progress",
    "statusToOms": "Assigned"
}, {
    "id": 11,
    "name": "QCPASS",
    "type": false,
    "statusToCustomer": "Confirmed",
    "statusToOms": "QC Pass"
}, {
    "id": 12,
    "name": "DELIVERYMODIFIED",
    "type": false,
    "statusToCustomer": "In Progress",
    "statusToOms": "Delivery Modified"
}, {
    "id": 14,
    "name": "INVOICED",
    "type": false,
    "statusToCustomer": "Invoiced",
    "statusToOms": "Invoiced"
}, {
    "id": 13,
    "name": "PACKED",
    "type": false,
    "statusToCustomer": "Packed",
    "statusToOms": "Packed"
}, {
    "id": 23,
    "name": "REPRINTINVOICE",
    "type": false,
    "statusToCustomer": "Please reprint the invoice",
    "statusToOms": "Need to reprint invoice"
}, {
    "id": 15,
    "name": "SHIPPED",
    "type": false,
    "statusToCustomer": "Shipped",
    "statusToOms": "Shipped"
}];

var delivery_store_hide = [{
    "id": 1,
    "name": "INITIATED",
    "type": false,
    "statusToCustomer": "Pending Payment",
    "statusToOms": "Initiated"
}, {
    "id": 4,
    "name": "UNASSIGNED",
    "type": false,
    "statusToCustomer": "In Progress",
    "statusToOms": "Unassigned"
}, {
    "id": 8,
    "name": "PICKPASS",
    "type": false,
    "statusToCustomer": "In Progress",
    "statusToOms": "Pick Pass"
}, {
    "id": 9,
    "name": "PICKFAIL",
    "type": false,
    "statusToCustomer": "In Progress",
    "statusToOms": "Pick Fail"
}, {
    "id": 10,
    "name": "QCFAIL",
    "type": false,
    "statusToCustomer": "In Progress",
    "statusToOms": "QC Fail"
}, {
    "id": 2,
    "name": "DELIVERED",
    "type": false,
    "statusToCustomer": "Delivered",
    "statusToOms": "Delivered"
}, {
    "id": 3,
    "name": "CANCELLED",
    "type": false,
    "statusToCustomer": "Cancelled",
    "statusToOms": "Cancelled"
}, {
    "id": 18,
    "name": "CANDIDATE_FOR_RTO",
    "type": false,
    "statusToCustomer": "Return to origin has been initiated",
    "statusToOms": "Candidate For RTO"
}, {
    "id": 19,
    "name": "RTO_CONFIRMED",
    "type": false,
    "statusToCustomer": "Consignment Cancelled",
    "statusToOms": "RTO Confirmed"
}, {
    "id": 20,
    "name": "RTO_REATTEMPT",
    "type": false,
    "statusToCustomer": "Reattempt",
    "statusToOms": "RTO Reattempt"
}, {
    "id": 21,
    "name": "RTO_COMPLETED",
    "type": false,
    "statusToCustomer": "Consignment received back at store",
    "statusToOms": "RTO Completed"
}, {
    "id": 22,
    "name": "RTO_RECEIVED",
    "type": false,
    "statusToCustomer": "Consignment received back at store",
    "statusToOms": "RTO Received"
}];

var delivery_wh_normal = [{
    "id": 5,
    "name": "Total",
    "type": true,
    "statusToCustomer": "In Progress",
    "statusToOms": "Assigned"
}, {
    "id": 5,
    "name": "ASSIGNED",
    "type": false,
    "statusToCustomer": "In Progress",
    "statusToOms": "Assigned"
}, {
    "id": 6,
    "name": "SAPPICKPASS",
    "type": false,
    "statusToCustomer": "In Progress",
    "statusToOms": "SAP Pick Pass"
}, {
    "id": 8,
    "name": "PICKPASS",
    "type": false,
    "statusToCustomer": "In Progress",
    "statusToOms": "Pick Pass"
}, {
    "id": 11,
    "name": "QCPASS",
    "type": false,
    "statusToCustomer": "Confirmed",
    "statusToOms": "QC Pass"
}, {
    "id": 12,
    "name": "DELIVERYMODIFIED",
    "type": false,
    "statusToCustomer": "In Progress",
    "statusToOms": "Delivery Modified"
}, {
    "id": 14,
    "name": "INVOICED",
    "type": false,
    "statusToCustomer": "Invoiced",
    "statusToOms": "Invoiced"
}, {
    "id": 13,
    "name": "PACKED",
    "type": false,
    "statusToCustomer": "Packed",
    "statusToOms": "Packed"
}, {
    "id": 23,
    "name": "REPRINTINVOICE",
    "type": false,
    "statusToCustomer": "Please reprint the invoice",
    "statusToOms": "Need to reprint invoice"
}, {
    "id": 15,
    "name": "SHIPPED",
    "type": false,
    "statusToCustomer": "Shipped",
    "statusToOms": "Shipped"
}];

var delivery_wh_hide = [{
    "id": 1,
    "name": "INITIATED",
    "type": false,
    "statusToCustomer": "Pending Payment",
    "statusToOms": "Initiated"
}, {
    "id": 4,
    "name": "UNASSIGNED",
    "type": false,
    "statusToCustomer": "In Progress",
    "statusToOms": "Unassigned"
}, {
    "id": 8,
    "name": "SAPPICKFAIL",
    "type": false,
    "statusToCustomer": "In Progress",
    "statusToOms": "Pick Pass"
}, {
    "id": 9,
    "name": "PICKFAIL",
    "type": false,
    "statusToCustomer": "In Progress",
    "statusToOms": "Pick Fail"
}, {
    "id": 10,
    "name": "QCFAIL",
    "type": false,
    "statusToCustomer": "In Progress",
    "statusToOms": "QC Fail"
}, {
    "id": 2,
    "name": "DELIVERED",
    "type": false,
    "statusToCustomer": "Delivered",
    "statusToOms": "Delivered"
}, {
    "id": 3,
    "name": "CANCELLED",
    "type": false,
    "statusToCustomer": "Cancelled",
    "statusToOms": "Cancelled"
}, {
    "id": 18,
    "name": "CANDIDATE_FOR_RTO",
    "type": false,
    "statusToCustomer": "Return to origin has been initiated",
    "statusToOms": "Candidate For RTO"
}, {
    "id": 19,
    "name": "RTO_CONFIRMED",
    "type": false,
    "statusToCustomer": "Consignment Cancelled",
    "statusToOms": "RTO Confirmed"
}, {
    "id": 20,
    "name": "RTO_REATTEMPT",
    "type": false,
    "statusToCustomer": "Reattempt",
    "statusToOms": "RTO Reattempt"
}, {
    "id": 21,
    "name": "RTO_COMPLETED",
    "type": false,
    "statusToCustomer": "Consignment received back at store",
    "statusToOms": "RTO Completed"
}, {
    "id": 22,
    "name": "RTO_RECEIVED",
    "type": false,
    "statusToCustomer": "Consignment received back at store",
    "statusToOms": "RTO Received"
}];

var dataobject = {
    normalstore: normalstore,
    hidestore: hidestore,
    deliverystorenormal: delivery_store_normal,
    deliverystorehide: delivery_store_hide,
    deliverywhnormal: delivery_wh_normal,
    deliverywhhide: delivery_wh_hide
}


var get = function(req, res) {


    var queryObject = req.query;

    if (!req.headers.isadmin) {
        queryObject.fulfilmentCenterId = req.headers.storeid;
    };



    var searchQuery = '';

    for (var query in queryObject) {

        if (typeof queryObject[query] === 'object') {

            var objectP = queryObject[query];

            for (var i = objectP.length - 1; i >= 0; i--) {

                searchQuery = searchQuery + query + '=' + encodeURIComponent(objectP[i]) + '&';

            };
        } else {
            searchQuery = searchQuery + query + '=' + encodeURIComponent(queryObject[query]) + '&';
        }
    };

    searchQuery = searchQuery.substring(0, searchQuery.length - 1);


    var options = {};
    _.extend( options , environment.optimusPrime.options);
    

    options.headers = {
        'Authorization': req.headers.authorization
    };



    options.method = "GET";

    var defered = q.defer();
    var promises = [];

    var array = dataobject[req.params.arraytype];

    var newOption = function(options) {
        this.host = options.host;
        this.port = options.port;
        this.headers = options.headers;
        this.method = options.method;
        this.path = options.path;
    };

    for (var i = 0; i < array.length; i++) {
        if (array[i].type === true) {
            options.path = environment.optimusPrime.domainName + '/consignment/search?' + searchQuery;
        } else {
            options.path = environment.optimusPrime.domainName + '/consignment/search?' + "&consignmentStatus=" + array[i].name + '&' + searchQuery;
        }

        promises.push(Service.getData(new newOption(options)));

    };



    var returnOrderArray = [];



    q.all(promises).then(function(responseQ) {
        for (var i = 0; i < responseQ.length; i++) {
            var temp = JSON.parse(responseQ[i]);

            var currentDataObj = {};
            currentDataObj.name = array[i].name;
            currentDataObj.number = temp.totalElements;


            returnOrderArray.push(currentDataObj);
            currentDataObj = {};

        };

        res.status(200).send(returnOrderArray);
        // do things after your inner functions run 
    }, function(error) {
        console.log("Erorr while fetching data in status count");
        console.log(error);
        res.status(205).send({});

    });




};


var getDashboardCounts = function(req, res) {
 var options = {};
    _.extend( options , environment.optimusPrime.options);
    options.headers = {
        'Authorization': req.headers.authorization
    };
    options.method = "GET";

  var url = environment.optimusPrime.domainName + '/consignment/count'; //url
  var promises = [];

  if (req.headers.isadmin) { //if admin
    var url1 = url + '?fcType=Warehouse';
    options.path = url1;
    promises.push(Service.getData(options));
    var url2 = url + '?fcType=Store';
    options.path = url2;
    promises.push(Service.getData(options));
  } else { // non admin(store agent + supervisor)
    url = url + '?fcId=' + req.headers.storeid;
    options.path = url;
    promises.push(Service.getData(options));
  }

  q.all(promises).then(function(response) {
    var data = {};
    if(response.length > 1) {
     var warehouse = JSON.parse(response[0]);
      var store = JSON.parse(response[1]);
      data.warehouse = warehouse;
      data.store = store;
    } else {
      data.store = JSON.parse(response[0]);
    }
    return res.status(200).send(data);
  }, function(err) {
    return res.status(error.statusCode).send(error);
  });

};

exports.get = get;
exports.getDashboardCounts = getDashboardCounts;
