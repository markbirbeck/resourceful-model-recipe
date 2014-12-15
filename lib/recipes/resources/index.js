'use strict';


module.exports = function (resourcefulLib){
  if (!resourcefulLib){
    resourcefulLib = require('resourceful');
  }

  return resourcefulLib.define('Recipe', function (){
    var self = this;

    self.string('@context', {default: 'http://schema.org'});
    self.string('@type', {default: 'Recipe'});

    /**
     * Define the string properties:
     */

    [
      'name',

      'url',
      'datePublished',
      'typicalAgeRange',
      'recipeYield',
      'recipeCategory',
      'recipeCuisine',
      'description',
      'image',

      'prepTime',
      'cookTime',
      'totalTime',
      'cookMethod'
    ].map(function (field){
      self.string(field);
    });

    /**
     * Define the array properties:
     */

    [
      'ingredients',
      'recipeInstructions'
    ].map(function (field){
      self.array(field);
    });

    this.timestamps();
  });
};
