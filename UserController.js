var dbase = require("./userDao");

function UserController() {

	that = this;
	
	// Get the list of all users
	that.get = function(req, res, next) {
		dbase.retrieveUsers(function(users) {
			res.send(200, users);
		});		
		return next();
	};
	
	// Get single user
	that.getById = function(req, res, next) {
		user = dbase.retrieveUser(req.params.id, function(user) {
			if(user != null) {
				res.send(200, user);
			} else {
				res.send(404, "user not found");
			}
		});
		
		return next();
	};

	// Create a new user
	that.post = function(req, res, next) {

		console.log(req.body);
		if(!req.body.hasOwnProperty('firstName','lastName','emailId','password')) {
			res.send(500, "Insufficient parameters, firstName required!"); 	// Internal Server Error
		} else {
			var user = {
				firstName : req.body.firstName,
				lastName : req.body.lastName,
				emailId : req.body.emailId,
				password: req.body.password,
				url:req.body.url
			};			

			dbase.saveUser(user, function(user){
				console.log('user added: _id '+user._id+' firstName:'+user.firstName+' lastName:'+user.lastName+' emailId'+user.emailId+' password'+user.password);
				res.send(201, user);	// Send "Created" code and the user object			
			});		
		}
		return next();
	};
	
	// Update a user
	that.put = function(req, res, next) {
		
		user = {
			"_id" : req.params.id,
			"firstName": req.params.firstName,
			"lastName": req.params.lastName,
			"emailId" : req.params.emailId,
			"password": req.params.password,
			"url":req.params.url
		
		}
		
		dbase.updateUser(user, function(user) {			
			if(!user) {
				res.send(404, "user not found.");
			}
			console.log("Updated user "+req.params.id);
			res.send(200, user);	// 200 ok
		});		

		
		return next();
	};
	
	// Delete a user
	that.del = function(req, res, next) {
		dbase.deleteUser(req.params.id, function(result) {
			if(!result) {
				res.send(404, "user not found.");
			} 
			else {
				console.log("Deleted user "+req.params.id);
				res.send(200, "Deleted");	// 200 ok
			}
		});		

		return next();
	};
};

module.exports = new UserController();