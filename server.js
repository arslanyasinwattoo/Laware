var restify = require('restify');
var users = require('./UserController');
var venue= require('./VenueController');
var friend= require('./FriendController');
var message= require('./MessageController');
var checkin= require('./CheckinController');
var rating= require('./RatingController');
var comment= require('./CommentController');
var port = 3000;

var server = restify.createServer({
  name: 'Laware',
});

//Defining Handlers:
// logging handler
server.use(function(req, res, next) {	
	console.log("--------------");
	console.log("Request: "+req.method + ' ' +req.url);
	return next();
});

// This is needed to use POST with body information
server.use(restify.plugins.bodyParser());
// Defining Endpoints:
// Complete CRUD functionality for users
server.get('api/users',     users.get);		// List of users
server.get('api/users/:id', users.getById);	// Single users
server.post('api/users',    users.post);	// Create a users
server.put('api/users/:id', users.put);		// Update a users
server.del('api/users/:id', users.del);		// Delete a users
// Complete CRUD functionality for Venue
server.get('api/venues',     venue.get);		// List of venue
server.get('api/venues/search',venue.getNamesTypes);// unique types and names in the system
server.get('api/venues/:id', venue.getById);	// Single venue by id
server.get('api/venues/name/:name', venue.getByName);	// Single venue by name
server.get('api/venues/type/:name', venue.getByType);
server.post('api/venues',    venue.post);	// Create a venue
server.put('api/venues/:id', venue.put);		// Update a venue
server.del('api/venues/:id', venue.del);		// Delete a venue
// Complete CRUD functionality for Friends
server.get('api/friend/:id1',  friend.get);		// List of all friends
server.get('api/friend/pending/:id1',  friend.getPending);		// List of all pending friends
server.get('api/friend/:id1/id/:id2',friend.getById);// single friends data 
server.post('api/friend/', friend.post);	// Create a friend
server.put('api/friend/:id1/id/:id2', friend.put);		// Update a friend
server.del('api/friend/:id', friend.del);	// Delete a friend
// CRUD messages  for friends based on friendship id 

server.get('api/messages/',  message.get);		// get names of headers of all friends
server.get('api/messages/:id',message.getById);// get messages of  friend 
server.post('api/messages/', message.post);	// Create a Message-> based ofn friendship id 
server.del('api/messages/:id', message.del);	// Delete a Messages
//CRUD Checkins
server.get('api/checkin/',  checkin.get);		// get  all checkins
server.get('api/checkin/:id',checkin.getById);// get checkin by venue id 
//server.get('api/checkin/vistor/:id',checkin.getByIdTopVistors);// get checkin by venue id top vistors 
server.post('api/checkin/', checkin.post);	// Create a checkin
server.del('api/checkin/:id', checkin.del);	// Delete a checkin
//Crud ratings
server.get('api/rating/',  rating.get);		// get all rating
server.get('api/rating/:id',rating.getById);// get rating by venue 
server.get('api/rating/user/:id',rating.getByUserId);// get rating of user 
server.post('api/rating/', rating.post);	// Create a rating
server.del('api/rating/:id', rating.del);	// Delete a rating
//Crud Comments
server.get('api/comment/',  comment.get);		// get all rating
server.get('api/comment/:id',comment.getById);// get comments by venue id
server.get('api/comment/user/:id',comment.getByUserId);// get comments by userId 
server.post('api/comment/', comment.post);	// Create a rating
server.del('api/comment/:id', comment.del);	// Delete a rating

//custom endPoints
server.get('api/rating/likedplaces/:id',rating.getLikedPlaces);// gets a list of venues which the user gave more than 3 stars 

server.listen(process.env.PORT||port, function() {
	console.log("Listening on port "+port);
});
