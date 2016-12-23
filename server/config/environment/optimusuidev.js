'use strict';

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://localhost/lms-dev'
    },
    sequelize: {
        uri: 'sqlite://',
        options: {
            logging: false,
            storage: 'dev.sqlite',
            define: {
                timestamps: false
            }
        }
    },

    seedDB: true,
    // environment config

    optimusPrime: {
        domainName: '/oms',
        options: {
            host: "kong-qa.ailiens.com",
            port: 8443
        }
    },
    myaccount: {
        domainName: '/account',
        options: {
            host: "kong-qa.ailiens.com",
            port: 8443
        }
    },
    ando: {
        domainName: '/ando',
        options: {
            host: "kong-qa.ailiens.com",
            port: 8443
        }
    },
    bumbleBee: {
        url: "https://kong.ailiens.com:8443",
        apiversion: '/oms/v1',
        options: {
            host: "kong-qa.ailiens.com",
            port: 8443
        }
    },

    nodeUser: {
        credentials: {
            username: 'NODE_USER',
            password: 'NODE_PASSWORD'
        }
    },

    retryconfiguration: {
        retries: 5
    },

    keycloackURL: {
        accessTokenGenerate: '/realms/{realm}/tokens/grants/access',
        validateAccessToken: '/realms/{realm}/tokens/validate?'
    }

};
