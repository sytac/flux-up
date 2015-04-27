'use strict';

require('chai').should();

var services = require('../src/services');

describe('Service - unset', function() {

  beforeEach(function() {
    services.reset();
  });

  it('Set a service after it\'s been removed won\'t fail', function() {
    services.register('some-service', {'foo': 'bar'});
    services.get('some-service').should.be.eql({'foo': 'bar'});
    services.unset('some-service');
    services.register('some-service', {'foo': 'bar2'});
    services.get('some-service').should.be.eql({'foo': 'bar2'});
  });
});
