'use strict';

var _ = require('lodash');
var request = require('request');
var config = require('../../config');
var environment = require('../../config/environment');
var querystring = require('querystring');
var ConsignmentService = require('../service');
var Address = require('../Address/address.controller.js');
var FCCenter = require('../AFFCenter/ffcenter.controller.js');
var ConsignmentHelper = require('../Helper/consignmentprocesssing.helper.js');
var q = require('q');
var PaymentService = require('../APaymentdetails/payment.controller.js');
var util = require('util');

var newOption = function(options) {
this.host = options.host;
this.port = options.port;
this.headers = options.headers;
this.method = options.method;
};

var isRealValue = function(obj) {
return obj && obj !== "null" && obj !== "undefined";
};


var consignmentProcesssingFn = function(response) {

var processedData = {};

processedData['checkbox'] = true;
processedData['orderId'] = response['orderId'];


processedData['orderDate'] = response['orderDate'].split("[")[0];



if (isRealValue(response['customerDetails'])) {
processedData['customerName'] = response['customerDetails']['firstName'];
if (response['customerDetails']['lastName'] !== null) {
    processedData['customerName'] += ' ' + response['customerDetails']['lastName']
}
}
if (isRealValue(response['orderStatus'])) {
processedData['orderStatus'] = response['orderStatus']['orderStatusToOms'];
}
if (isRealValue(response['orderingCenter'])) {
processedData['orderingStore'] = response['orderingCenter']['fcName'];
}


if (isRealValue(response['consignment'])) {




var firstConsignment = response['consignment'];


processedData['consignmentId'] = firstConsignment['consignmentId'];
processedData['consignmentItemCount'] = firstConsignment['itemCount'];




processedData['isWareHouseConsignment'] = false;

if (isRealValue(firstConsignment['ffCenter'])) {

    processedData['fullfilmentCenter'] = firstConsignment['ffCenter']['fcName'];

    processedData['isWareHouseConsignment'] = false;
    if (firstConsignment['ffCenter']['fcType'] === 'Warehouse') {
        processedData['isWareHouseConsignment'] = true;
    }
} else {
    processedData['fullfilmentCenter'] = '';
    processedData['isWareHouseConsignment'] = false;
    console.log('ffCenter is Null Object');
}





if (isRealValue(firstConsignment['ffType'])) {
    processedData['fulfilmentType'] = firstConsignment['ffType']['ffType']; // Delivery Type
    processedData['deliveryType'] = firstConsignment['ffType']['type']; // order Type
} else {
    console.log('ffType is Null Object');
}



if (isRealValue(firstConsignment['consignmentHistory'])) {
    var consignmentHistoryArray = firstConsignment['consignmentHistory'];
    if (consignmentHistoryArray.length > 0) {
        var lastObjectIndex = consignmentHistoryArray.length - 1;
        processedData['consignmentStamp'] = consignmentHistoryArray[lastObjectIndex]['time'].split("[")[0];
    }
    if (processedData['deliveryType'] === 'storepick') {
        for (var i = consignmentHistoryArray.length - 1; i >= 0; i--) {
            if (consignmentHistoryArray[i].toState === 'CUSTOMERPICKCOMPLETE') {
                processedData['deliveryDate'] = consignmentHistoryArray[i]['time'].split("[")[0];
            }
        };
    }

} else {
    console.log('Consignment History is Null Object');
}

if (isRealValue(firstConsignment['slaEndTime'])) {
    console.log("slaEndTime is not null");
    console.log(firstConsignment['slaEndTime']);
    var currentTime = new Date().getTime();

    var slaEndTime = firstConsignment['slaEndTime'].split("[")[0];
    var slaEndTimeInMillisecond = new Date(slaEndTime).getTime();
    var countDown = parseInt((slaEndTimeInMillisecond - currentTime) / 1000);
    processedData['countDown'] = countDown;

    if (countDown === 0 || countDown < 0) {
        processedData['countDown'] = -1;
    } else {
        processedData['countDown'] = countDown;
    }


} else {
    processedData['countDown'] = -1;
    console.log("slaEndTime is null");
};

if (processedData['isWareHouseConsignment']) {
    processedData['countDown'] = -1;
}


if (isRealValue(firstConsignment['consignmentStatus'])) {

    var consignmentStatusObj = firstConsignment['consignmentStatus'];
    processedData['consignmentStatus'] = consignmentStatusObj['consignmentStatusToOms'];

    if (!(consignmentStatusObj['consignmentStatus'] === 'ASSIGNED')) {
        processedData['countDown'] = -1;
    }
} else {
    console.log('consignment is Null Object');
}

if (isRealValue(firstConsignment['logisticsDetails'])) {
    var logistic = firstConsignment['logisticsDetails'];
    processedData['shipmentId'] = logistic['airwayBillNumber'];

    if (logistic['deliveryDate'] !== null) {
        console.log("Delivery Date");
        console.log(logistic['deliveryDate']);
        processedData['deliveryDate'] = logistic['deliveryDate'].split("[")[0];
    } else {
        console.log('deliveryDate is Null Object');
    }

} else {
    console.log('logisticsDetails is Null Object');

}

}

return processedData;

};


