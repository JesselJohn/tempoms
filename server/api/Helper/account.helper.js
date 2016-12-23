'use strict';

var _ = require('lodash');

var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};

var getCustomerArray = function(response) {

    var processedArray = [];
    var processedObject = {};
    var currentObject = {};

    for (var i = response.length - 1; i >= 0; i--) {
        currentObject = response[i];
        processedObject = {};

        processedObject.id = currentObject.id;
        if(isRealValue(currentObject.userInfo)) {
            var userInfo = response[i].userInfo
            processedObject.lastName = userInfo.lastName;
            processedObject.firstName = userInfo.firstName + ' ';
            if(userInfo.lastName!==null){
                processedObject.firstName += userInfo.lastName;
            };
            processedObject.middleName = userInfo.middleName;
        }
        // Push only if type is CUSOTMER
        if(currentObject.typeOfUser==='CUSTOMER'){
            processedArray.push(processedObject);
        }
        
    };

    return processedArray;
};


exports.getCustomerArray = getCustomerArray;
