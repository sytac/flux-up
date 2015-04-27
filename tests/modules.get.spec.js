'use strict';

var sinon = require('sinon');
require('chai').should();

var modules = require('../src/modules');

describe('Modules - get', function() {

  var sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    modules.reset();
    var cbAddStores = function(){};
    var cbAddActions = function(){};
    modules.init(cbAddStores, cbAddActions);
    sandbox.stub(modules, '_initStores');
    sandbox.stub(modules, '_initActions');
    sandbox.stub(modules, '_initServices');
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('Get a module that exists wont\'fail', function() {
    modules.register('some-module', {'foo': 'bar'});
    modules.get('some-module').should.be.eql({'foo': 'bar'});
  });

  it('Get a module that not exists will fail', function() {
    /*eslint-disable no-wrap-func*/
    (function() {
      modules.get('some-module');
    }).should.throw(Error, 'Module [some-module] not exists.');
    /*eslint-enable no-wrap-func*/
  });
});
