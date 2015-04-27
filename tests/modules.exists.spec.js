'use strict';

var sinon = require('sinon');
require('chai').should();

var modules = require('../src/modules');

describe('Modules - exists', function() {

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


  it('Check for a module that not exists', function() {
    /*eslint-disable no-unused-expressions*/
    modules.exists('some-module').should.be.false;
  });

  it('Check for a module that exists', function() {
    modules.register('some-module', {foo : 'bar'});
    /*eslint-disable no-unused-expressions*/
    modules.exists('some-module').should.be.true;
  });
});
