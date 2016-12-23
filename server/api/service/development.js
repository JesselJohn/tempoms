'use strict';

var _ = require('lodash');
var https = require('https');
var config = require('../../config');
var querystring = require('querystring');
var q = require('q');
var retry = require('retry');
var fs = require('fs');
var util = require('util');

var sslRootCAs = require('ssl-root-cas');
sslRootCAs.inject().addFile('./certi.crt');

var putData = function(options, data) {

    var option = options;
    var body = '';
    var deferred = q.defer();

    var sendData = '';

    sendData = JSON.stringify(data);

    option.headers['Content-Length'] = sendData.length;
    option.headers['Content-Type'] = "application/json";
    option.method = "PUT";

    var request = https.request(option, function(response) {


        response.on('data', function(chunk) {
            body += chunk;
        });

        response.on('end', function() {

            if (request.res.statusCode >= 500 && request.res.statusCode < 600) {

                console.log("Server error Log For PUT>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + request.res.statusCode);
                console.log("Time of response :" + new Date());
                console.log(options);
                console.log(data);

            }

            if (request.res.statusCode >= 200 && request.res.statusCode < 299) {
                deferred.resolve(body);
                
            } else {
                if (request.res.statusCode >= 500 && request.res.statusCode < 600) {
                    var returnBody = {
                        body: body,
                        status: 299
                    };
                    console.log("5xx error retrun response" + util.inspect(returnBody, false, null));
                    console.log(options);
                    console.log("---------------------------------------");

                } else {
                    var returnBody = {
                        body: body,
                        status: request.res.statusCode
                    };
                }
                deferred.reject(returnBody);
            }
        });

    }).on('error', function(e) {
        var returnBody = {
            body: e,
            status: 400
        };
        deferred.reject(returnBody);
    });

    request.write(sendData);
    request.end();
    return deferred.promise;
};

var getData = function(options) {

    var operation = retry.operation();
    var deffered = q.defer();
    try {
        var body = '';
        var getrequest = https.request(options, function(response) {
            response.on('data', function(chunk) {
                body += chunk;
            });
            response.on('end', function() {

                if (getrequest.res.statusCode >= 500 && getrequest.res.statusCode < 600) {

                    console.log("Server error Log For GET>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + getrequest.res.statusCode);
                    console.log("Time of error response :" + new Date());
                    //console.log(options);

                }


                if (getrequest.res.statusCode === 200 || getrequest.res.statusCode === 304) {
                    /*console.log("========================= :" + new Date());
                    console.log(options);*/
                    deffered.resolve(body);

                } else {
                    if (getrequest.res.statusCode >= 500 && getrequest.res.statusCode < 600) {
                        var returnBody = {
                            body: body,
                            status: 299
                        };

                        console.log("5xx error retrun response" + returnBody);
                        console.log(options);
                        console.log("---------------------------------------");

                    } else {
                        var returnBody = {
                            body: body,
                            status: getrequest.res.statusCode
                        };
                    }


                    deffered.reject(returnBody);
                }

            });
        }).on('error', function(err) {

            var returnBody = {
                body: err,
                status: 400
            };
            deffered.reject(returnBody);
        });
    } catch (err) {
        var returnBody = {
            body: err,
            status: 400
        };
        deffered.reject(returnBody);
    };

    getrequest.write("");
    getrequest.end();
    return deffered.promise;
};

var postData = function(options, data) {

    var option = options;
    var body = '';
    var deferred = q.defer();

    var sendData = '';

    sendData = JSON.stringify(data);

    option.headers['Content-Length'] = sendData.length;
    option.headers['Content-Type'] = "application/json";
    option.method = "POST";

    var request = https.request(option, function(response) {



        response.on('data', function(chunk) {
            body += chunk;
        });


        response.on('end', function() {

            if (request.res.statusCode >= 500 && request.res.statusCode < 600) {

                console.log("Internatl server Log for post>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + request.res.statusCode);
                console.log("Time of response :" + new Date());
                console.log(options);
                console.log(data);

            }
            if (request.res.statusCode >= 200 && request.res.statusCode < 299) {
                deferred.resolve(body);
            } else {
                if (request.res.statusCode >= 500 && request.res.statusCode < 600) {
                    var returnBody = {
                        body: body,
                        status: 299
                    };

                    console.log("5xx error retrun response" + returnBody);
                    console.log(options);
                    console.log("---------------------------------------");

                } else {
                    var returnBody = {
                        body: body,
                        status: request.res.statusCode
                    };
                }
                deferred.reject(returnBody);
            }

        });

    }).on('error', function(e) {
        var returnBody = {
            body: e,
            status: request.res.statusCode
        };
        deferred.reject(returnBody);
    });

    request.write(sendData);
    request.end();
    return deferred.promise;
};


var deleteData = function(options) {

    options.method = "DELETE";

    var sendData = '';
    var deffered = q.defer();
    try {
        var body = '';
        var request = https.request(options, function(response) {
            //console.log(response.status);
            response.on('data', function(chunk) {
                body += chunk;
            });
            response.on('end', function() {

                if (request.res.statusCode >= 500 && request.res.statusCode < 600) {

                    console.log("Log for 500 internal server error for delete>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + request.res.statusCode);
                    console.log("Time of response :" + new Date());
                    console.log(options);

                }

                if (request.res.statusCode >= 200 && request.res.statusCode < 299) {
                    deffered.resolve(body);
                } else {
                    if (request.res.statusCode >= 500 && request.res.statusCode < 600) {
                        var returnBody = {
                            body: body,
                            status: 299
                        };
                    } else {
                        var returnBody = {
                            body: body,
                            status: request.res.statusCode
                        };

                        console.log("5xx error retrun response" + returnBody);
                        console.log(options);
                        console.log("---------------------------------------");


                    }
                    deffered.reject(returnBody);
                }
            });
        }).on('error', function(err) {
            var returnBody = {
                body: err,
                status: 400
            };
            deffered.reject(returnBody);
        });
    } catch (err) {
        var returnBody = {
            body: err,
            status: 400
        };
        deffered.reject(returnBody);
    };

    request.write(sendData);
    request.end();
    return deffered.promise;
};


exports.getData = getData;
exports.putData = putData;
exports.deleteData = deleteData;
exports.postData = postData;
