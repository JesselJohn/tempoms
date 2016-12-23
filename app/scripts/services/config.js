'use strict';
var config = config || {},
    omsconfig = omsconfig || {},
    getconfig = function() {
        switch (window.location.hostname) {
            case 'localhost':
                return {
                    'backend': 'http://localhost:4000'
                };
                break;
            case 'optimusprimeui-env.us-east-1.elasticbeanstalk.com':
                return {
                    'backend': 'https://kong-qa.ailiens.com:8443/bumblebee'
                };
                break;
            case 'optimusprimeui-qa.ailiens.com':
                return {
                    'backend': 'https://kong-qa.ailiens.com:8443/bumblebee'
                };
                break;
            case 'optimusprimeui-qa.ailiens.com':
                return {
                    'backend': 'https://kong-qa.ailiens.com:8443/bumblebee'
                };
                break;
            default:
                return {
                    "backend": 'https://kong.ailiens.com:8443/bumblebee'
                };
                break;
        };
    };

config = omsconfig = getconfig();

config.pincode = {
    uploadUrl: '/api/upload/dest_pincodes/',
    fields: [{
        id: "id",
        name: "Id",
        searchable: false,
        editable: false,
        hideInAdd: true
    }, {
        id: 'pincode',
        name: "Pincode",
        searchable: true,
        editable: false,
        fieldName: 'pincode',
        validate: {
            pattern: /^[1-9][0-9]{5}$/,
            maxlength: 6,
            minlength: 6
        },
        type: 'autoCompleteSearch',
        function: 'getPincodes'
    }, {
        id: 'pincode_country',
        name: 'Country',
        editable: false,
        searchable: true,
        type: 'dropdown',
        data: 'countries',
        fieldName: 'name',
        searchField: 'id'
    }, {
        id: 'pincode_state',
        name: 'State',
        editable: false,
        searchable: true,
        type: 'dropdown',
        fieldName: 'code',
        data: 'states',
        searchField: 'id',
        onChange: 'stateChange'
    }, {
        id: 'pincode_city',
        name: 'City',
        editable: false,
        searchable: true,
        type: 'dropdown',
        data: 'cities',
        fieldName: 'name',
        searchField: 'id'
    }, {
        id: 'pincode_area',
        name: 'Area',
        editable: false,
        searchable: true,
        type: 'dropdown',
        data: 'area',
        fieldName: 'name',
        searchField: 'id'
    }, {
        id: 'areacity_code',
        name: 'Area City Code',
        editable: false,
        searchable: true,
        fieldName: 'code',
        type: 'dropdown',
        data: 'areacitycode',
        searchField: 'id',
        validate: {
            pattern: /^[a-zA-Z]*$/
        }
    }, {
        id: 'pincode_region',
        name: 'Region ',
        editable: true,
        searchable: true,
        type: 'dropdown',
        fieldName: 'name',
        data: 'regions',
        searchField: 'id'
    }, {
        id: 'dest_cluster',
        name: 'Destination Cluster',
        type: 'dropdown',
        fieldName: 'name',
        editable: true,
        searchable: true,
        data: 'clusters',
        searchField: 'id'
    }]
};
config.destcluster = {
    uploadUrl: '/api/upload/dest_clusters/',
    fields: [{
        id: 'id',
        name: 'Cluster Code',
        editable: false,
        searchable: false,
        hideInAdd: true
    }, {
        id: 'name',
        name: 'Name',
        editable: true,
        searchable: true,
        validate: {
            pattern: /^[a-zA-Z\s]*$/
        }
    }, {
        id: 'description',
        name: 'Description',
        editable: true,
        searchable: false
    }]
};
config.sourcecluster = {
    uploadUrl: '/api/upload/source_clusters/',
    fields: [{
        id: 'id',
        name: 'Cluster Code',
        editable: false,
        searchable: false,
        hideInAdd: true
    }, {
        id: 'name',
        name: 'Name',
        editable: true,
        searchable: true,
        validate: {
            pattern: /^[a-zA-Z\s]*$/
        }
    }, {
        id: 'description',
        name: 'Description',
        editable: true,
        searchable: false
    }]
};
config.fulfill = {
    uploadUrl: '/api/upload/fulfillment_center/',
    fields: [{
            id: 'id',
            name: 'ID',
            editable: false,
            searchable: false,
            hideInAdd: true
        }, {
            id: 'fcid',
            name: 'Fullfilment ID',
            editable: false,
            searchable: true,
            validate: {
                pattern: /^[a-zA-Z0-9]*$/
            }
        }, {
            id: 'name',
            name: 'Center Name',
            editable: true,
            searchable: true,
            validate: {
                pattern: /^[a-zA-Z0-9\s\-]*$/
            }
        }, {
            id: 'contactName',
            name: 'Contact Name',
            editable: false,
            searchable: true,
        }, {
            id: 'phoneNumber',
            name: 'Phone Number',
            editable: false,
            searchable: true,
            validate: {
                pattern: /^[0-9\/\-]*$/
            }
        }, {
            id: 'geoLatitude',
            name: 'Latitude',
            editable: false,
            searchable: true,
            validate: {
                pattern: /^[0-9]*\.?[0-9]*$/
            }
        }, {
            id: 'geoLongitude',
            name: 'Longitude',
            editable: false,
            searchable: true,
            validate: {
                pattern: /^[0-9]*\.?[0-9]*$/
            }
        },

        {
            id: 'description',
            name: 'Description',
            editable: false,
            searchable: true,
            validate: {
                pattern: /^[^~,]*$/
            }
        }, {
            id: 'fc_type',
            name: 'Type',
            editable: false,
            searchable: true,
            searchField: 'text',
            type: 'options',
            data: 'options',
            fieldName: 'value'
        }, {
            id: 'franchise',
            name: 'Franchise',
            type: 'checkbox',
            editable: false,
            searchable: true,
            options: [{
                value: true,
                text: 'Yes'
            }, {
                value: false,
                text: 'No'
            }]
        }, {
            id: 'tin',
            name: 'Tin',
            editable: false,
            searchable: true,
            validate: {
                pattern: /^[0-9]*$/
            }
        }, {
            id: 'locality',
            name: 'Locality',
            editable: false,
            searchable: true,
            validate: {
                pattern: /^[a-zA-Z0-9\s\-]*$/
            }
        }, {
            id: 'address1',
            name: 'Address1',
            editable: false,
            searchable: true,
            validate: {
                maxlength: 2000
            }
        }, {
            id: 'address2',
            name: 'Address2',
            editable: false,
            searchable: true,
            validate: {
                maxlength: 2000,
                optional: true
            }
        }, {
            id: 'pincode',
            name: 'Pincode',
            type: 'autocomplete',
            function: 'getPincodes',
            editable: false,
            searchable: true,
            validate: {
                pattern: /^[1-9][0-9]{5}$/,
                maxlength: 6,
                minlength: 6
            }
        }, {
            id: 'o2s_tat',
            name: 'TAT',
            editable: true,
            searchable: true,
            validate: {
                pattern: /^[0-9]*$/
            }
        }, {
            id: 'is_enabled',
            name: 'IsEnabled',
            editable: false,
            searchable: true,
            type: 'checkbox',
            options: [{
                value: true,
                text: 'Yes'
            }, {
                value: false,
                text: 'No'
            }]
        }, {
            id: 'fc_state',
            name: 'State',
            editable: false,
            searchable: true,
            searchField: 'id',
            type: 'dropdown',
            data: 'states',
            fieldName: 'code',
            onChange: 'stateChange',
            hideInAdd: true
        }, {
            id: 'fc_city',
            name: 'City',
            editable: false,
            searchable: true,
            type: 'autocomplete',
            searchField: 'id',
            source: 'cities',
            fieldName: 'name',
            hideInAdd: true
        },

        {
            id: 'fc_cluster',
            name: 'Source Clusters',
            editable: true,
            searchable: true,
            type: 'dropdown',
            searchField: 'id',
            data: 'clusters',
            fieldName: 'name'
        }
    ]
};
config.courier = {
    uploadUrl: '/api/upload/couriers/',
    fields: [{
        id: 'id',
        name: 'ID',
        hideInAdd: true,
        editable: true,
        searchable: false
    }, {
        id: 'name',
        name: 'Name',
        editable: true,
        searchable: true,
        validate: {
            pattern: /^[a-zA-Z\s]*$/
        }
    }, {
        id: 'daily_capacity',
        name: 'Daily Capacity',
        editable: true,
        searchable: true,
        validate: {
            pattern: /^[0-9]*$/
        }
    }, {
        id: 'color_code',
        name: 'Color Code',
        type: 'color',
        editable: true,
        searchable: false
    }, {
        id: 'is_enabled',
        name: 'Enabled',
        type: 'checkbox',
        editable: true,
        searchable: true,
        options: [{
            value: true,
            text: 'Yes'
        }, {
            value: false,
            text: 'No'
        }]
    }]
};
config.shipmentcosting = {
    uploadUrl: '/api/upload/courier_stpt_cost',
    fields: [{
        id: 'id',
        name: 'ID',
        editable: 'false',
        hideInAdd: true,
        searchable: false
    }, {
        id: 'courier',
        name: 'Courier Code',
        editable: 'true',
        searchable: true,
        type: 'dropdown',
        searchField: 'id',
        data: 'couriers',
        fieldName: 'name',
        onChange: 'courierChange'
    }, {
        id: 'payment_service_mapper',
        name: 'Payment Service Mapper',
        editable: true,
        searchable: true,
        type: 'dropdown',
        data: 'paymentservices',
        searchField: 'id',
        fieldName: 'description'
    }, {
        id: 'cost_flat',
        name: 'Basic cost',
        editable: 'true',
        searchable: true,
        validate: {
            pattern: /^(?=.*\d)\d*(?:\.\d\d)?$/
        }
    }, {
        id: 'cost_percent',
        name: 'Cost Percent',
        editable: 'true',
        type: 'percentage',
        searchable: true,
        validate: {
            pattern: /^(100\.00|[0-9]?\d\.\d{2}|[0-9]{2}|[0-9]|[0-9]{2}[\.][0-9]|[0-9][\.][0-9])$/
        }
    }]
};
config.courierp = {
    uploadUrl: '/api/courier_preferences/bulk_add_update',
    deleteUrl: '/api/courier_preferences/bulk_delete',
    fields: [{
            id: 'id',
            name: 'ID',
            editable: false,
            hideInAdd: true,
            searchable: false
        }, {
            id: 'source_cluster',
            name: 'Source Cluster',
            editable: true,
            searchable: true,
            type: 'dropdown',
            searchField: 'id',
            data: 'source_clusters',
            fieldName: 'name',
            prioritysearchable: true
        }, {
            id: 'destination_cluster',
            name: 'Dest. Cluster',
            editable: true,
            searchable: true,
            type: 'dropdown',
            searchField: 'id',
            data: 'dest_clusters',
            fieldName: 'name',
            prioritysearchable: true
        }, {
            id: 'payment_service_mapper',
            name: 'Payment Service Mapper',
            editable: true,
            searchable: true,
            type: 'dropdown',
            searchField: 'id',
            data: 'paymentservices',
            fieldName: 'description',
            prioritysearchable: true
        }, {
            id: 'courier',
            name: 'Courier Code',
            editable: true,
            searchable: true,
            type: 'dropdown',
            searchField: 'id',
            data: 'couriers',
            fieldName: 'name',
            onChange: 'getMappers'
        }, {
            id: 'priority',
            name: 'Priority',
            editable: true,
            searchable: true,
            validate: {
                pattern: /^[0-9]*$/
            }
        }, {
            id: 'shipment_limit',
            name: 'Shipment limit',
            editable: true,
            searchable: true,
            validate: {
                pattern: /^[0-9]*$/
            }
        }, {
            id: 'is_enabled',
            name: 'IsEnabled',
            editable: true,
            searchable: true,
            type: 'checkbox',
            options: [{
                value: true,
                text: 'Yes'
            }, {
                value: false,
                text: 'No'
            }]
        },


    ]
};
config.costing = {
    uploadUrl: '/api/tat_cost_matrix/bulk_add_update',
    deleteUrl: '/api/tat_cost_matrix/bulk_delete',
    fields: [{
            id: 'id',
            name: 'ID',
            editable: false,
            hideInAdd: true,
            searchable: false
        }, {
            id: 'courier',
            name: 'Courier',
            editable: true,
            searchable: true,
            type: 'dropdown',
            searchField: 'id',
            data: 'couriers',
            fieldName: 'name',
            onChange: 'getMappers'
        }, {
            id: 'payment_service_mapper',
            name: 'Payment Service Mapper',
            editable: true,
            searchable: true,
            type: 'dropdown',
            searchField: 'id',
            data: 'paymentservices',
            fieldName: 'description',
            dataDouble: {
                add1: 'pt_id',
                add2: 'st_id'
            },
            dataDouldeField: 'name'
        }, {
            id: 'source_city',
            name: 'Source City',
            editable: 'true',
            searchable: true,
            type: 'autocomplete',
            searchField: 'id',
            source: 'cities',
            fieldName: 'name'
        }, {
            id: 'destination_city',
            name: 'Destination City',
            editable: 'true',
            searchable: true,
            type: 'autocomplete',
            searchField: 'id',
            source: 'cities',
            fieldName: 'name'
        }, {
            id: 'tat',
            name: 'TAT ',
            editable: 'true',
            searchable: true,
            validate: {
                pattern: /^[0-9]*$/
            }
        }, {
            id: 'basic_cost',
            name: 'Basic Freight',
            editable: true,
            searchable: true,
            validate: {
                pattern: /^(?=.*\d)\d*(?:\.\d\d)?$/
            }
        },

        {
            id: 'fixed_addon_cost',
            name: 'VAS Cost',
            editable: 'true',
            searchable: false,
            validate: {
                pattern: /^(?=.*\d)\d*(?:\.\d\d)?$/
            }
        }, {
            id: 'variable_addon_percent',
            name: 'Tax %',
            editable: 'true',
            type: 'percentage',
            searchable: false,
            validate: {
                pattern: /^(100\.00|[0-9]?\d\.\d{2}|[0-9]{2}|[0-9]|[0-9]{2}[\.][0-9]|[0-9][\.][0-9])$/
            }
        }, {
            id: 'totalCost',
            name: 'Total Cost',
            editable: false,
            searchable: false,
            hideInAdd: false,
            validate: {
                pattern: /^(?=.*\d)\d*(?:\.\d\d)?$/
            }
        }
    ]
};
config.constraints = {
    uploadUrl: '/api/upload/courier_constraints/',
    fields: [{
        id: 'id',
        name: 'ID',
        editable: true,
        hideInAdd: true,
        searchable: false
    }, {
        id: 'constraint_type',
        name: 'Constraint Type',
        editable: true,
        searchable: false,
        validate: {
            pattern: /^[a-zA-Z0-9\s]*$/
        },
        type: 'dropdown',
        fieldName: 'name',
        data: 'constraintType',
        onChange: 'getData'
    }, {
        id: 'code',
        name: 'Constraint Value',
        type: 'autocomplete',
        source: 'levels',
        editable: true,
        searchable: false,
    }, {
        id: 'payment_type',
        name: 'Payment Type',
        editable: true,
        searchable: true,
        type: 'dropdown',
        searchField: 'id',
        data: 'paymenttypes',
        fieldName: 'name'
    }, {
        id: 'courier',
        name: 'Courier Code',
        editable: true,
        searchable: true,
        type: 'dropdown',
        searchField: 'id',
        data: 'couriers',
        fieldName: 'name'
    }, {
        id: 'amount',
        name: 'Amount',
        editable: true,
        searchable: true,
        validate: {
            pattern: /^(?=.*\d)\d*(?:\.\d\d)?$/
        }
    }, ]
};
config.serviceability = {
    uploadUrl: '/api/upload/clusters/',
    fields: [{
            id: 'id',
            name: 'ID',
            editable: false,
            hideInAdd: true,
            searchable: false
        },

        {
            id: 'pincode',
            name: 'Pincode',
            editable: true,
            searchable: false
        },

        {
            id: 'service',
            name: 'Service',
            editable: true,
            searchable: false
        },

        {
            id: 'courier_code',
            name: 'Courier Code',
            editable: true,
            searchable: false
        },
    ]
};
config.countryservice = {
    uploadUrl: '/api/courier_country_serviceability/bulk_add_update',
    deleteUrl: '/api/courier_country_serviceability/bulk_delete',
    fields: [{
        id: 'id',
        name: 'Id',
        searchable: false,
        editable: false,
        hideInAdd: true
    }, {
        id: 'courier',
        name: 'Courier',
        editable: true,
        searchable: true,
        type: 'dropdown',
        searchField: 'id',
        fieldName: 'name',
        data: 'couriers'

    }, {
        id: 'country',
        name: 'Country',
        editable: true,
        searchable: true,
        type: 'dropdown',
        data: 'countries',
        fieldName: 'name',
        searchField: 'id'
    }, {
        id: 'is_enabled',
        name: 'IsEnabled',
        searchable: true,
        editable: true,
        type: 'checkbox',
        options: [{
            value: true,
            text: 'Yes'
        }, {
            value: false,
            text: 'No'
        }]

    }, {
        id: 'shipment_capacity',
        name: 'Shipment Capacity',
        editable: true,
        searchable: true,
        validate: {
            pattern: /^[0-9]*$/
        }
    }, {
        id: 'payment_service_mapper',
        name: 'Payment Service Mapper',
        editable: true,
        searchable: true,
        type: 'dropdown',
        searchField: 'id',
        data: 'paymentservices',
        fieldName: 'description',
        dataDouble: {
            add1: 'pt_id',
            add2: 'st_id'
        },
        dataDouldeField: 'name'
    }]
};
config.pincodeservice = {
    uploadUrl: '/api/courier_pincode_serviceability/bulk_add_update',
    deleteUrl: '/api/courier_pincode_serviceability/bulk_delete',
    fields: [{
        id: 'id',
        name: 'Id',
        searchable: false,
        editable: false,
        hideInAdd: true
    }, {
        id: 'pincode',
        name: 'Pincode',
        searchable: true,
        editable: true,
        data: 'pincodes',
        validate: {
            pattern: /^[1-9][0-9]{5}$/,
            maxlength: 6,
            minlength: 6
        },
        searchField: 'id',
        type: 'autocomplete',
        function: 'getPincodes'
    }, {
        id: 'country',
        name: 'Country',
        searchable: true,
        editable: false,
        hideInAdd: true,
        data: 'country',
        fieldName: 'country',
        showInScanData: true
    }, {
        id: 'state',
        name: 'State',
        searchable: true,
        editable: false,
        hideInAdd: true,
        data: 'state',
        fieldName: 'state',
        showInScanData: true
    }, {
        id: 'city',
        name: 'City',
        searchable: true,
        editable: false,
        hideInAdd: true,
        data: 'city',
        fieldName: 'city',
        showInScanData: true
    }, {
        id: 'area',
        name: 'Area',
        searchable: true,
        editable: false,
        hideInAdd: true,
        data: 'area',
        fieldName: 'area',
        showInScanData: true
    }, {
        id: 'areaCityCode',
        name: 'Area City Code',
        searchable: true,
        editable: false,
        hideInAdd: true,
        data: 'areaCityCode',
        fieldName: 'areaCityCode',
        showInScanData: true
    }, {
        id: 'dcCode',
        name: 'DC Code',
        searchable: true,
        editable: true,
        data: 'dcCode',
        fieldName: 'dcCode',
        showInScanData: true
    }, {
        id: 'dcName',
        name: 'DC Name',
        searchable: true,
        editable: true,
        data: 'dcName',
        fieldName: 'dcName',
        showInScanData: true
    }, {
        id: 'courier',
        name: 'Courier',
        editable: true,
        searchable: true,
        type: 'dropdown',
        data: 'couriers',
        searchField: 'id',
        fieldName: 'name',
        onChange: 'getMappers'
    }, {
        id: 'payment_service_mapper',
        name: 'Payment Service Mapper',
        editable: true,
        searchable: true,
        type: 'dropdown',
        searchField: 'id',
        data: 'paymentservices',
        fieldName: 'description',
        dataDouble: {
            add1: 'pt_id',
            add2: 'st_id'
        },
        dataDouldeField: 'name'
    }]
};
config.payment = {
    uploadUrl: '/api/upload/payment_service_mappers/',
    fields: [{
        id: 'id',
        name: 'Id',
        searchable: false,
        editable: false,
        hideInAdd: true
    }, {
        id: 'st_id',
        name: 'Service Type',
        editable: true,
        searchable: true,
        type: 'dropdown',
        searchField: 'id',
        data: 'servicetype',
        fieldName: 'name',

    }, {
        id: 'pt_id',
        name: 'Payment Type',
        editable: true,
        searchable: true,
        type: 'dropdown',
        searchField: 'id',
        data: 'paymenttype',
        fieldName: 'name'
    }, {
        id: 'description',
        name: 'Description',
        searchable: true,
        editable: false,
        hideInAdd: true,
        validate: {
            pattern: /^[a-zA-Z0-9\s]*$/
        }
    }, ]
};
config.stock = {
    uploadUrl: '/api/upload/stock_airwaybill/',
    fields: [{
        id: 'id',
        name: 'Id',
        searchable: false,
        editable: false,
        hideInAdd: true
    }, {
        id: 'awb',
        name: 'AWB',
        searchable: true,
        editable: true,
        validate: {
            pattern: /^[0-9]*$/
        }
    }, {
        id: 'status',
        name: 'Status',
        editable: true,
        searchable: true,
        validate: {
            pattern: /^[a-zA-Z]*$/
        }
    }, {
        id: 'courier',
        name: 'Courier',
        type: 'dropdown',
        data: 'couriers',
        fieldName: 'name',
        searchField: 'id',
        editable: true,
        searchable: true
    }, {
        id: 'payment_type',
        name: 'Payment Type',
        editable: true,
        searchable: true,
        searchField: 'id',
        type: 'dropdown',
        data: 'paymentypes',
        fieldName: 'name'
    }, {
        id: 'replaced_awb',
        name: 'Replaced AWB',
        searchable: false,
    }, {
        id: 'consignment_id',
        name: 'Consignment Id',
        searchable: true,
    }, {
        id: 'service_type',
        name: 'Service Type',
        searchField: 'id',
        fieldName: 'name',
        searchable: false,
        type: 'autocomplete'
    }]
};
config.masterbag = {
    uploadUrl: '/api/upload/master_bags/',
    fields: [{
        id: 'id',
        name: 'Id',
        searchable: false,
        editable: false,
        hideInAdd: true
    }, {
        id: 'code',
        name: 'Master Bag Code',
        editable: true,
        searchable: true,
        hideInAdd: true,
        validate: {
            pattern: /^[a-zA-Z0-9]*$/
        }
    }, {
        id: 'creationTime',
        name: 'Creation Time',
        type: 'time',
        editable: true,
        searchable: true,
        hideInAdd: true

    }, {
        id: 'handoverTime',
        name: 'Handover Time',
        editable: true,
        type: 'time',
        searchable: false,
        hideInAdd: true
    }, {
        id: 'courier',
        name: 'Courier',
        type: 'dropdown',
        searchField: 'id',
        data: 'couriers',
        fieldName: 'name',
        editable: true,
        searchable: true
    }, {
        id: 'fulfillmentCenter',
        name: 'Fulfillment Center',
        type: 'dropdown',
        searchField: 'id',
        data: 'fcenters',
        fieldName: 'name',
        editable: true,
        searchable: true
    }, {
        id: 'status',
        name: 'Status',
        searchable: true,
        searchField: 'text',
        type: 'options',
        data: 'masterbagStatus',
        fieldName: 'status',
        hideInAdd: true
    }]
};
config.shipment = {
    uploadUrl: '/api/upload/shipment_transactions/',
    fields: [{
        id: 'id',
        name: 'Id',
        searchable: false,
        editable: false,
        hideInAdd: true
    }, {
        id: 'shipmentId',
        name: 'Shipment Id',
        editable: false,
        type: 'orderLink',
        searchable: true,
        showInScanData: true,
        showInscan: true,
        validate: {
            pattern: /^.*$/
        }
    }, {
        id: 'master_bag',
        name: 'Master Bag Id',
        editable: false,
        searchable: true,
        type: 'autocomplete',
        fieldName: 'code',
        source: 'masterbags',
        searchField: 'id'
    }, {
        id: 'orderRef',
        name: 'Order ID',
        searchable: true,
        editable: false,
        showInScanData: true,
        validate: {
            pattern: /^.*$/
        }
    }, {
        id: 'awb',
        name: 'AWB',
        editable: true,
        searchable: true,
        validate: {
            pattern: /^[a-zA-Z0-9]*$/
        }
    }, {
        id: 'courier',
        name: 'Courier',
        searchable: true,
        showInScanData: true,
        searchField: 'id',
        type: 'multiselect',
        data: 'couriers',
        fieldName: 'name',
        showColor: true
    }, {
        id: 'fulfillment_center',
        name: 'Fulfillment Center',
        editable: false,
        searchable: true,
        searchField: 'id',
        type: 'multiselect',
        data: 'fulfillservices',
        fieldName: 'name'
    }, {
        id: 'fulfillmentCity',
        name: 'Fulfillment City',
        searchable: true,
        editable: false
    }, {
        id: 'dest_pincode',
        name: 'Dest Pincode',
        type: 'autocomplete',
        function: 'getPincodes',
        editable: false,
        searchable: true,
        fieldName: 'pincode'
    }, {
        id: 'customerCity',
        name: 'Destinaton City',
        searchable: true,
        editable: false
    }, {
        id: 'awbDate',
        name: 'Invoice Time',
        type: 'time',
        searchable: false,
        isOpened: false
    }, {
        id: 'awbDateStart',
        usesearchField: 'awbDate',
        name: 'Invoice Start Date',
        type: 'time',
        searchable: true,
        hideInTable: true,
        isOpened: false,
        isStartDate: true
    }, {
        id: 'awbDateEnd',
        usesearchField: 'awbDate',
        name: 'Invoice End Date',
        type: 'time',
        searchable: true,
        hideInTable: true,
        isOpened: false,
        isStartDate: false
    }, {
        id: 'shippingDate',
        name: 'Shipping Date',
        type: 'time',
        editable: false,
        searchable: false
    }, {
        id: 'shippingDateStart',
        name: 'Shipping Start Date',
        type: 'time',
        usesearchField: 'shippingDate',
        searchable: true,
        hideInTable: true,
        isOpened: false,
        isStartDate: true
    }, {
        id: 'shippingDateENd',
        usesearchField: 'shippingDate',
        name: 'Shipping End Date',
        type: 'time',
        searchable: true,
        hideInTable: true,
        isOpened: false,
        isStartDate: false
    }, {
        id: 'promiseDate',
        name: 'Promise Date',
        type: 'timenosecond',
        editable: false,
        searchable: false
    }, {
        id: 'deliveredDate',
        name: 'Delivered Date',
        type: 'time',
        editable: false,
        searchable: false,
        hideInAdd: true,
        hideInTable: false,
        isOpened: false,
        isStartDate: false
    }, {
        id: 'deliveredDateStart',
        name: 'Delivery Start Date',
        usesearchField: 'deliveredDate',
        type: 'time',
        searchable: true,
        hideInTable: true,
        isOpened: false,
        isStartDate: true
    }, {
        id: 'deliveredDateEnd',
        usesearchField: 'deliveredDate',
        name: 'Delivery End Date',
        type: 'time',
        searchable: true,
        hideInTable: true,
        isOpened: false,
        isStartDate: false
    }, {
        id: 'status',
        name: 'LMS Status',
        data: 'shipmentStatus',
        searchable: true,
        editable: false,
        type: 'multiselect',
        fieldName: 'status',
        status: true,
        showInScanData: true,
        validate: {
            pattern: /^[a-zA-Z]*$/
        },
        searchField: 'status'
    }, {
        id: 'courierStatus',
        name: 'Courier Status',
        searchable: true,
        editable: false,
        showInScanData: true
    }, {
        id: 'attemptCount',
        name: 'Attempt Count',
        searchable: true,
        editable: false
    }, {
        id: 'packagingType',
        name: 'Packaging Type',
        searchable: false,
        editable: false
    }, {
        id: 'amount',
        name: 'Amount',
        searchable: false,
        editable: false,
        validate: {
            pattern: /^[0-9]*$/
        }
    }, {
        id: 'customerName',
        name: 'Customer Name',
        searchable: false,
        editable: true,
        validate: {
            pattern: /^[a-zA-Z0-9]*$/
        }
    }, {
        id: 'payment_service_mapper',
        name: 'Delivery Type',
        editable: false,
        searchable: true,
        type: 'multiselect',
        displayType: 1,
        searchField: 'id',
        data: 'paymentservices',
        fieldName: 'description'
    }, {
        id: 'payment_service_mapper',
        name: 'Payment Type',
        editable: false,
        searchable: false,
        type: 'dropdown',
        displayType: 2,
        searchField: 'id',
        data: 'paymentservices',
        fieldName: 'description'
    }]
};
config.fcservice = {
    uploadUrl: '/api/fc_serviceability/bulk_add_update',
    deleteUrl: '/api/fc_serviceability/bulk_delete',
    fields: [{
        id: 'fc_id',
        name: 'Fulfillment Center ID',
        editable: true,
        searchable: true,
        searchField: 'id',
        type: 'dropdown',
        data: 'fulfillservices',
        fieldName: 'name'
    }, {
        id: 'st_pt_id',
        name: 'Payment Service ID ',
        editable: true,
        searchable: true,
        type: 'dropdown',
        data: 'paymentservices',
        searchField: 'id',
        fieldName: 'description'
    }, {
        id: 'is_enabled',
        name: 'IsEnabled',
        editable: true,
        searchable: true,
        type: 'checkbox',
        options: [{
            value: true,
            text: 'Yes'
        }, {
            value: false,
            text: 'No'
        }]
    }, {
        id: 'shipment_cutoff_time',
        name: 'Shipment Cuttoff Time',
        searchable: true,
        editable: true,
        type: 'hourminutetime'
    }, {
        id: 'id',
        name: 'Id',
        searchable: false,
        editable: false,
        hideInAdd: true
    }, ]
};

