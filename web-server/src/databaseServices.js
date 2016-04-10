var mongoose = require('mongoose');
var config = require('../config');
var dbName = config.mongo;

var models = [];

exports.createModel = function(collectionName, schema){
	var model = mongoose.model(collectionName, mongoose.Schema(schema));
	models[collectionName] = model;
};

exports.getModel = function(collectionName, callback){
	var model = models[collectionName];
	if(!model){
		callback(new Error('Model ' + collectionName + ' does not exist. Make sure it was created before using it.'), null);
	}
	else{
		callback(null, model);
	}
};

exports.removeModel = function(collectionName){
	models[collectionName] = undefined;
}

var connection = mongoose.connection;
connection.on('open', function(){
	console.log('connected to database at ' + dbName);
});
// process.on('SIGINT', function(){
// 	mongoose.disconnect();
// });

mongoose.connect(dbName);
