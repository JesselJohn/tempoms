var https = require('https');
var q = require('q');
var util = require('util');
var request = require('request');
var retry = require('retry');
var environment = require('../../config/environment');

var loggerFunction = function(options, getrequest, returnBody) {
    console.log("Server error Log For -" + options.method + ">>>>>>>>>>>>" + getrequest.res.statusCode);
    console.log("Time of error response :" + new Date());
    console.log(options);
    console.log("5xx error retrun response" + util.inspect(returnBody, false, null));
};


var tryAgain = function(getrequest, body ,operation , options) {
    
    if ((getrequest.res.statusCode >= 200 && getrequest.res.statusCode < 299) || getrequest.res.statusCode === 304) {
         return {"body"  : body ,"resolve" :true }
    } else {
        if (getrequest.res.statusCode >= 500 && getrequest.res.statusCode < 600) {
            var returnBody = {
                body: body,
                status: 299
            };
            loggerFunction(new Object(options), new Object(getrequest), new Object(returnBody));
        } else {
            var returnBody = {
                body: body,
                status: getrequest.res.statusCode
            };
        }

        return {"body"  : returnBody ,"resolve" :false };
       
    }
}

var callFunction = function(options, sendData) {
    
    var operation = retry.operation(environment.retryconfiguration);

    var deffered = q.defer();
    operation.attempt(function(currentAttempt) {

        
        var body = '';
        var getrequest = https.request(options, function(response) {
            // Collect all chuncks
            response.on('data', function(chunk) {
                body += chunk;
            });

            // When everythings got collected
            // Here to check 
            // 1. If 5XX error than retry (it means do not exit from attempt function)
            // 2. If 401 Unauthoirsed than fetch and set new keycloak token and try again
            // If error than try again
            // If everything success than return from attempt function (if u return it will not try again)
            response.on('end', function() {
            var  tempdata = tryAgain(getrequest, body , operation , options);
            tempdata.resolve ? deffered.resolve(tempdata.body): deffered.reject(tempdata.body);
            });
        }).on('error', function(err) {

            var returnBody = {
                body: err,
                status: 400
            };
            deffered.reject(returnBody);
        });
        getrequest.write(sendData);
        getrequest.end();

    });
    
    return deffered.promise;

};

exports.serviceFunction = callFunction;
