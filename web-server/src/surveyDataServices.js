var mongoose = require('mongoose');
var dbName = require('../config').mongo;

//set up the model for the survey_questions collection
var surveyQuestion = mongoose.model('survey_questions', mongoose.Schema(require('../config').surveyQuestionSchema));

var connected = false;

/*
 * setup the connection to the database
 */
exports.connect = function(){
	if(!connected){
		mongoose.connect(dbName);
		var db = mongoose.connection;
		db.on('error', function(){
			console.error.bind(console, 'connection error:');
			mongoose.disconnect();
		});
		db.once('open', function() {
			connected = true;
		});
	}
};

/*
 * disconnects from the mongo server
 */
 exports.disconnect = function(){
	 if(connected){
		mongoose.disconnect(function(){
			connected = false;
		});
	}
 };
 
/*
 * adds one survey question to the database
 * question: the question to add
 * callback: a function that takes an error object and an object representing the saved question document
 */
exports.addQuestion = function(question, callback){
	if(connected){
		var newQuestion = new surveyQuestion(question);
		newQuestion.save(function(err, savedQuestion){
			callback(err, savedQuestion._doc);
		});
	}
	else{
		callback('ERR: Not connected to database', null);
	}
};

/*
 * retreives a question from the database based on its _id
 * questionID the id of the question to return
 * callback a function that takes an error object and the question matching the id given
 */ 
exports.getQuestionById = function(questionId, callback){
	if(connected){
		surveyQuestion.findById(questionId, callback); 
	}
	else{
		callback('ERR: Not connected to database', null);
	}
}

/*
 * gets all of the survey questionsfrom the database
 * sortType: the attribute to sort by
 * success: a function to call upon successful completion. it takes an object that contains the survey questions
 * error: a function to call if there is an error. it takes an error object
 */
exports.getAllQuestions = function(sortType, success, error){
	if(connected){
		var sort_order = {};
		sort_order[sortType] = 1;
		surveyQuestion.find({}, function(err, questions) {
			var questionsMap = {}; 
			questions.forEach(function(question) {
				questionsMap[question._id] = question;
			});
			success(questionsMap);
		}).sort( sort_order );
	}
	else{
		error('ERR: Not connected to database', null);
	}
};

