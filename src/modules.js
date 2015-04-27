'use strict';

var services = require('./services');

var modules = (function() {
  var _modules = {};

  var _addActionsCallback = null;
  var _addStoresCallback = null;

  return {
    init: init,
    register: registerModule,
    get: getModule,
    getRegistered: getRegisteredModules,
    exists: existsModule,
    reset: reset,
    _initStores: _initStores,
    _initActions: _initActions,
    _initServices: _initServices
  };

  function init(addStoresCallback, addActionsCallback) {
    _addStoresCallback = addStoresCallback;
    _addActionsCallback = addActionsCallback;
  }

  function registerModule(moduleName, moduleStruct) {
    if (_addActionsCallback == null || _addStoresCallback == null) {
      throw new Error('Flux callback not set, need to be set before register any module.');
    }

    if (this.exists(moduleName)) {
      throw new Error('A module named [' + moduleName + '] already registered.');
    }
    _modules[moduleName] = moduleStruct;
    this._initStores(moduleStruct);
    this._initActions(moduleStruct);
    this._initServices(moduleStruct);
  }

  function getModule(moduleName) {
    if (!this.exists(moduleName)) {
      throw new Error('Module [' + moduleName + '] not exists.');
    }
    return _modules[moduleName];
  }

  function existsModule(moduleName) {
    return _modules[moduleName] !== undefined;
  }

  function getRegisteredModules() {
    return Object.keys(_modules);
  }

  function _initStores(currentModule) {
    if (currentModule.stores === undefined || currentModule.stores === null) {
      return;
    }
    _addStoresCallback(currentModule.stores);
  }

  function _initActions(currentModule) {
    if (currentModule.actions === undefined || currentModule.actions === null) {
      return;
    }
    _addActionsCallback(currentModule.actions);
  }

  function _initServices(currentModule) {
    if (currentModule.services === undefined || currentModule.services === null) {
      return;
    }
    Object.keys(currentModule.services).map(function(key) {
      var classObj = currentModule.services[key];
      services.register(key, classObj);
    });
  }

  function reset() {
    _modules = [];
    _addActionsCallback = null;
    _addStoresCallback = null;
  }
})();

module.exports = modules;