var consignmentHelperForOrder = function(itemsArrray) {
var processedData = {};
processedData.itemIDsArray = [];
processedData.consignmentValue = 0;
processedData.itemIDsArray = 0;

if (itemsArrray.length !== 0) {

var firstItem = itemsArrray[0];



var itemsProcessedArray = [];

var sumofConsignment = 0;

var discountedsumofConsignment = 0;


var itemIDsArray = [];

for (var item in itemsArrray) {

    itemIDsArray.push(itemsArrray[item]['itemId']);

    sumofConsignment = sumofConsignment + parseInt(itemsArrray[item]['product']['mrp']);
    discountedsumofConsignment = discountedsumofConsignment + parseInt(itemsArrray[item]['itemPricingDetails']['netAmount']);
};

processedData['itemIDsArray'] = itemIDsArray;
processedData['consignmentValue'] = sumofConsignment;
processedData['discountedsum'] = discountedsumofConsignment;

} else {
console.log('items is Null Object');

}
return processedData;
};




var consignmentHelperForFailOrder = function(itemsArrray, storeID, reasonValue) {

var processedDataArray = [];

var returnDataArray = [];

var finalReturnArray = [];


if (itemsArrray.length !== 0) {

for (var item in itemsArrray) {


    var currentProcessing = itemsArrray[item];

    for (var i = currentProcessing['orderItemHistory'].length - 1; i >= 0; i--) {

        // Fullfillment center check 
        if (currentProcessing['orderItemHistory'][i]['ffCenterId'] === storeID) {

            if (currentProcessing['orderItemHistory'][i]['toState'] === 'PICKFAIL' || currentProcessing['orderItemHistory'][i]['toState'] === 'QCFAIL') {

                if (currentProcessing['orderItemHistory'][i]['fromState'] !== 'PICKFAIL' && currentProcessing['orderItemHistory'][i]['fromState'] !== 'QCFAIL') {

                    var currentProcessedObject = {}; // 
                    currentProcessedObject.itemId = currentProcessing.itemId;
                    currentProcessedObject.eanCode = currentProcessing.product.eanCode;
                    currentProcessedObject.consignmentValue = currentProcessing.product.mrp;
                    currentProcessedObject.discountedsum = currentProcessing.itemPricingDetails.netAmount;
                    currentProcessedObject.reason = currentProcessing['orderItemHistory'][i]['toState'];
                    currentProcessedObject.comment = currentProcessing['orderItemHistory'][i]['comment'];
                    processedDataArray.push(currentProcessedObject);
                }
            }

        }



    };

};


for (var i = processedDataArray.length - 1; i >= 0; i--) {


    switch (processedDataArray[i].reason) {
        case 'PICKFAIL':
            // Reason from UI.
            if (reasonValue === "") {

                if (processedDataArray[i].comment != null && processedDataArray[i].comment != '') {
                    if (processedDataArray[i].comment.indexOf("system") > -1) {

                        processedDataArray[i].reason = 'AUTOPICKFAIL';

                    }
                }

                returnDataArray.push(processedDataArray[i]);

            } else if (reasonValue === "PICKFAIL") {

                returnDataArray.push(processedDataArray[i]);

            } else if (reasonValue === "AUTOPICKFAIL") {
                // search in comment Auto
                if (processedDataArray[i].comment != null && processedDataArray[i].comment != '') {
                    if (processedDataArray[i].comment.indexOf("system") > -1) {

                        processedDataArray[i].reason = 'AUTOPICKFAIL';

                        returnDataArray.push(processedDataArray[i]);
                    }
                }
            }
            break;
        case 'QCFAIL':
            if (reasonValue === "" || reasonValue === "QCFAIL") {
                if (processedDataArray[i].comment.indexOf("System") > -1) {} else {
                    returnDataArray.push(processedDataArray[i]);
                }

            }
            break;

    }
};


for (var x = returnDataArray.length - 1; x >= 0; x--) {

    var goinside = true;

    for (var y = finalReturnArray.length - 1; y >= 0; y--) {
        if (
            (finalReturnArray[y].itemId === returnDataArray[x].itemId) &&
            (finalReturnArray[y].reason === returnDataArray[x].reason)) {
            goinside = false; // found
        }
    };
    if (goinside) {
        finalReturnArray.push(returnDataArray[x]);
    }
};

return finalReturnArray;

} else {
console.log('items is Null Object');

}
return finalReturnArray;
};

