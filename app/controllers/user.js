var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/teste';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.model('Users', new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
}));

exports.list = function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		
		db.collection('Users').find().toArray().then(function (data){
			res.json({
				data: data
			});

			db.close();
		});
	});
}

exports.view = function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			
			db.collection('Users').find({
				"name" : req.params.name
			}).toArray().then(function (data){
				res.json({
					data: data
				});

				db.close();
			});
		});
	});
}

exports.insert = function(req, res, next) {
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

exports.update = function(req, res, next) {
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

exports.remove = function(req, res, next) {
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