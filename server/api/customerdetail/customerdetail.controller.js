'use strict';
var _ = require('lodash');
var environment = require('../../config/environment');
var AccountService = require('../service');
var AccountHelper = require('../Helper/account.helper.js');
var q = require('q');

var get = function(request, res) {

    var options = {};


    _.extend(options , environment.myaccount.options);
    

    options.headers = {
        'Authorization': request.headers.authorization
    };
    
    var query = encodeURIComponent(request.params.customername);
    
    options.path = environment.myaccount.domainName + "/search?fullName=" + query;

    options.method = "GET";


    AccountService.getData(options).then(function(response) {

        var data = [];
        response = JSON.parse(response);
        data = AccountHelper.getCustomerArray(response);
        
        return res.status(200).send(data);


    }, function(error) {
        return res.status(404).send(error);
    });

};

exports.get = get;
