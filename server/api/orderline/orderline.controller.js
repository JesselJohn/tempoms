'use strict';
var _ = require('lodash');
var ItemService = require('../service');
var environment = require('../../config/environment');
// Update the Items 
var post = function(req, res) {

    var options = {};

    _.extend(options , environment.optimusPrime.options);


    options.headers = {
      'Authorization': req.headers.authorization
    };

    
    options.path = environment.optimusPrime.domainName 
        + '/orderitem/' + req.params.orderlineId + '/status';

    options.method = 'POST';

    var data = {};

    
    data = req.body.orderLines;
    
    
    ItemService.postData(options , data).then(function(response) {
        return res.status(200).send(response);
    }, function(errorObject) {
        return res.status(errorObject.status).send(errorObject);
    });
};


exports.post = post;
