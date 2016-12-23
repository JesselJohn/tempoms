import config from '../config/environment';
import keycloakconfig from '../config/keycloak.script.json'

var q = require('q');
var _ = require('lodash');
var querystring = require('querystring');
var request = require('request');

var token ;  ///Try to use again same token if 401 came than fetch and reset...



var fetchAccessToken = function() {

    var url = keycloakconfig['auth-server-url'] + (config.keycloackURL.accessTokenGenerate).replace('{realm}', keycloakconfig.realm);

    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    var userName = config.nodeUser.credentials.username;
    var password = config.nodeUser.credentials.password;

    var requestBody = {
        "username": userName,
        "password": password,
        "client_id": keycloakconfig.resource
    };

    var options = {
        uri: url,
        body: querystring.stringify(requestBody),
        headers: headers

    };

    var deffered = q.defer();

    request.post(options, function(err, res, data) {
        if (err) {
            return deffered.reject(err);
        } else {
            return deffered.resolve(JSON.parse(data).access_token);
        }
    });
   
    return deffered.promise;


};


var fetchNodeAccessToken = function() {

    try {
        return fetchAccessToken().then(function(accessToken) {
            token = "Bearer " + accessToken;
            return token;
        }, function(error) {
            return q.reject({});
        });
    } catch (err) {
        return q.reject({});
    };

};

exports.fetchNodeAccessToken = fetchNodeAccessToken;
