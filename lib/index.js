var _ = require('lodash');

var recipes = require('./recipes');

exports.attach = function (options){
  recipes.attach.call(this, _.cloneDeep(options));
};
