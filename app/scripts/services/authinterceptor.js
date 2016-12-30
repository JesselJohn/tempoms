'use strict';

! function(window, angular, undefined) {
    angular.module('omsieApp')
        .factory('AuthInterceptor', ['$rootScope', '$q', '$cookieStore', '$location',
            function($rootScope, $q, $cookieStore, $location) {
                return {
                    request: function(config) {
                        var deferred = $q.defer();

                        config.headers = config.headers || {};
                        /**
                         * Temporary
                         */
                        config.headers.Authorization = 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiIwODY2MGExNi0wZjI4LTRkNTAtYjdiMi04NmM5YTZlYjc3MDYiLCJleHAiOjE0ODMxMjQyMzMsIm5iZiI6MCwiaWF0IjoxNDgzMDM3ODMzLCJpc3MiOiJodHRwczovL2tleWNsb2FrLXFhLmFpbGllbnMuY29tL2F1dGgvcmVhbG1zL0FJTFNlY3VyZVFBIiwiYXVkIjoiT3B0aW11c1ByaW1lVUkiLCJzdWIiOiI0ZGU3NTBjZi0xNzU1LTQ5N2MtYTdjNC0zYmI2YmU2MDI3ODgiLCJhenAiOiJPcHRpbXVzUHJpbWVVSSIsInNlc3Npb25fc3RhdGUiOiIzNmUwOTUzNi00MzQwLTQ0YzMtYjc1Yi0yYjBjMGE1MjY5NzMiLCJjbGllbnRfc2Vzc2lvbiI6ImQ5NTYwMjc2LTI2ZWUtNDY5Mi04NWEyLTE1ZWJjMmNkOTI1YSIsImFsbG93ZWQtb3JpZ2lucyI6WyIiLCJodHRwczovL29wLXFhLTEwODgyOTkxMzYudXMtZWFzdC0xLmVsYi5hbWF6b25hd3MuY29tIiwiaHR0cDovL2xvY2FsaG9zdDozMDAzIiwiaHR0cHM6Ly9vcHRpbXVzcHJpbWV1aS1xYS5haWxpZW5zLmNvbSIsImh0dHA6Ly9vcHRpbXVzcHJpbWV1aS1xYS5haWxpZW5zLmNvbSIsImh0dHA6Ly9vcHRpbXVzcHJpbWV1aS1kZXYuYWlsaWVucy5jb20iLCJodHRwczovL29wdGltdXNwcmltZXVpLWVudi51cy1lYXN0LTEuZWxhc3RpY2JlYW5zdGFsay5jb20iLCJodHRwczovL29wdGltdXNwcmltZXVpLWRldi5haWxpZW5zLmNvbSIsImh0dHA6Ly9sb2NhbGhvc3Q6OTAwMCIsImh0dHBzOi8vb3AtcWEuYWlsaWVucy5jb20iXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfTE1TX0FETUlOIiwiT01TX1VJX0FETUlOIiwiUk9MRV9PTVNfQURNSU4iLCJST0xFX1NISUVMRCIsIlJPTEVfQUlMX1NUQUZGIiwiREVGRU5ERVJTX0FETUlOIiwiT01TX1VJX0ZJTkFOQ0UiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50Iiwidmlldy1wcm9maWxlIl19fSwibmFtZSI6IiIsInByZWZlcnJlZF91c2VybmFtZSI6Im9tc2FkbWluMjA3IiwiZmFtaWx5X25hbWUiOiIiLCJlbWFpbCI6Im9tc2FkbWluQGdtYWlsLmNvbSJ9.gbD0kLcglQQSPGUQM_KpCB_gUrvKL5EieNghtLkIBZiSXuuJ0bwPBEWFfWODOhB6hIJd2J-0u4DCpS7Q-0h3XWN3YzXCS9caR0MBIW6C1nMQUkton28hH5vZnRiRgBOEVtvrA-URqvDhyiPzNACGSDJgEQHcjqb02stDChfut6CL7jl7jSRPx1zvPLEYIzkOQCTNqgFRqHYpU3EgTil3YuGDM9JMl4XtDQqJyIT3VDnPA3gHvgApRAEAPrmbVoE13SPjNpCgDRDfw6UkT21Yeo_PZCv5xeHn3GbQ-wlCG1k3E5jy98rzri08lTAWJGldu9s1ngJPrlcOn4OIgBP1XA';

                        if (config.url.indexOf(omsconfig.backend) === -1) {
                            // if ($rootScope.roles['OMS_UI_ADMIN'] ||
                            //     $rootScope.roles['ROLE_OMS_ADMIN'])
                            if (true) {
                                console.log("OMS ADMINS>>>>" + config.url);
                                config.headers.isadmin = true;
                            } else {
                                console.log("OMS NORMAL USER>>>>" + config.url);
                                config.headers.isadmin = false;
                            }
                        } else {
                            console.log("LMS >>>>" + config.url);
                        }

                        deferred.resolve(config);
                        return deferred.promise;

                        /**
                         * Bypassed
                         */
                        if (keycloak.authenticated) {
                            keycloak.updateToken(50).success(function(refreshed) {
                                if (refreshed) {
                                    console.debug('Token Refreshed');
                                } else {
                                    console.debug('Existing Token Valid');
                                }

                                config.headers.Authorization = 'Bearer ' + keycloak.token;
                                deferred.resolve(config);
                            }).error(function() {
                                deferred.reject({});
                                keycloak.logout({
                                    'redirectUri': window.location.origin
                                });
                            });
                        } else {
                            deferred.reject({});
                            keycloak.logout({
                                'redirectUri': window.location.origin
                            });
                        }

                        return deferred.promise;
                    },
                    response: function(response) {
                        if (response.status === 299) {
                            return $q.reject(response);
                        } else {
                            return $q.when(response);
                        }
                    },
                    // Intercept 401s and redirect to login
                    responseError: function(response) {
                        if (response.status === 401) {
                            keycloak.logout({
                                'redirectUri': window.location.origin
                            });

                            return $q.reject(response);
                        } else if (response.status === 403 || response.status === 400 || (response.status >= 500 && response.status < 600)) {
                            var headers = response.headers();
                            if (headers.failure) {
                                var res = angular.extend({}, response);
                                res.data = {};
                                res.data.error = headers.failure;
                                return $q.reject(res);
                            }
                            return $q.reject(response);
                        } else {
                            return $q.reject(response);
                        }
                    }
                };
            }
        ]);
}(window, angular);
