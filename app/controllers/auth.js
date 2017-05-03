var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/teste';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.model('Users', new Schema({
// 	name: {
// 		type: String,
// 		required: true
// 	},
// 	email: {
// 		type: String,
// 		required: true
// 	},
// 	password: {
// 		type: String,
// 		required: true
// 	},
// }));

// var User = mongoose.model("Users");

exports.login = function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('Users').find({
			"name" : req.name,
			"password" : req.password
		}, function(err) {
			db.close();
			if (assert.equal(err, null))
			{
				res.json({
					type: true,
					data: "user: " + req.name
				}); 
			}
			else
			{
				res.json({
					type: false,
					data: "you done goofed"
				}); 
			}
		});
	});
} 

exports.logout = function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('Users').insertOne({
			"name" : "Vella"
		}, function(err) {
			console.log(err);
			assert.equal(err, null);
			db.close();
			res.json({
				type: true,
				data: "successd mofo"
			}); 
		});
	});
}