config.advancesearch = {
    fields: [{
        id: 'paymentservice',
        name: 'Payment Service ID ',
        type: 'dropdown',
        data: 'paymentservices',
        fieldName: 'description'
    }, {
        id: 'fullfillmentid',
        name: 'Fullfilment Center',
        type: 'dropdown',
        data: 'fullfillmentcentres',
        fieldName: 'name'
    }, {
        id: 'pincode',
        name: 'Pincode',
        validate: {
            pattern: /^[1-9][0-9]{5}$/,
            maxlength: 6
        }
    }, {
        id: 'shipmentValue',
        name: 'Shipment Value',
        validate: {
            pattern: /^[0-9]*$/
        }
    }]
};

config.tracking = {
    fields: [{
        id: 'shipmentId',
        name: 'Shipment Id'
    }, {
        id: 'courier',
        name: 'Courier'
    }, {
        id: 'id',
        name: 'id',
    }, {
        id: 'awbno',
        name: 'AWB',
    }, {
        id: 'threepl_reason_code',
        name: 'Courier Reason Code'
    }, {
        id: 'threepl_status',
        name: 'Courier Status'
    }, {
        id: 'ail_status',
        name: 'Shipment Status',
    }, {
        id: 'ail_status_time',
        name: 'Shipment Status Time',
        type: 'time'
    }, {
        id: 'delivery_attempt',
        name: 'Delivery Attempt'
    }, {
        id: 'threepl_status_time',
        name: 'Courier Status Time',
        type: 'time'
    }]
};

