// Import the express module and create a router object
var express = require('express');
var router = express.Router();  // Create a new router instance

/* GET users listing route */
// When a GET request is made to the root URL ('/'), this function is executed
router.get('/', function(req, res, next) {
  // Send a simple text response for the request
  res.send('respond with a resource');
});

// Export the router so it can be used in other parts of the application
module.exports = router;
