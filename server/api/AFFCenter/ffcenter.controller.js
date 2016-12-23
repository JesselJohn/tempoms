var _ = require('lodash');
var environment = require('../../config/environment');
var FFCenterService = require('../service');

var isRealValue = function(obj) {
    return obj && obj !== "null" && obj !== "undefined";
};

var get = function(baseOption, fcId) {

    var options = {};

    _.extend(options, baseOption);

    options.path = environment.ando.domainName + '/fCDetailss/getFcId?fcId=' + fcId;




    return FFCenterService.getData(options)
        .then(function(response) {

                response = JSON.parse(response);

                var ffCenter = {};
                if (isRealValue(response)) {
                    ffCenter['fcId'] = response.fcId;
                    ffCenter['fcName'] = response.fcName;
                    ffCenter['streetNo'] = response.streetNo;
                    ffCenter['streetName'] = response.streetName;
                    ffCenter['town'] = response.town;
                    ffCenter['city'] = response.city;
                    ffCenter['state'] = response.state;
                    ffCenter['cinNo'] = response.cinNo;
                    ffCenter['tinNo'] = response.tinNo;
                    ffCenter['entityType'] = response.entityType;
                    ffCenter['panNo'] = response.panNo;
                    ffCenter['pincode'] = response.postCode;
                    ffCenter['soldBy'] = response.soldBy;
                    if (isRealValue(response.entityType)) {
                        ffCenter['entityType'] = response.entityType.entityType;
                    } else {
                        console.log("entityType is null");
                    }
                } else {
                    console.log("fullfillment object is null");
                }

                return ffCenter;


            },
            function(err) {
                console.log(err);

                return { error: "Not Found" };
            });
};


exports.get = get;
