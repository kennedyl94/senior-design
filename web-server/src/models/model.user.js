var mongoose = require('mongoose');
var config = require('../../config');

var userSchema = mongoose.Schema(config.userSchema);

//userSchema.methods.generateHash = function(password) {
//    return bcrypt.hashSync(bcrypt.getSaltSync(8), null);
//};

//userSchema.methods.validatePassword = function(password) {
//    return bcrypt.compareSync(password, this.local.password);
//};

module.exports = mongoose.model("User", userSchema);