//Reverse


config.rcountryservice = {
    uploadUrl: '/api/upload/return_courier_country_serviceability/',
    fields: [{
        id: 'id',
        name: 'Id',
        searchable: false,
        editable: false,
        hideInAdd: true
    }, {
        id: 'courier',
        name: 'Courier',
        editable: true,
        searchable: true,
        type: 'dropdown',
        searchField: 'id',
        fieldName: 'name',
        data: 'couriers'

    }, {
        id: 'country',
        name: 'Country',
        editable: true,
        searchable: true,
        type: 'dropdown',
        data: 'countries',
        fieldName: 'name',
        searchField: 'id'
    }, {
        id: 'is_enabled',
        name: 'IsEnabled',
        searchable: true,
        editable: true,
        type: 'checkbox',
        options: [{
            value: true,
            text: 'Yes'
        }, {
            value: false,
            text: 'No'
        }]

    }, {
        id: 'shipment_capacity',
        name: 'Shipment Capacity',
        editable: true,
        searchable: true,
        validate: {
            pattern: /^[0-9]*$/
        }
    }]
};


config.rcosting = {
    uploadUrl: '/api/upload/return_tat_cost_matrix',
    fields: [{
            id: 'id',
            name: 'ID',
            editable: false,
            hideInAdd: true,
            searchable: false
        }, {
            id: 'courier',
            name: 'Courier',
            editable: true,
            searchable: true,
            type: 'dropdown',
            searchField: 'id',
            data: 'couriers',
            fieldName: 'name',
            onChange: 'getMappers'
        }, {
            id: 'sourceCity',
            name: 'Source City',
            editable: 'true',
            searchable: true,
            type: 'autocomplete',
            searchField: 'id',
            source: 'cities',
            fieldName: 'name'
        }, {
            id: 'destinationCity',
            name: 'Destination City',
            editable: 'true',
            searchable: true,
            type: 'autocomplete',
            searchField: 'id',
            source: 'cities',
            fieldName: 'name'
        }, {
            id: 'tat',
            name: 'TAT ',
            editable: 'true',
            searchable: true,
            validate: {
                pattern: /^[0-9]*$/
            }
        }, {
            id: 'basicCost',
            name: 'Basic Freight',
            editable: true,
            searchable: true,
            validate: {
                pattern: /^(?=.*\d)\d*(?:\.\d\d)?$/
            }
        },

        {
            id: 'fixedAddonCost',
            name: 'VAS Cost',
            editable: 'true',
            searchable: false,
            validate: {
                pattern: /^(?=.*\d)\d*(?:\.\d\d)?$/
            }
        }, {
            id: 'variableAddonPercent',
            name: 'Tax %',
            editable: 'true',
            type: 'percentage',
            searchable: false,
            validate: {
                pattern: /^(100\.00|[0-9]?\d\.\d{2}|[0-9]{2}|[0-9]|[0-9]{2}[\.][0-9]|[0-9][\.][0-9])$/
            }
        }, {
            id: 'totalCost',
            name: 'Total Cost',
            editable: false,
            searchable: false,
            hideInAdd: false,
            validate: {
                pattern: /^(?=.*\d)\d*(?:\.\d\d)?$/
            }
        }
    ]
};

