var _ = require('lodash');
var environment = require('../../config/environment');
var AddressService = require('../service');

var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};

var get = function(baseOption, payload) {

    var options = {};
    
    _.extend(options , baseOption);

    options.path = environment.myaccount.domainName + '/' + payload.userId + '/address/shippingaddress/' + payload.addressID;


    return AddressService.getData(options)
        .then(function(response) {
            console.log(response);
                response = JSON.parse(response);
                var addressDetails = {};
                if (response.hasOwnProperty('name')) {

                    addressDetails['name'] = response.name;
                    addressDetails['firstLine'] = response.firstLine;
                    addressDetails['secondLine'] = response.secondLine;
                    addressDetails['landmark'] = response.landmark;
                    addressDetails['city'] = response.city;
                    addressDetails['state'] = response.state;
                    addressDetails['country'] = response.country;
                    addressDetails['pincode'] = response.pincode;
                    addressDetails['mobileNumber'] = response.mobileNumber;

                    return addressDetails;
                } else {
                    return addressDetails;
                }

            },
            function(err) {
                console.log(err);
                return { error: err };
            });
};


exports.get = get;
