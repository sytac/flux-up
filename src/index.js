'use strict';

var modules = require('./modules');
var services = require('./services');

var loader = (function() {
  return {
    init: init,
    services: services,
    modules: modules,
    reset: reset
  };

  function init(addStoresCallback, addActionsCalback) {
    this.modules.init(addStoresCallback, addActionsCalback);
  }

  function reset() {
    this.services.reset();
    this.modules.reset();
  }
})();

module.exports = loader;
