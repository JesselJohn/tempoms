'use strict';

describe('Service: MissedOrderService', function () {

  // load the service's module
  beforeEach(module('omsieApp'));

  // instantiate service
  var MissedOrderService;
  beforeEach(inject(function (_MissedOrderService_) {
    MissedOrderService = _MissedOrderService_;
  }));

  it('should do something', function () {
    expect(!!MissedOrderService).toBe(true);
  });

});
