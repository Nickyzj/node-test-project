var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String, bcrypt: true },
    type: { type: String },
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.saveStudent = function(newUser, newStudent, callback){
    bcrypt.hash(newUser.password, 10, function(err, hash) {
        if (err) throw err;
        newUser.password = hash;
        console.log('Student is being Saved');
        async.parallel([(callback) => newUser.save, (callback) => newStudent.save], callback);
    });
}

module.exports.saveInstructor = function(newUser, newInstructor, callback){
    bcrypt.hash(newUser.password, 10, function(err, hash) {
        if (err) throw err;
        newUser.password = hash;
        console.log('Student is being Saved');
        async.parallel([(callback) => newUser.save, (callback) => newInstructor.save], callback);
    });
}
