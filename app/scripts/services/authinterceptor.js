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
                        config.headers.isadmin = true;
                        config.headers.Authorization = 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI5OWU5OTBmYi1lNzVhLTRmMmMtYWI2ZC00YzQyYmVjMjI1MTUiLCJleHAiOjE0ODMwMjA0MzUsIm5iZiI6MCwiaWF0IjoxNDgyOTM0MDM1LCJpc3MiOiJodHRwczovL2tleWNsb2FrLXFhLmFpbGllbnMuY29tL2F1dGgvcmVhbG1zL0FJTFNlY3VyZVFBIiwiYXVkIjoiT3B0aW11c1ByaW1lVUkiLCJzdWIiOiI0ZGU3NTBjZi0xNzU1LTQ5N2MtYTdjNC0zYmI2YmU2MDI3ODgiLCJhenAiOiJPcHRpbXVzUHJpbWVVSSIsInNlc3Npb25fc3RhdGUiOiJiMWQ2NTIxYS1jN2ZmLTQwMDktODVmMC0yZTc4YzZhZmFhMjMiLCJjbGllbnRfc2Vzc2lvbiI6IjI0NzA5MTI4LTJhZDQtNGI0MC05ZDk2LWEwNDI4NWQ1MDc2NSIsImFsbG93ZWQtb3JpZ2lucyI6WyIiLCJodHRwczovL29wLXFhLTEwODgyOTkxMzYudXMtZWFzdC0xLmVsYi5hbWF6b25hd3MuY29tIiwiaHR0cDovL2xvY2FsaG9zdDozMDAzIiwiaHR0cHM6Ly9vcHRpbXVzcHJpbWV1aS1xYS5haWxpZW5zLmNvbSIsImh0dHA6Ly9vcHRpbXVzcHJpbWV1aS1xYS5haWxpZW5zLmNvbSIsImh0dHA6Ly9vcHRpbXVzcHJpbWV1aS1kZXYuYWlsaWVucy5jb20iLCJodHRwczovL29wdGltdXNwcmltZXVpLWVudi51cy1lYXN0LTEuZWxhc3RpY2JlYW5zdGFsay5jb20iLCJodHRwczovL29wdGltdXNwcmltZXVpLWRldi5haWxpZW5zLmNvbSIsImh0dHA6Ly9sb2NhbGhvc3Q6OTAwMCIsImh0dHBzOi8vb3AtcWEuYWlsaWVucy5jb20iXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfTE1TX0FETUlOIiwiT01TX1VJX0FETUlOIiwiUk9MRV9PTVNfQURNSU4iLCJST0xFX1NISUVMRCIsIlJPTEVfQUlMX1NUQUZGIiwiREVGRU5ERVJTX0FETUlOIiwiT01TX1VJX0ZJTkFOQ0UiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50Iiwidmlldy1wcm9maWxlIl19fSwibmFtZSI6IiIsInByZWZlcnJlZF91c2VybmFtZSI6Im9tc2FkbWluMjA3IiwiZmFtaWx5X25hbWUiOiIiLCJlbWFpbCI6Im9tc2FkbWluQGdtYWlsLmNvbSJ9.CYnDzMSYY0IaOzTJ_QfZX_TZrAnvv41huyO4dHmTIcaLwsaAfmonX3dx-qSWoM0mkALweHQiLNPuc9MwQ4ld0UHxAMFTHan-ciQ5Lu1ZXp_WHIdEmc9X-sxPIyvvcVHO1aSi_TV8-OFzSv3NCEkwE6anqPvHxXFim_XU8OKwsGGiuuKJ14Xb20zDZrbdCWeKw4urTXHGfCpNr1dR9q5D2plZLD04UXBok8TGFFegtOAR4s9-ildcJzEBqUyJ3sy3coRFt_uqt3vNBl4wXRPfxTWxl2glYDjowQkxB8raPzmz2MdTYCWsKZwFUskTsFS82ZraV21ZJgtr2FUZXKBZAg';
                        deferred.resolve(config);
                        return deferred.promise;

                        /**
                         * ByPassed
                         */
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
