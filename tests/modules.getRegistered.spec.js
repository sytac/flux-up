'use strict';

var sinon = require('sinon');
require('chai').should();

var modules = require('../src/modules');

describe('Module - getRegistered', function() {

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

  it('Should be empty at load', function() {
    modules.getRegistered().should.be.eql([]);
  });

  it('Should return an element after a module is registered', function() {
    modules.register('some-module', {});
    modules.getRegistered().should.be.eql(['some-module']);
  });

  it('Should return more modules after are registered', function() {
    modules.register('some-module-1', {});
    modules.register('some-module-2', {});
    modules.register('some-module-3', {});
    modules.register('some-module-4', {});
    modules.getRegistered().should.be.eql(
        [
          'some-module-1',
          'some-module-2',
          'some-module-3',
          'some-module-4'
        ]
    );
  });
});
