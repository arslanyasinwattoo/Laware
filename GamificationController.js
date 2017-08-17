var dbase = require("./messageDao");

function GamificationController() {

	that = this;
	
	// Get the list of all gamification
	that.get = function(req, res, next) {
		dbase.retrieveGamifications(req.params.id,function(gamification) {
			res.send(200, gamification);
		});		
		return next();
	};
	// Get list of gamification of user
	that.getById = function(req, res, next) {
		gamification = dbase.retrieveGamificationById(req.params.id,function(gamification) {
			if(gamification != null) {
				res.send(200, gamification);
			} else {
				res.send(404, "gamification not found");
			}
		});	
		return next();
	};
	// Create a new gamification
	that.post = function(req, res, next) {
		console.log(req.body);
		if(!req.body.hasOwnProperty('userId','badgeName')) {
			res.send(500, "Insufficient parameters, ids required!"); 	// Internal Server Error
		} else {
			var gamification = {
                userId:req.body.userId,
                badgeName:req.body.badgeName
			};			
			gamifiy = dbase.retrieveGamificationByBadgeId(gamification.userId,gamification.badgeName,function(gamifiy) {
			if(gamifiy != null) {
		//checks if badgename is unique
		if(gamifiy.badgeName!=gamification.badgeName){
	//if unique then add badge name
			dbase.saveGamification(gamification, function(gamification){
				console.log('gamification added: _id '+gamification._id+' userID:'+gamification.userId+' badgeName'+gamification.badgeName);
				res.send(201,gamification);	// Send "Created" code and the friend object			
			});
		}else{
			//if badge name already exists return request object
	res.send(200, gamification);
		}
		} else {
			// if no entry was found in db then add new 
			dbase.saveGamification(gamification, function(gamification){
				console.log('gamification added: _id '+gamification._id+' userID:'+gamification.userId+' badgeName'+gamification.badgeName);
				res.send(201,gamification);	// Send "Created" code and the friend object			
			});
				}
		});	
				
		}
		return next();
	};
	
	// Delete gamification of a user by id
	that.del = function(req, res, next) {
		dbase.deleteGamification(req.params.id, function(result) {
			if(!result) {
				res.send(404, "gamification not found.");
			} 
			else {
				console.log("Deleted gamification "+req.params.id);
				res.send(200, "Deleted");	// 200 ok
			}
		});		

		return next();
	};
};

module.exports = new GamificationController();