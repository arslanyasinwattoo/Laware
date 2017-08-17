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
		
		collection = db.collection('friends', function(err, collection) {
			if(err) {
				console.log("Error with collection:");
				console.log(err);
			}
		});
	});
	/**
	*	Loads pending Friends list from the database collection
	*/
	that.retrievePendingFriends = function(id,callback) {
        console.log("Retrieving friends list...");
        friend = {	'id2':id,'pending':1};
        collection.find(friend).toArray(function(err, items) {
			callback(items);
		});
	}
	
	/**
	*	Loads the Friends list from the database collection
	*/
	that.retrieveFriends = function(id,callback) {
        console.log("Retrieving friends list...");
		friend = {	'id1':id,'pending':0};
		friend2={'id2':id,'pending':0};	
        collection.find(friend||friend2).toArray(function(err, items) {
			callback(items);
		});
	}
	
	/**
	 * Retrieves a single friend
	 */ 
	that.retrieveFriend = function(id1,id2, callback) {		
		// create ObjectId as identification criterion
		friend = {	'id1':id1, 'id2':id2};
		friend2 = {	'id1':id2, 'id2':id1};	
		collection.findOne(friend||friend2, function(err, items) {
			callback(items);
		});		
	}
	
	/**
	 * Saves a new friends to the database. 
	 * Returns full friend's object including the id!
	 */
	that.saveFriend = function(friend, callback) {
		collection.insert(friend, function(err, result){
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
	 * Update name of existing Friend
	 */
	that.updateFriend = function(friend, callback) {
		collection.update({"_id":new ObjectId(friend._id)}, 
					      {$set:{id1:friend.id1,id2:friend.id2,firstName:friend.firstName,lastName:friend.lastName,firstName2:friend.firstName2,lastName2:friend.lastName2}}, {w:1}, 
		function(err, result) {
			if(err) {
				console.log(err);
			}
		});
		callback(friend);
	}
	
	/**
	 * Deleting Friends
	 */
	that.deleteFriend = function(id, callback) {
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