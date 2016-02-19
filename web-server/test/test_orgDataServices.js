var assert = require('assert');
var mongoose = require('mongoose');
var async = require('async');

var config = require('../config');
var realDbName = config.mongo;
var fakeDbName = 'mongodb://localhost/test';
config.mongo = fakeDbName;

var orgDataServices = require('../src/orgDataServices');
var database = require('../src/databaseServices');

var fakeErr = new Error('This is a fake error');

var fakeModel = {
	find: function(obj, callback){
		callback(fakeErr, null);
	}
};

var fakeModel2 = {
	find: function(obj){
		return {
			lean: function(){
				return {
					exec: function(callback){
						callback(fakeErr, null);
					}
				};
			}
		};
	}
};

var realGetModel = database.getModel;

var fakeGetModel = function(modelName, callback){
	callback(null, fakeModel);
};

var fakeGetModel2 = function(modelName, callback){
	callback(null, fakeModel2);
};

var fakeTags = [
    'tag1',
    'tag2',
    'tag3'
];

var fakeTags2 = [
    'tag4',
    'tag5',
    'tag6'
];

var inactiveTags = [
    'inactive',
    'tag2',
    'tag6'
];

var fakeOrg = {
    name: 'name',
    description: 'description',
    tags: fakeTags,
    contact: {
        name: 'name',
        email: 'name@email.com',
        phone: '(123)456-7890'
    }
};

var fakeOrg2 = {
    name: 'name2',
    description: 'description2',
    tags: fakeTags2,
    contact: {
        name: 'name2',
        email: 'name2@email.com',
        phone: '(123)456-7899'
    }
};

var inactiveOrg = {
    name: 'inactive org',
    description: 'this org is inactive',
    tags: inactiveTags,
    contact: {
        name: 'noone',
        email: 'noone@domain.com',
        phone: '(000)000-0000'
    }
};

