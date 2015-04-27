'use strict';

require('chai').should();

var services = require('../src/services');

describe('Services - register', function() {

  beforeEach(function() {
    services.reset();
  });

  it('Set a service and retrieve it wont\'fail', function() {
    services.register('some-service', {'foo': 'bar'});
    services.get('some-service').should.be.eql({'foo': 'bar'});
  });

  it('Set a service that exists will fail', function() {
    services.register('some-service', {'foo': 'bar'});

    /*eslint-disable no-wrap-func*/
    (function() {
      services.register('some-service', {'roo': 'sar'});
    }).should.throw(Error, 'A service named [some-service] already registered.');
    /*eslint-enable no-wrap-func*/
  });
});
