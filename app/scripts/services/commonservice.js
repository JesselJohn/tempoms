'use strict';

/**
 * @ngdoc service
 * @name omsieApp.CommonService
 * @description
 * # CommonService
 * Factory in the omsieApp.
 */
angular.module('omsieApp')
    .factory('CommonService', function() {
        var CommonService = {
            hasQueryParameters: hasQueryParametersFn,
            getURLWithQueryParams: getURLWithQueryParamsFn
        };

        ///////////////
        // Functions //
        ///////////////

        /** 
         * Check if URL already has query parameters
         * @param  {String}  url URL to check for query parameters
         * @return {Boolean}
         */
        function hasQueryParametersFn(url) {
            return /\?.*\=/.test(url);
        }

        /** 
         * Return URL with query parameters appended to url passed to function
         * @param  {String} url URL to with query parameters will be appended
         * @param  {Object} obj Object of query parametes Key-Value pair
         * @return {String}     URL with appended query parameters
         */
        function getURLWithQueryParamsFn(url, obj) {
            var urlHasQueryParams = hasQueryParametersFn(url);
            angular.forEach(obj, function(value, key) {
                if (value !== undefined &&
                    value !== null &&
                    value.replace(/\s/g, "") !== "") {
                    url += urlHasQueryParams ?
                        "&" + key + "=" + value :
                        "?" + key + "=" + value;
                    urlHasQueryParams = true;
                }
            });

            return url;
        };

        return CommonService;
    });