var get = function(consignmentID, baseOption) { // Called For Order Page


var options = {}; // For passing to Consignment Get As It will not have request body..


_.extend(options, baseOption);


options.path = environment.optimusPrime.domainName + '/consignment/' + consignmentID;



return ConsignmentService.getData(options)
.then(function(response) {


        response = JSON.parse(response);


        if (response.hasOwnProperty('status') == false) {


            var processedData = {};
            processedData = consignmentProcesssingFn(response);

            if (isRealValue(response['consignment'])) {
                var firstConsignment = response['consignment'];
                var instanceProcessedData = {};
                instanceProcessedData = consignmentHelperForOrder(firstConsignment['items']);
                processedData['itemIDsArray'] = instanceProcessedData.itemIDsArray;
                processedData['consignmentValue'] = instanceProcessedData.consignmentValue;
                processedData['discountedsum'] = instanceProcessedData.discountedsum;
            }

            return PaymentService.get(baseOption, processedData['orderId'])
                .then(function(paymentResponse) {
                        if (paymentResponse.isCOD === true) {
                            processedData['paymentType'] = "COD";
                        } else {
                            processedData['paymentType'] = "PREPAID";
                        }
                        return processedData;
                    },
                    function(error) {
                        return processedData;
                    });


        } else {
            return {};
        }

    },
    function(err) {
        return res.status(err.status).send(err);
    });
};

var getForFailOrder = function(consignmentID, baseOption, storeID, reasonValue) { // Called For Order Page


var options = {}; // For passing to Consignment Get As It will not have request body..


_.extend(options, baseOption);


options.path = environment.optimusPrime.domainName + '/consignment/' + consignmentID;



return ConsignmentService.getData(options)
.then(function(response) {


        response = JSON.parse(response);


        if (response.hasOwnProperty('status') == false) {


            var processedData = {};
            processedData = consignmentProcesssingFn(response);

            var arrayProcessedData = [];
            if (isRealValue(response['consignment'])) {
                var firstConsignment = response['consignment'];

                arrayProcessedData = consignmentHelperForFailOrder(firstConsignment['items'], storeID, reasonValue);

                // Copy to array element from processedObject
                for (var i = arrayProcessedData.length - 1; i >= 0; i--) {

                    for (var attrname in processedData) {
                        arrayProcessedData[i][attrname] = processedData[attrname];
                    }

                };
            }

            return PaymentService.get(baseOption, processedData['orderId'])
                .then(function(paymentResponse) {
                        if (paymentResponse.isCOD === true) {
                            for (var i = arrayProcessedData.length - 1; i >= 0; i--) {

                                arrayProcessedData[i]["paymentType"] = "COD";
                            };
                        } else {
                            for (var i = arrayProcessedData.length - 1; i >= 0; i--) {

                                arrayProcessedData[i]["paymentType"] = "PREPAID";
                            };
                        }

                        return arrayProcessedData;
                    },
                    function(error) {
                        return arrayProcessedData;
                    });


        } else {
            return {};
        }

    },
    function(err) {
        return res.status(err.status).send(err);
    });
};

var checkAddressNCustomer = function(customerDetails, addressDetails) {
if (isRealValue(customerDetails) &&
isRealValue(addressDetails) &&
customerDetails['userId'] !== null &&
addressDetails['addressID'] !== null) {
return true;
} else {
return false;
}
};


var getProcessed = function(req, res) { // For Consignment Detail Page

var options = {};

_.extend(options , environment.optimusPrime.options);

options.headers = {
'Authorization': req.headers.authorization
};

var fulfilmentCenterId = 0; // For Admin test

if (!req.headers.isadmin) {
fulfilmentCenterId = req.headers.storeid;
};

var isadmin = req.headers.isadmin;

options.method = "GET";

var baseOptionForAddress = {};
var baseOptionForFFCenter = {};
_.extend(baseOptionForAddress, options);
_.extend(baseOptionForFFCenter, options);

options.path = environment.optimusPrime.domainName + '/consignment/' + req.params.consignmentID;



ConsignmentService.getData(options)
.then(function(response) {

        response = JSON.parse(response);
        var processedData = {};

        // Customer Details

        processedData = ConsignmentHelper.ProcessConsignmentObject(response, baseOptionForAddress, fulfilmentCenterId, isadmin)
            .then(function(finalresponse) {
                res.status(200).send(finalresponse);
            }, function(finalresponse) {
                res.status(200).send(finalresponse);

            });

    },
    function(err) {
            return res.status(err.status).send(err);
        
    });
};

