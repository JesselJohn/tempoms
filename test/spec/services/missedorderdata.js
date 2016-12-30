'use strict';

describe('Service: MissedOrderData', function () {

  // load the service's module
  beforeEach(module('omsieApp'));

  // instantiate service
  var MissedOrderData;
  beforeEach(inject(function (_MissedOrderData_) {
    MissedOrderData = _MissedOrderData_;
  }));

  it('should do something', function () {
    expect(!!MissedOrderData).toBe(true);
  });

});
