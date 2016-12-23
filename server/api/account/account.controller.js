'use strict';

var _ = require('lodash');
var environment = require('../../config/environment');
var AccountService = require('../service');
var AccountHelper = require('../Helper/account.helper.js');
var q = require('q');

var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};

var get = function(request, res) {

    var options = {};
    
    _.extend(options , environment.myaccount.options);

    options.headers = {
        'Authorization': request.headers.authorization
    };


    options.path = environment.myaccount.domainName;

    options.method = "GET";


    AccountService.getData(options).then(function(response) {

        response = JSON.parse(response);

        var data = {};

        if (response.length === 1) {

            var firstObject = response[0];

            if (isRealValue(firstObject['ailStaff'])) {
                data.storeID = firstObject['ailStaff'].storeID;
                data.isadmin = false;
            }
            return res.status(200).send(data);
        } else if (response.length === 0) {
            return res.status(404).send({ status: 'Not found' });
        } else {

            data.isadmin = true;
            return res.status(200).send(data);
        }

    }, function(error) {
        return res.status(error.status).send(error);
    });



};

var fetchAccount = function(request) {

    var options = {};
    
    _.extend(options , environment.myaccount.options);
    

    options.headers = {
        'Authorization': request.headers.authorization
    };


    options.path = environment.myaccount.domainName;

    options.method = "GET";


    // No retry for this service
    
    return AccountService.getData(options).then(function(response) {

        response = JSON.parse(response);

        var data = {};

        if (response.length === 1) {

            var firstObject = response[0];

            if (isRealValue(firstObject['ailStaff'])) {
                data.storeID = firstObject['ailStaff'].storeID;
                data.isadmin = false;
            }

            return data;
        } else if (response.length === 0) {
            return { status: 'not-found' };
        } else {

            data.isadmin = true;
            return data;
        }

    }, function(error) {
       
        return q.reject(error);
    });

};





exports.get = get;
exports.fetchAccount = fetchAccount;
