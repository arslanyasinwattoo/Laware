var mongo  = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

function mongoCRUD() {
	
	that = this;
	var collection;
	
	//mongo.connect("mongodb://localhost:27017/laware", function(err, db){
	mongo.connect("mongodb://arslanyasinwattoo:Arslan-03144214002@laware-shard-00-00-xq7dc.mongodb.net:27017,laware-shard-00-01-xq7dc.mongodb.net:27017,laware-shard-00-02-xq7dc.mongodb.net:27017/Laware?ssl=true&replicaSet=Laware-shard-0&authSource=admin", function(err, db){
	if(err) { 
			return console.dir(err); 
		}
		console.log("Connected to mongodb");
		
		collection = db.collection('users', function(err, collection) {
			if(err) {
				console.log("Error with collection:");
				console.log(err);
			}
		});
	});
	
	/**
	*	Loads the student list from the database collection
	*/
	that.retrieveUsers = function(callback) {
		console.log("Retrieving Users list...");
		collection.find().toArray(function(err, items) {
			callback(items);
		});
	}
	
	/**
	 * Retrieves a single user
	 */ 
	that.retrieveUser = function(id, callback) {		
		// create ObjectId as identification criterion
		user = {	'_id': new ObjectId(id) };	
		collection.findOne(user, function(err, items) {
			callback(items);
		});		
	}
	
	/**
	 * Saves a new user to the database. 
	 * Returns full user object including the id!
	 */
	that.saveUser = function(user, callback) {
		collection.insert(user, function(err, result){
			if(err) {
				Console.log("Error: "+err);
				callback(null);
			}
			else {
				callback(result['ops']);
			}
		});
	}
	
	/**
	 * Update name of existing user
	 */
	that.updateUser = function(user, callback) {
		collection.update({"_id":new ObjectId(user._id)}, 
					      {$set:{firstName:user.firstName,lastName:user.lastName}}, {w:1}, 
		function(err, result) {
			if(err) {
				console.log(err);
			}
		});
		callback(user);
	}
	
	/**
	 * Deleting Students
	 */
	that.deleteUser = function(id, callback) {
		collection.remove({"_id":new ObjectId(id)}, function(err, result) {
			if(err) {
				console.log(err);
				callback(null);
			}
		});
		callback(true);
	}

}

module.exports = new mongoCRUD();
