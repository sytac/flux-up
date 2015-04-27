'use strict';

require('chai').should();

var services = require('../src/services');

describe('Services - exists', function() {

  beforeEach(function() {
    services.reset();
  });

  it('Check for a service that not exists', function() {
    /*eslint-disable no-unused-expressions*/
    services.exists('some-service').should.be.false;
  });

  it('Check for a service that exists', function() {
    services.register('some-service', {foo : 'bar'});
    /*eslint-disable no-unused-expressions*/
    services.exists('some-service').should.be.true;
  });
});
