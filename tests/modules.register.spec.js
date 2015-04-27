'use strict';

var sinon = require('sinon');
require('chai').should();

var modules = require('../src/modules');

describe('Modules - register', function() {

  var sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    modules.reset();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('Flux is not set, will throw an error', function() {
    /*eslint-disable no-wrap-func*/
    (function() {
      modules.register('some-module', {'roo': 'sar'});
    }).should.throw(Error, 'Flux callback not set, need to be set before register any module.');
    /*eslint-enable no-wrap-func*/
  });

  it('The registration has success', function() {
    var cbAddStores = function(){};
    var cbAddActions = function(){};
    modules.init(cbAddStores, cbAddActions);
    var moduleStruct = {'roo': 'sar'};
    var _initStoresStub = sandbox.stub(modules, '_initStores').withArgs(moduleStruct);
    var _initActionsStub = sandbox.stub(modules, '_initActions').withArgs(moduleStruct);
    var _initServicesStub = sandbox.stub(modules, '_initServices').withArgs(moduleStruct);
    modules.register('some-module', moduleStruct);

    _initStoresStub.callCount.should.be.equal(1);
    _initActionsStub.callCount.should.be.equal(1);
    _initServicesStub.callCount.should.be.equal(1);
  });

  it('The registration has fail because a module with same name is registered', function() {
    var cbAddStores = function(){};
    var cbAddActions = function(){};
    modules.init(cbAddStores, cbAddActions);

    var moduleStruct = {'foo': 'bar'};
    var moduleStruct2 = {'roo': 'sar'};
    var _initStoresStub = sandbox.stub(modules, '_initStores').withArgs(moduleStruct);
    var _initActionsStub = sandbox.stub(modules, '_initActions').withArgs(moduleStruct);
    var _initServicesStub = sandbox.stub(modules, '_initServices').withArgs(moduleStruct);
    modules.register('some-module', moduleStruct);

    /*eslint-disable no-wrap-func*/
    (function() {
      modules.register('some-module', moduleStruct2);
    }).should.throw(Error, 'A module named [some-module] already registered.');
    /*eslint-enable no-wrap-func*/

    _initStoresStub.callCount.should.be.equal(1);
    _initActionsStub.callCount.should.be.equal(1);
    _initServicesStub.callCount.should.be.equal(1);
  });

});
