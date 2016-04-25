var assert = require('assert');
var request = require('supertest');
var express = require('express');
var bodyParser = require('body-parser');
var userDataServices = require('../../src/userDataServices');

var userSettings = require('../../src/routes/userSettings.js');

var app = express()
app.use(bodyParser.json());
app.use('/test/userSettings', userSettings);

var fakeUser = {
    username: 'name',
    Password: 'password'
};

var fakeUser2 = {
    username: 'name2',
    Password: 'password2'
};

var fakeUsers = [
    fakeUser,
    fakeUser2
];

var realGetAllUsers = userDataServices.getAllUsers;

var fakeGetAllUsers = function(success, error){
    success(fakeUsers);
};


var realDeleteUser = userDataServices.deleteUser;

var fakeDeleteUser = function(id, success, error){
    success();
};


var realAddUser = userDataServices.addUser;

var fakeAddUser = function(user, callback){
    callback(null, user);
};


var realEditUser = userDataServices.editUser;

var fakeEditUser = function(user, id, success, error){
    success();
};

describe('#routes/userSettings', function(){
    
    describe('GET /', function(){
        
        it('should request all users from database', function(done){
            var called = false
            userDataServices.getAllUsers = function(success, error){
                called = true;
                success(fakeUsers);
            };

            request(app)
            .get('/test/userSettings')
            .expect({}, function(){
                assert(called);
                userDataServices.getAllUsers = realGetAllUsers;
                done();
            });
        });
        
        it('should send all users found in database', function(done){
           userDataServices.getAllUsers = fakeGetAllUsers;

            request(app)
            .get('/test/userSettings')
            .expect({}, function(req, res){
                assert.deepEqual(res.body, fakeUsers);
                userDataServices.getAllUsers = realGetAllUsers;
                done();
            });
        });
    });
    
    describe('DELETE /delete', function(){
        
        it('should request the user be removed from the database', function(done){
            var called = false;
            userDataServices.deleteUser = function(id, success, error){
                called = true;
                assert.equal(id, 5);
                success();
            };

            request(app)
            .del('/test/userSettings/delete/5')
            .expect({}, function(req, res){
                assert(called);
                userDataServices.deleteUser = realDeleteUser;
                done();
            });
        });
        
        it('should send 200 if the user is successfuly removed', function(done){
            userDataServices.deleteUser = fakeDeleteUser;

            request(app)
            .del('/test/userSettings/delete/5')
            .expect(200, function(err, res){
                userDataServices.deleteUser = realDeleteUser;
                done(err);
            });     
        });
    });
    
    describe('PUT /addNew', function(){
        
        it('should request the user be added to the database', function(done){
            var called = false;
            userDataServices.addUser = function(user, callback){
                called = true;
                assert.equal(user.username, fakeUser.username);
                callback(null, user);
            };
            
            request(app)
            .put('/test/userSettings/addNew')
            .send({user: fakeUser})
            .expect({}, function(){
                assert(called);
                userDataServices.addUser = realAddUser;
                done();
            });
        });

        it('should create a hashed password for the user', function(done){
            var called = false;
            userDataServices.addUser = function(user, callback){
                called = true;
                assert.notEqual(user.Password, fakeUser.Passowrd);
                callback(null, user);
            };
            
            request(app)
            .put('/test/userSettings/addNew')
            .send({user: fakeUser})
            .expect({}, function(){
                assert(called);
                userDataServices.addUser = realAddUser;
                done();
            });
        });
        
        it('should send 200 if the user is successfuly added', function(done){
            userDataServices.addUser = fakeAddUser;

            request(app)
            .put('/test/userSettings/addNew')
            .send({user: fakeUser})
            .expect(200, function(err, res){
                userDataServices.addUser = realAddUser;
                done(err);
            });         
        });
    });
    
    describe('PUT /editExisting', function(){
        
        it('should request the user be updated in the database', function(done){
            called = false;
            userDataServices.editUser = function(user, id, success, error){
                called = true;
                assert.equal(id, 5);
                assert.deepEqual(user, fakeUser);
                success();
            };

            request(app)
            .put('/test/userSettings/editExisting/5')
            .send({user: fakeUser})
            .expect({}, function(){
                assert(called);
                userDataServices.editUser = realEditUser;
                done();
            });
        });
        
        it('should send 200 once the user is updated', function(done){
            userDataServices.editUser = fakeEditUser;

            request(app)
            .put('/test/userSettings/editExisting/5')
            .send({user: fakeUser})
            .expect(200, function(err, res){
                userDataServices.editUser = realEditUser;
                done(err);
            });
        });
    });
});

