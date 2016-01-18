var mongoose = require('mongoose');

var config = require('../config');

var dbName = config.mongo;

exports.createModel = function(collectionName, schema){
	var model = mongoose.model(collectionName, mongoose.Schema(schema));
	return model;
};

var connection = mongoose.connection;
connection.on('open', function(){
	console.log('connected to database at ' + dbName);
});
process.on('exit', function(){
	mongoose.disconnect();
});

mongoose.connect(dbName);
