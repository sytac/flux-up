'use strict';

require('chai').should();

var services = require('../src/services');

describe('Services - getRegistered', function() {

  beforeEach(function() {
    services.reset();
  });

  it('Should be empty at load', function() {
    services.getRegistered().should.be.eql([]);
  });

  it('Should return an element after a service is registered', function() {
    services.register('some-service', {});
    services.getRegistered().should.be.eql(['some-service']);
  });

  it('Should return more services after are registered', function() {
    services.register('some-service-1', {});
    services.register('some-service-2', {});
    services.register('some-service-3', {});
    services.register('some-service-4', {});
    services.getRegistered().should.be.eql(
        [
          'some-service-1',
          'some-service-2',
          'some-service-3',
          'some-service-4'
        ]
    );
  });
});
