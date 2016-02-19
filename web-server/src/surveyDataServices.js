var database = require('./databaseServices');

var modelName = 'survey_questions';

//set up the model for the survey_questions collection
database.createModel(modelName, require('../config').surveyQuestionSchema);

/*
 * gets tags associated with all questions with an id in ids
 * ids: the ids of the questions
 * callback: a function that takes the collection of tags
 */
exports.getQuestionsTagsByIds = function(ids, callback) {
	database.getModel(modelName, function(err, model){
	   model.find({
		   '_id': { $in: ids }
	   }, function(findErr, questions){
		   if(!findErr) {
			   var tags = [];
			   var i = 0;
			   for(i; i < questions.length; i++) {
				   var j = 0;
				   for(j; j < questions[i].tags.length; j++){
					   tags.push(questions[i].tags[j]);
				   }
			   }
			   callback(tags);
		   }
		   else{
			   callback([]);    // this is a temporary solution to the possibilty the callback isn't reached
		   }
	   });
   });
}

/*
 * adds one survey question to the database
 * question: the question to add
 * callback: a function that takes an error object and an object representing the saved question document
 */
exports.addQuestion = function(question, callback){
    database.getModel(modelName, function(err, model){
		var newQuestion = new model(question);
		newQuestion.save(function(saveErr, savedQuestion){
			callback(saveErr, savedQuestion._doc);
		});
	});
};

/*
 * retreives a question from the database based on its _id
 * questionID: the id of the question to return
 * callback: a function that takes an error object and the question matching the id given
 */ 
exports.getQuestionById = function(questionId, callback){
    database.getModel(modelName, function(err, model){
		model.findById(questionId, function(findErr, question) {
			callback(findErr, question);
		});
	});
};

/*
 * gets all of the survey questions from the database
 * sortType: the attribute to sort by
 * success: a function to call upon successful completion. it takes an object that contains the survey questions
 * error: a function to call if there is an error. it takes an error object
 */
exports.getAllQuestions = function(sortType, success, error){
	database.getModel(modelName, function(err, model){	
		var sort_order = {};
		sort_order[sortType] = 1;
		model.find({}, function(findErr, questions) {
			if(findErr){
				error(findErr);
			}
			else{
				var questionsMap = {}; 
				questions.forEach(function(question) {
					questionsMap[question._id] = question;
				});
				success(questionsMap);
			}
		}).sort( sort_order );
	});
};


exports.deletequestion = function(questionId, success, error) {
	surveyQuestion.find({ _id: questionId}).remove().exec(function(err) {
		if(err) {
			error(new Error('Unable to delete item with id: ' + questionId));
		}
		success();
	});
};

