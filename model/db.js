var db;
var settings = require('../settings');
var mongoose = require('mongoose');
exports.connect = function()
{
    mongoose.connect('mongodb://'+settings.host + '/' + settings.db);
	db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open',function callback() {
		console.log('yay!');
	});  
	return db;
}

exports.db = db;
exports.mongoose = mongoose;
