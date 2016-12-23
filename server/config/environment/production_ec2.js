'use strict';

// Production specific configuration
// =================================
module.exports = {
    // Server IP
    ip: process.env.OPENSHIFT_NODEJS_IP ||
        process.env.IP ||
        undefined,

    // Server port
    port: process.env.OPENSHIFT_NODEJS_PORT ||
        process.env.PORT ||
        8080,

    // MongoDB connection options
    mongo: {
        uri: process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL +
            process.env.OPENSHIFT_APP_NAME ||
            'mongodb://localhost/lms'
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

    // environment config
    optimusPrime: {

        domainName: '/oms',
        options: {
            host: "kong.ailiens.com",
            port: 8443
        }
    },
    myaccount: {
        domainName: '/account',
        options: {
            host: "kong.ailiens.com",
            port: 8443
        }
    },
    ando: {
        domainName: '/ando',
        options: {
            host: "kong.ailiens.com",
            port: 8443
        }
    },
    nodeUser : {
        credentials: {
            username: 'NODE_USER',
            password: 'NODE_PASSWORD'
        }
    },

    keycloackURL : {
        accessTokenGenerate: '/realms/{realm}/tokens/grants/access',
        validateAccessToken: '/realms/{realm}/tokens/validate?'
    }
};
