var dbase = require("./friendDao");

function FriendController() {

	that = this;
	
	// Get the list of all Friend
	that.get = function(req, res, next) {
		dbase.retrieveFriends(req.params.id1,function(friends) {
			res.send(200, friends);
		});		
		return next();
	};
    
    // Get the list of all Friend
	that.getPending = function(req, res, next) {
		dbase.retrievePendingFriends(req.params.id1,function(friends) {
			res.send(200, friends);
		});		
		return next();
	};
	
	// Get single Friend
	that.getById = function(req, res, next) {
		friend = dbase.retrieveFriend(req.params.id1,req.params.id2, function(friend) {
			if(friend != null) {

				//res.send(200, friend);
			} else {
				res.send(404, "Friend not found");
			}
		});
		
		return next();
	};
	// Create a new Friend
	that.post = function(req, res, next) {
		console.log(req.body);
		if(!req.body.hasOwnProperty('id1','id2','firstname','lastname','firstname2','lastname2')) {
			res.send(500, "Insufficient parameters, ids required!"); 	// Internal Server Error
		} else {
			var friend = {
                id1:req.body.id1,
                id2:req.body.id2,
				firstname : req.body.firstname,
				lastname : req.body.lastname,
				firstname2 : req.body.firstname2,
                lastname2: req.body.lastname2,
                pending:1
			};			

			dbase.saveFriend(friend, function(friend){
				console.log('friend added: _id '+friend._id+' id1:'+friend.id1+' id2:'+friend.id2+' firstName:'+friend.firstName+' lastName:'+friend.lastName+' firstName2:'+friend.firstName2+' lastName2:'+friend.lastName2);
				res.send(201,friend);	// Send "Created" code and the friend object			
			});		
		}
		return next();
	};
	
	// Update a friend
	that.put = function(req, res, next) {
		
		friend = {
			"_id" : req.params.id,
            "id1" : req.params.id1,
            "id2" : req.params.id2,
            "firstName": req.params.firstname,
			"lastName": req.params.lastname,
			"firstname2" : req.params.firstname2,
			"lastname2": req.params.lastname2,
            "pending":0
		}
		
		dbase.updateFriend(friend, function(friend) {			
			if(!friend) {
				res.send(404, "friend not found.");
			}
			console.log("Updated friend "+req.params.id);
			res.send(200, friend);	// 200 ok
		});		

		
		return next();
	};
	
	// Delete a friend
	that.del = function(req, res, next) {
		dbase.deleteFriend(req.params.id, function(result) {
			if(!result) {
				res.send(404, "frined not found.");
			} 
			else {
				console.log("Deleted Friend "+req.params.id);
				res.send(200, "Deleted");	// 200 ok
			}
		});		

		return next();
	};
};

module.exports = new FriendController();