describe('orgDataServices', function () {
    
    describe('#addStudentOrg', function() {
        
        afterEach(function() {
            var connection = mongoose.connection;
            connection.db.dropDatabase();
        });
        
        it('should not send error to callback if successful.', function(done){
            orgDataServices.addStudentOrg(fakeOrg, function(err, savedOrg){
                assert.equal(err, null);
                done();
            });
        });
        
        it('should save new org', function(done) {
            orgDataServices.addStudentOrg(fakeOrg, function(err, savedOrg){
                assert.deepEqual({
                    name: savedOrg.name,
                    description: savedOrg.description,
                    tags: savedOrg.tags.toObject(),
                    contact: savedOrg.contact
                }, fakeOrg);
                done();
            });
        });
    });
    
    describe('#getAllOrgs', function() {
        
        afterEach(function() {
            var connection = mongoose.connection;
            connection.db.dropDatabase();
        });
        
        it('should find all documents', function(done){
            async.parallel([
                function(callback){
                    orgDataServices.addStudentOrg(fakeOrg, function(err, savedOrg){
                        callback();
                    });
                },
                function(callback){
                    orgDataServices.addStudentOrg(fakeOrg, function(err, savedOrg){
                        callback();
                    });
                },
                function(callback){
                    orgDataServices.addStudentOrg(fakeOrg, function(err, savedOrg){
                        callback();
                    });
                }],
                function(){                         
                    orgDataServices.getAllOrgs('name', function(orgs){
                        var size = 0;
                        for( org in orgs){
                            size++;
                        }
                        assert.equal(size, 3);
                        done();
                    }, function(){});
                }
            );
        });
    });

    describe('#getOrgsMatchingTags', function() {
        
        afterEach(function() {
            var connection = mongoose.connection;
            connection.db.dropDatabase();
        });
        
        it('should send empty array if there is an error', function(done){
            orgDataServices.addStudentOrg(fakeOrg, function(err, org){
				database.getModel = fakeGetModel2;
				orgDataServices.getOrgsMatchingTags(fakeTags, function(docs){
					database.getModel = realGetModel;
					assert.deepEqual(docs, []);
					done();
				});
			});
        });
        
        it('should return empty array if no orgs match', function(done){
            orgDataServices.getOrgsMatchingTags(fakeTags, function(docs){
                assert.deepEqual(docs, []);
                done();
            });
        });
        
        it('should return all matching orgs', function(done){
            orgDataServices.addStudentOrg(fakeOrg, function(err, org){
                orgDataServices.addStudentOrg(fakeOrg2, function(err, org2){
                   orgDataServices.getOrgsMatchingTags(fakeTags.concat(fakeTags2), function(docs){
                      
                      // create a new array with only the info we need
                      var savedOrgs = [];
                      savedOrgs[0] = {};
                      savedOrgs[1] = {};
                      savedOrgs[0].name = docs[0].name;
                      savedOrgs[0].description = docs[0].description;
                      savedOrgs[0].tags = docs[0].tags;
                      savedOrgs[0].contact = docs[0].contact;
                      savedOrgs[1].name = docs[1].name;
                      savedOrgs[1].description = docs[1].description;
                      savedOrgs[1].tags = docs[1].tags;
                      savedOrgs[1].contact = docs[1].contact;

                      assert.deepEqual(savedOrgs, 
                      [
                        fakeOrg,
                        fakeOrg2
                      ]);
                      done(); 
                   }); 
                });
            });
        });
    });
    
    describe('#deleteOrg', function() {
    
        afterEach(function(){
            var connection = mongoose.connection;
            connection.db.dropDatabase();
        });    
        
        it('should call error function if org does not exist', function(done){
            orgDataServices.deleteOrg(12345, 
            function(){
               assert.fail(); 
            },
            function(err){
                assert.notEqual(err,null);
                done();
            });
            
        });
        
        it('should call success if removal successful', function(done){
            orgDataServices.addStudentOrg(fakeOrg, function(err, org){
               orgDataServices.deleteOrg(org._id, 
               function(){
                   done();
               },
               function(){
                   assert.fail();
               });
            });
        });
    });
    
    describe('#getAllTags', function() {
        
        afterEach(function(){
            var connection = mongoose.connection;
            connection.db.dropDatabase();
        });
        
        it('should return all tags from active clubs', function(done){
             orgDataServices.addStudentOrg(fakeOrg, function(err, org){
                orgDataServices.addStudentOrg(inactiveOrg, function(err, org2){
					orgDataServices.getAllTags(
					function(tags){
						assert.deepEqual(tags.sort(), fakeTags.concat(['inactive']).sort());
						done();
					},
					function(err){
						assert.fail();
					});
				});
			});
		});
        
        it('should not return tags only used by inactive clubs', function(done){
            orgDataServices.addStudentOrg(fakeOrg, function(err, org){
                orgDataServices.addStudentOrg(inactiveOrg, function(err, org2){
					orgDataServices.getAllTags(
					function(tags){
						assert.equal(-1, tags.indexOf('tag6'));
						done();
					},
					function(err){
						assert.fail();
					});
				});
			});
        });
        
        it('should call error function if there is an error', function(done){
			database.getModel = fakeGetModel;
			orgDataServices.getAllTags(
			function(tags){
				database.getModel = realGetModel;
				assert.fail();
			},
			function(err){
				database.getModel = realGetModel;
				assert.notEqual(err, null);
				done();
			});
        });
    });
    
    describe('#searchByTags', function() {
        
        afterEach(function(){
            var connection = mongoose.connection;
            connection.db.dropDatabase();
        });
        
        it('should return all orgs matching tag list', function(done){
            orgDataServices.addStudentOrg(fakeOrg, function(err, org){
                orgDataServices.addStudentOrg(fakeOrg2, function(err, org2){
					orgDataServices.searchByTags([
					'tag1',
					'tag4'
					],
					function(orgs){
						assert.equal(orgs.length, 2);
						done();
					},
					function(err){
						assert.fail();
					});
				});
			});
        });
        
        it('should not return inactive orgs', function(done){
			 orgDataServices.addStudentOrg(fakeOrg, function(err, org){
                orgDataServices.addStudentOrg(inactiveOrg, function(err, org2){
					orgDataServices.searchByTags([
					'tag2'
					],
					function(orgs){
						assert.equal(orgs.length, 1);
						assert.equal(orgs[0].name, fakeOrg.name);
						done();
					},
					function(err){
						assert.fail();
					});
				});
			});
		});
        
        it('should return orgs in order of most matched tags', function(done){
            orgDataServices.addStudentOrg(fakeOrg, function(err, org){
                orgDataServices.addStudentOrg(fakeOrg2, function(err, org2){
					orgDataServices.searchByTags([
					'tag1',
					'tag5',
					'tag6'
					],
					function(orgs){
						assert.equal(orgs.length, 2);
						assert.equal(orgs[0].name, fakeOrg2.name);
						assert.equal(orgs[1].name, fakeOrg.name);
						done();
					},
					function(err){
						assert.fail();
					});
				});
			});
        });
        
        it('should call error function if there is an error', function(done){
            database.getModel = fakeGetModel;
            orgDataServices.searchByTags([],
            function(orgs){
				database.getModel = realGetModel;
				assert.fail();
			},
			function(err){
				database.getModel = realGetModel;
				assert.notEqual(null, err);
				done();
			});
        });
    });
});
