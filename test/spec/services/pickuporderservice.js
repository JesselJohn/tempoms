'use strict';

describe('Service: PickupOrderService', function () {

  // load the service's module
  beforeEach(module('omsieApp'));

  // instantiate service
  var PickupOrderService;
  beforeEach(inject(function (_PickupOrderService_) {
    PickupOrderService = _PickupOrderService_;
  }));

  it('should do something', function () {
    expect(!!PickupOrderService).toBe(true);
  });

});
