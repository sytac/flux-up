'use strict';

require('chai').should();

var services = require('../src/services');

describe('Services - get', function() {

  beforeEach(function() {
    services.reset();
  });

  it('Get a service that exists wont\'fail', function() {
    services.register('some-service', {'foo': 'bar'});
    services.get('some-service').should.be.eql({'foo': 'bar'});
  });

  it('Set a service that not exists will fail', function() {
    /*eslint-disable no-wrap-func*/
    (function() {
      services.get('some-service', {'roo': 'sar'});
    }).should.throw(Error, 'Service [some-service] not exists.');
    /*eslint-enable no-wrap-func*/
  });
});
