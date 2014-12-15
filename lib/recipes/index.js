'use strict';

var name = 'Recipes';

exports.name = name;

exports.attach = function(options){
  this.resources = this.resources || {};
  this.resources[name] = require('./resources')(options.resourceful);

  if (!options.storageOptions.uri){
    options.storageOptions.uri = (options.storageOptions.prefix || 'resource') +
      '_' + name;
  }

  /**
   * Specify a storage engine:
   */

  this.resources[name].use(options.storage || 'memory', options.storageOptions);

  /**
   * The routes for managing the resources are handled by Flatiron's
   * restful module:
   */

  this.resources[name].restful = true;
};
