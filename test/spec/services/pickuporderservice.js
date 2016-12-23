'use strict';

describe('Service: PickuporderService', function () {

  // load the service's module
  beforeEach(module('omsieApp'));

  // instantiate service
  var PickuporderService;
  beforeEach(inject(function (_PickuporderService_) {
    PickuporderService = _PickuporderService_;
  }));

  it('should do something', function () {
    expect(!!PickuporderService).toBe(true);
  });

});
