'use strict';

/**
 * To test a model called foo, make sure to have:
 *
 * 1. a resources definition at ../lib/foos/resources.js;
 * 2. a fixture file at ./fixtures/foos.json.
 *
 * Then invoke the tests with:
 *
 *    modelTest('Foo');
 *
 * or:
 *
 *    modelTest('Foo', function (item){
 *      // some additional tests to run on each item,
 *      // such as checking default values
 *    });
 *
 * Note the initial capital letter of the model name.
 */

var should = require('should');

describe('Generic model tests', function (){
  modelTest('Recipe', function (recipe){
    recipe['@context'].should.equal('http://schema.org');
    recipe['@type'].should.equal('Recipe');
  });
});

function modelTest(modelName, extraTests){
  var fixtures = require('./fixtures/' + modelName.toLowerCase() + 's');

  describe(modelName + 's', function(){

    /**
     * Create a model:
     */

    var Model = require('../lib/' + modelName.toLowerCase() + 's/resources')();

    var fixture = fixtures[0];
    var id = modelName;

    it('should create and delete a resource with a generated id', function(done){
      var model = new Model(fixture);

      model.save(function(err, r){
        should.not.exist(err);
        should.exist(r);
        r.should.have.property('resource', modelName);
        r.should.containEql(fixture);

        if (extraTests){
          extraTests(r);
        }

        r.destroy(function(err, res){
          should.not.exist(err);
          should.exist(res);
          res.should.have.property('status', 204);
          done();
        });
      });
    });

    it('should create a resource with id field', function(done){
      var model = new Model(fixture);

      model.id = id;

      model.save(function(err, r){
        should.not.exist(err);
        should.exist(model);
        r.should.have.property('resource', modelName);
        r.should.containEql(fixture);

        if (extraTests){
          extraTests(r);
        }

        done();
      });
    });

    it('should get resource', function(done){
      Model.get(id, function(err, r){
        should.not.exist(err);
        should.exist(r);
        r.should.have.property('resource', modelName);
        r.should.have.property('id', id);
        r.should.containEql(fixture);

        if (extraTests){
          extraTests(r);
        }

        done();
      });
    });

    it('should delete resource by id', function(done){
      Model.destroy(id, function(err, res){
        should.not.exist(err);
        should.exist(res);
        res.should.have.property('status', 204);

        done();
      });
    });
  });
}