config.rcourierp = {
    uploadUrl: '/api/upload/return_courier_preferences/',
    fields: [{
            id: 'id',
            name: 'ID',
            editable: false,
            hideInAdd: true,
            searchable: false
        }, {
            id: 'sourceCluster',
            name: 'Source Cluster',
            editable: true,
            searchable: true,
            type: 'dropdown',
            searchField: 'id',
            data: 'source_clusters',
            fieldName: 'name',
            prioritysearchable: true
        }, {
            id: 'destinationCluster',
            name: 'Dest. Cluster',
            editable: true,
            searchable: true,
            type: 'dropdown',
            searchField: 'id',
            data: 'dest_clusters',
            fieldName: 'name',
            prioritysearchable: true
        }, {
            id: 'courier',
            name: 'Courier Code',
            editable: true,
            searchable: true,
            type: 'dropdown',
            searchField: 'id',
            data: 'couriers',
            fieldName: 'name',
            onChange: 'getMappers'
        }, {
            id: 'priority',
            name: 'Priority',
            editable: true,
            searchable: true,
            validate: {
                pattern: /^[0-9]*$/
            }
        }, {
            id: 'shipmentLimit',
            name: 'Shipment limit',
            editable: true,
            searchable: true,
            validate: {
                pattern: /^[0-9]*$/
            }
        }, {
            id: 'isEnabled',
            name: 'IsEnabled',
            editable: true,
            searchable: true,
            type: 'checkbox',
            options: [{
                value: true,
                text: 'Yes'
            }, {
                value: false,
                text: 'No'
            }]
        },


    ]
};

