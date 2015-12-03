var mongoose = require('mongoose');
var dbName = require('../config').mongo;

//set up the model for the survey_questions collection
var studentOrg = mongoose.model('student_orgs', mongoose.Schema(require('../config').orgSchema));
