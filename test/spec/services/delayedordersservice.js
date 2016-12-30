'use strict';

describe('Service: DelayedOrdersService', function () {

  // load the service's module
  beforeEach(module('omsieApp'));

  // instantiate service
  var DelayedOrdersService;
  beforeEach(inject(function (_DelayedOrdersService_) {
    DelayedOrdersService = _DelayedOrdersService_;
  }));

  it('should do something', function () {
    expect(!!DelayedOrdersService).toBe(true);
  });

});
