var database = require('./databaseServices');
var dbName = require('../config').mongo;

//set up the model for the survey_questions collection
var surveyQuestion = database.createModel('survey_questions', require('../config').surveyQuestionSchema);

/*
/*
 * setup the connection to the database
 * /
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
 * /
 exports.disconnect = function(){
     if(connected){
        mongoose.disconnect(function(){
            connected = false;
        });
    }
 };
 */

exports.getQuestionsByIds = function(ids, callback) {
    surveyQuestion.find({
        '_id': { $in: ids }
        }, function(err, docs){
            if(!err) {
                callback(docs);
            }
    });
}
 
/*
 * adds one survey question to the database
 * question: the question to add
 * callback: a function that takes an error object and an object representing the saved question document
 */
exports.addQuestion = function(question, callback){
    var newQuestion = new surveyQuestion(question);
    newQuestion.save(function(err, savedQuestion){
        callback(err, savedQuestion._doc);
    });
};

/*
 * retreives a question from the database based on its _id
 * questionID the id of the question to return
 * callback a function that takes an error object and the question matching the id given
 */ 
exports.getQuestionById = function(questionId, callback){
    surveyQuestion.findById(questionId, function(err, question) {
        callback(question, err);
    });
};
// exports.getQuestionById = function(questionId, callback){
//     surveyQuestion.findById(questionId, callback); 
// };

/*
 * gets all of the survey questions from the database
 * sortType: the attribute to sort by
 * success: a function to call upon successful completion. it takes an object that contains the survey questions
 * error: a function to call if there is an error. it takes an error object
 */
exports.getAllQuestions = function(sortType, success, error){
    var sort_order = {};
    sort_order[sortType] = 1;
    surveyQuestion.find({}, function(err, questions) {
        if(err){
            error(err);
        }
        else{
            var questionsMap = {}; 
            questions.forEach(function(question) {
                questionsMap[question._id] = question;
            });
            success(questionsMap);
        }
    }).sort( sort_order );
};

