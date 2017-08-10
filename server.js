var restify = require('restify');
var users = require('./UserController');
var venue= require('./VenueController');
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
server.get('api/venues/:id', venue.getById);	// Single venue by id
server.get('api/venues/name/:name', venue.getByName);	// Single venue by name
server.post('api/venues',    venue.post);	// Create a venue
server.put('api/venues/:id', venue.put);		// Update a venue
server.del('api/venues/:id', venue.del);		// Delete a venue

server.listen(process.env.PORT||port, function() {
	console.log("Listening on port "+port);
});