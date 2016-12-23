'use strict';


! function(window, angular, undefined) {
    angular.module('omsieApp')
        .factory('AuthInterceptor', ['$rootScope', '$q', '$cookieStore', '$location',
            function($rootScope, $q, $cookieStore, $location) {
                return {
                    request: function(config) {
                        var deferred = $q.defer();

                        config.headers = config.headers || {};
                        if (config.url.indexOf(omsconfig.backend) > -1) {
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