config.rpincodeservice = {
    uploadUrl: '/api/upload/return_courier_pincode_serviceability/',
    fields: [{
        id: 'id',
        name: 'Id',
        searchable: false,
        editable: false,
        hideInAdd: true
    }, {
        id: 'pincode',
        name: 'Pincode',
        searchable: true,
        editable: true,
        data: 'pincodes',
        validate: {
            pattern: /^[1-9][0-9]{5}$/,
            maxlength: 6,
            minlength: 6
        },
        searchField: 'id',
        type: 'autocomplete',
        function: 'getPincodes'
    }, {
        id: 'capacity',
        name: 'Capacity',
        editable: true,
        searchable: true,
        validate: {
            pattern: /^[0-9]*$/
        }
    }, {
        id: 'country',
        name: 'Country',
        searchable: true,
        editable: false,
        hideInAdd: true,
        data: 'country',
        fieldName: 'country',
        showInScanData: true
    }, {
        id: 'state',
        name: 'State',
        searchable: true,
        editable: false,
        hideInAdd: true,
        data: 'state',
        fieldName: 'state',
        showInScanData: true
    }, {
        id: 'city',
        name: 'City',
        searchable: true,
        editable: false,
        hideInAdd: true,
        data: 'city',
        fieldName: 'city',
        showInScanData: true
    }, {
        id: 'area',
        name: 'Area',
        searchable: true,
        editable: false,
        hideInAdd: true,
        data: 'area',
        fieldName: 'area',
        showInScanData: true
    }, {
        id: 'areaCityCode',
        name: 'Area City Code',
        searchable: true,
        editable: false,
        hideInAdd: true,
        data: 'areaCityCode',
        fieldName: 'areaCityCode',
        showInScanData: true
    }, {
        id: 'dcCode',
        name: 'DC Code',
        searchable: true,
        editable: true,
        data: 'dcCode',
        fieldName: 'dcCode',
        showInScanData: true
    }, {
        id: 'dcName',
        name: 'DC Name',
        searchable: true,
        editable: true,
        data: 'dcName',
        fieldName: 'dcName',
        showInScanData: true
    }, {
        id: 'courier',
        name: 'Courier',
        editable: true,
        searchable: true,
        type: 'dropdown',
        data: 'couriers',
        searchField: 'id',
        fieldName: 'name',
        onChange: 'getMappers'
    }]
};

