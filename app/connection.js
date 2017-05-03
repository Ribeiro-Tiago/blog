var global_mongoClient = require('mongodb').MongoClient;
var global_assert = require('assert');
var global_url = 'mongodb://localhost:27017/teste';
var global_mongoose = require('mongoose');
var global_schema = mongoose.Schema;

var insertDocument = function(db, callback) {
   	db.collection('restaurants').insertOne( {
		"name" : "Vella",
		"email" : "dsad@dsadsaa.pt"
   	}, function(err, result) {
		global_assert.equal(err, null);
		console.log("Inserted a document into the restaurants collection.");
		callback();
  	});
};