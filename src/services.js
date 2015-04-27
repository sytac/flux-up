'use strict';

/**
 * A manager for any kind of service the application need.
 *
 * @return {
 *    {getRegistered: getRegisteredServices,
 *    register: registerService,
 *    get: getService,
 *    exists: existsService,
 *    unset: unsetService,
 *    reset: resetServices}
 *    }
 * @constructor
 */
var ServiceManager = (function() {

  var _services = {};

  return {
    getRegistered: getRegisteredServices,
    register: registerService,
    get: getService,
    exists: existsService,
    unset: unsetService,
    reset: resetServices
  };

  /**
   * Return a list of registered services
   * @return {Array<string>}
   */
  function getRegisteredServices() {
    return Object.keys(_services);
  }

  /**
   *
   * Register a new service
   * @param {string} serviceName The service name
   * @param {*} service The service, should be any kind of data
   * @throws {Error} If a service with tha same name already exists
   */
  function registerService(serviceName, service) {
    if (this.exists(serviceName)) {
      throw new Error('A service named [' + serviceName + '] already registered.');
    }
    _services[serviceName] = service;
  }

  /**
   * Unset a registered service
   * @param {string} serviceName The service name
   */
  function unsetService(serviceName) {
    delete _services[serviceName];
  }

  /**
   * Get a registered service
   * @param {string} serviceName The service name
   * @return {*}
   * @throws {Error} If a service with tha same name doesn't exist
   */
  function getService(serviceName) {
    if (!this.exists(serviceName)) {
      throw new Error('Service [' + serviceName + '] not exists.');
    }
    return _services[serviceName];
  }

  /**
   * Check if a service exists
   * @param {string} serviceName The service name
   * @return {boolean}
   */
  function existsService(serviceName) {
    return _services[serviceName] !== undefined;
  }

  /**
   * Reset all services, used mainly for testing purpouse
   */
  function resetServices() {
    _services = {};
  }
})();

module.exports = ServiceManager;