config.rserviceability = {
    uploadUrl: '/api/upload/clusters/',
    fields: [{
            id: 'id',
            name: 'ID',
            editable: false,
            hideInAdd: true,
            searchable: false
        },

        {
            id: 'pincode',
            name: 'Pincode',
            editable: true,
            searchable: false
        },

        {
            id: 'service',
            name: 'Service',
            editable: true,
            searchable: false
        },

        {
            id: 'courier_code',
            name: 'Courier Code',
            editable: true,
            searchable: false
        },
    ]
};

config.rshipment = {
    uploadUrl: '/api/upload/storetowarehouse/consignment',
    fields: [{
        id: 'id',
        name: 'Id',
        searchable: false,
        editable: false,
        hideInAdd: true
    }, {
        id: 'orderRef',
        name: 'Order ID',
        searchable: true,
        editable: false,
        showInScanData: true,
        type: 'reverseorderLink'
    }, {
        id: 'returnId',
        name: 'Return ID',
        searchable: true
    }, {
        id: 'consignmentId',
        name: 'Shipment Id',
        editable: false,
        searchable: true,
        showInScanData: true,
        showInscan: false,
        validate: {
            pattern: /^.*$/
        }
    }, {
        id: '',
        name: 'EAN Codes',
        type: 'ean',
    }, {
        id: 'awb',
        name: 'AWB',
        editable: true,
        searchable: true,
        showInScanData: true,
        showInscan: true,
        validate: {
            pattern: /^.*$/
        }
    }, {
        id: 'invoiceId',
        name: 'Invoice Id',
        editable: true,
        searchable: true,
        showInScanData: true,
        showInscan: true,
        validate: {
            pattern: /^.*$/
        }
    }, {
        id: 'customerName',
        name: 'Customer Name ',
        editable: false,
        searchable: true,
        showInScanData: false,
        showInscan: false,
        validate: {
            pattern: /^.*$/
        }
    }, {
        id: 'quantityDeclared',
        name: 'Qty Declared',
        searchable: false,
        type: "number"
    }, {
        id: 'quantityReceived',
        name: 'Qty Received',
        searchable: false,
        type: "number"
    }, {
        id: 'customerCity',
        name: 'Source City',
        editable: false,
        searchable: true
    }, {
        id: 'destinationFcId',
        name: 'Store Id',
        searchable: true
    }, {
        id: 'lmsStatus',
        name: 'LMS Status',
        searchable: true,
        editable: false,
        type: 'multiselect',
        data: 'shipmentStatus',
        fieldName: 'status',
        status: true,
        showInScanData: true,
        validate: {
            pattern: /^[a-zA-Z]*$/
        },
        searchField: 'status'
    }, {
        id: 'qcStatus',
        name: 'QC Status',
        searchable: true
    }, {
        id: 'courierName',
        name: 'Courier Name',
        searchable: true,
        showInScanData: true,
        searchField: 'id',
        type: 'multiselect',
        data: 'courierName',
        fieldName: 'name',
        showColor: true
    }, {
        id: 'returnType',
        name: 'Return Type',
        searchable: true,
        showInScanData: true,
        searchField: 'id',
        type: 'multiselect',
        data: 'returnType',
        fieldName: 'name',
        showColor: true
    }, {
        id: 'courierStatus',
        name: 'Courier Status',
        searchable: false
    }, {
        id: 'attemptCount',
        name: 'Attempt Count',
        searchable: false,
        editable: false,
        type: 'number'
    }, {
        id: 'customerPincode',
        name: 'Customer Pincode',
        searchable: true
    }, {
        id: 'createdDateTime',
        name: 'Request Date',
        searchable: false,
        editable: false,
        type: 'time'
    }, {
        id: 'requestDateStart',
        name: 'Request Start Date',
        type: 'time',
        usesearchField: 'createdDateTime',
        searchable: true,
        hideInTable: true,
        isOpened: false,
        isStartDate: true
    }, {
        id: 'requestDateEnd',
        name: 'Request End Date',
        type: 'time',
        usesearchField: 'createdDateTime',
        searchable: true,
        hideInTable: true,
        isOpened: false,
        isStartDate: false
    }, {
        id: 'pickUpDateTime',
        name: 'PickUp Date',
        searchable: false,
        editable: true,
        type: 'hourminutetime'
    }, {
        id: 'promiseDate',
        name: 'Promise Date',
        searchable: false,
        editable: true,
        type: 'hourminutetime'
    }, {
        id: 'deliveredDateTime',
        name: 'Delivered Date',
        searchable: false,
        editable: false,
        type: 'time'
    }, {
        id: 'deliveredDateStart',
        name: 'Delivered Start Date',
        type: 'time',
        usesearchField: 'deliveredDateTime',
        searchable: true,
        hideInTable: true,
        isOpened: false,
        isStartDate: true
    }, {
        id: 'deliveredDateEnd',
        name: 'Delivered End Date',
        type: 'time',
        usesearchField: 'deliveredDateTime',
        searchable: true,
        hideInTable: true,
        isOpened: false,
        isStartDate: false
    }, {
        id: 'packagingType',
        name: 'Packaging Type',
        searchable: false
    }, {
        id: 'packageStatus',
        name: 'Package Status',
        searchable: false
    }, {
        id: 'history',
        name: 'History',
        searchable: false,
        type: 'history'
    }]
};