var put = function(req, res) {

var options = {};

_.extend(options , environment.optimusPrime.options);


options.headers = {
'Authorization': req.headers.authorization
};


options.path = environment.optimusPrime.domainName + '/consignment/' + req.params.consignmentID + '/status';


var data = {};


data = req.body;

ConsignmentService.putData(options, data).then(function(response) {
return res.status(200).send(response);
}, function(errorObject) {
    console.log("Error while updating status of consignment => "  + req.params.consignmentID);
    console.log("Request data =>"  + util.inspect(data, false, null));
    console.log("Error response object " + util.inspect(errorObject, false, null));
return res.status(errorObject.status).send(errorObject);
});
};


var getStatus = function(req, res) { // For Consignment Detail Page

var options = {};

_.extend(options , environment.optimusPrime.options);

options.headers = {
'Authorization': req.headers.authorization
};

options.method = "GET";

options.path = environment.optimusPrime.domainName + '/consignment/' + req.params.consignmentID;


ConsignmentService.getData(options)
.then(function(response) {

        response = JSON.parse(response);
        var processedData = {};

        if (isRealValue(response['consignment'])) {

            var firstConsignment = response['consignment'];

            if (isRealValue(firstConsignment['consignmentStatus'])) {

                processedData['consignmentStatus'] = firstConsignment['consignmentStatus']['consignmentStatus'];

            }

        }
        return res.status(200).send(processedData);

    },
    function(err) {
        return res.status(err.status).send(err);
    });
};

var reprintinvoice = function(req, res) {

var options = {};


_.extend(options , environment.optimusPrime.options);


options.headers = {
'Authorization': req.headers.authorization
};

options.method = "GET";

options.path = environment.optimusPrime.domainName + '/consignment/' + req.params.consignmentID + '/reprint';



ConsignmentService.getData(options)
.then(function(response) {

        return res.status(200).send(response);

    },
    function(err) {

        return res.status(err.status).send(err);
    });          
};

var getInvoiceData = function(req,res){
var url = decodeURIComponent(req.params.xyz);
request(url, function (error, response, body) {
if (!error && response.statusCode == 200) {
res.status(response.statusCode).send(body);
}
});
};

var getUserInvoiceInformation = function(req,res){
var options = {};
_.extend(options , environment.optimusPrime.options);
options.headers = {
'Authorization': req.headers.authorization
};
options.method = "GET";
// options.path = 'http://172.16.2.122:8080/api/v1.01/n3ow' + '/custominvoice/' + req.params.consignmentID;
options.path = environment.optimusPrime.domainName + '/custominvoice/' + req.params.consignmentID;
ConsignmentService.getData(options)
.then(function(response) {
        return res.status(200).send(response);
    },
    function(err) {
        return res.status(err.status).send(err);
    });
};
var getUserDataForForm = function(req,res){
var options = {};
_.extend(options , environment.optimusPrime.options);
options.headers = {
'Authorization': req.headers.authorization
};
options.method = "GET";
options.path = environment.optimusPrime.domainName + '/consignmentparams/' + req.params.consignmentID + '/paramGroup/consignment';
ConsignmentService.getData(options)
.then(function(response) {
        return res.status(200).send(response);
    },
    function(err) {
        return res.status(err.status).send(err);
    });
};
var postUserDataForForm = function(req,res){
var options = {};
_.extend(options , environment.optimusPrime.options);

options.headers = {
'Authorization': req.headers.authorization
};

console.log(req.body);
options.path = environment.optimusPrime.domainName + '/consignment/' + req.params.consignmentId + '/consignmentparams';

ConsignmentService.postData(options, req.body).
then(function(response) {
res.status(200).send(response);
}, function(errorObject) {
console.log("Error while selecting data for consignment id => "  + req.params.consignmentID);
console.log("Error object " + util.inspect(errorObject, false, null));
res.status(errorObject.status).send(errorObject);
});
};

exports.get = get;
exports.put = put;
exports.getProcessed = getProcessed;
exports.getStatus = getStatus;
exports.getForFailOrder = getForFailOrder;
exports.reprintinvoice = reprintinvoice;
exports.getUserDataForForm = getUserDataForForm;
exports.postUserDataForForm = postUserDataForForm;
exports.getUserInvoiceInformation = getUserInvoiceInformation;
exports.getInvoiceData = getInvoiceData;

