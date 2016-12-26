'use strict';

describe('Service: PickupOrderData', function () {

  // load the service's module
  beforeEach(module('omsieApp'));

  // instantiate service
  var PickupOrderData;
  beforeEach(inject(function (_PickupOrderData_) {
    PickupOrderData = _PickupOrderData_;
  }));

  it('should do something', function () {
    expect(!!PickupOrderData).toBe(true);
  });

});