config.rshipmentdetail = {
    uploadUrl: '/api/upload/shipment_transactions/',
    fields: [{
        id: 'returnId',
        name: 'Return IDs',
        type: 'normal'
    }, {
        id: 'awb',
        name: 'AWB',
        type: 'normal'

    }, {
        id: 'quantityDeclared',
        name: 'Quantity Declared',
        type: 'normal'

    }, {
        id: 'quantityReceived',
        name: 'Quantity Recieved',
        type: 'number'
    }, {
        id: 'packageStatus',
        name: 'Status',
        type: 'simpleDropdown',
        data: 'dataArray',
        fieldName: 'name',
    }]
};

config.handover = {
    fields: [{
        id: 'checkbox',
        name: 'Select',
        type: 'checkbox'
    }, {
        id: 'shipmentId',
        name: 'Shipment Id'
    }, {
        id: 'master_bag',
        name: 'Master Bag Id'
    }, {
        type: 'otp',
        courier: 'ROADRUNNR',
        name: 'OTP'
    }, {
        id: 'orderRef',
        name: 'Order ID',
        searchable: true,
        editable: false,
        showInScanData: true,
        validate: {
            pattern: /^.*$/
        }
    }, {
        id: 'awb',
        name: 'AWB',
        editable: true,
        searchable: true,
        validate: {
            pattern: /^[a-zA-Z0-9]*$/
        }
    }, {
        id: 'fulfillmentCity',
        name: 'Fulfillment City',
        searchable: true,
        editable: false
    }, {
        id: 'dest_pincode',
        name: 'Dest Pincode',
        type: 'autocomplete',
        function: 'getPincodes',
        editable: false,
        searchable: true,
        fieldName: 'pincode'
    }, {
        id: 'customerCity',
        name: 'Destinaton City',
        searchable: true,
        editable: false
    }, {
        id: 'deliveredDate',
        name: 'Delivered Date',
        type: 'time',
        editable: false,
        searchable: true,
        hideInAdd: true,
        hideInTable: true,
        isOpened: false,
        isStartDate: true
    }, {
        id: 'packagingType',
        name: 'Packaging Type',
        searchable: false,
        editable: false
    }, {
        id: 'amount',
        name: 'Amount',
        searchable: false,
        editable: false,
        validate: {
            pattern: /^[0-9]*$/
        }
    }, {
        id: 'customerName',
        name: 'Customer Name',
        searchable: false,
        editable: true,
        validate: {
            pattern: /^[a-zA-Z0-9]*$/
        }
    }]
};

config.rshipmentdetail2 = {
    fields: [{
        id: 'returnId',
        name: 'Return ID'
    }, {
        id: 'price',
        name: 'Price'
    }, {
        id: 'comments',
        name: 'comments'
    }]
};

config.rshipmentcosting = {
    uploadUrl: '/api/upload/courier_stpt_cost',
    fields: [{
        id: 'id',
        name: 'ID',
        editable: 'false',
        hideInAdd: true,
        searchable: false
    }, {
        id: 'courier',
        name: 'Courier Code',
        editable: 'true',
        searchable: true,
        type: 'dropdown',
        searchField: 'id',
        data: 'couriers',
        fieldName: 'name',
        onChange: 'courierChange'
    }, {
        id: 'costFlat',
        name: 'Basic cost',
        editable: 'true',
        searchable: true,
        validate: {
            pattern: /^(?=.*\d)\d*(?:\.\d\d)?$/
        }
    }, {
        id: 'costPercent',
        name: 'Cost Percent',
        editable: 'true',
        type: 'percentage',
        searchable: true,
        validate: {
            pattern: /^(100\.00|[0-9]?\d\.\d{2}|[0-9]{2}|[0-9]|[0-9]{2}[\.][0-9]|[0-9][\.][0-9])$/
        }
    }]
};


config.shipmentTrackingHistory = {
    fields: [{
        id: 'consignmentId',
        name: 'Shipment Id'
    }, {
        id: 'id',
        name: 'id',
    }, {
        id: 'awb',
        name: 'AWB',
    }, {
        id: 'threePlComment',
        name: 'Courier Reason'
    }, {
        id: 'threePlStatus',
        name: 'Courier Status'
    }, {
        id: 'ailStatus',
        name: 'Shipment Status',
    }, {
        id: 'ailStatusDateTime',
        name: 'Shipment Status Time',
        type: 'time'
    }, {
        id: 'deliveryAttempt',
        name: 'Delivery Attempt'
    }, {
        id: 'threePlStatusDateTime',
        name: 'Courier Status Time',
        type: 'time'
    }]
};

//confgurations for service type cutoff
//Id,Service type,Source City,Destination city,Courier,cutoff,


config.service_cutoff = {
    uploadUrl: '/api/add/service_type_cutoffs',
    deleteUrl: '/api/delete/service_type_cutoffs/',
    fields: [{
        id: 'id',
        name: 'ID',
        editable: false,
        hideInAdd: true,
        searchable: false
    }, {
        id: 'service_type',
        name: 'Service Type',
        editable: true,
        searchable: true,
        type: 'dropdown',
        searchField: 'id',
        data: 'servicetype',
        fieldName: 'name',
    }, {
        id: 'source_city',
        name: 'Source City',
        editable: 'true',
        searchable: true,
        type: 'autocomplete',
        searchField: 'id',
        source: 'cities',
        fieldName: 'name'
    }, {
        id: 'destination_city',
        name: 'Destination City',
        editable: 'true',
        searchable: true,
        type: 'autocomplete',
        searchField: 'id',
        source: 'cities',
        fieldName: 'name'
    }, {
        id: 'courier',
        name: 'Courier',
        editable: true,
        searchable: true,
        type: 'dropdown',
        searchField: 'id',
        data: 'couriers',
        fieldName: 'name',
        onChange: 'getMappers'
    }, {
        id: 'cutoff',
        name: 'Cuttoff Time',
        searchable: true,
        editable: true,
        type: 'hourminutetime'
    }]
};

var keycloak = new Keycloak("scripts/keycloak.config.json");

angular.element(document).ready(function() {
    keycloak.init({
        onLoad: 'login-required'
    }).success(function() {
        angular.bootstrap(document, ['omsieApp']);
    });
});
