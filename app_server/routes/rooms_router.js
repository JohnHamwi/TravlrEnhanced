// Import the express module and create a router object
var express = require('express');
var router = express.Router();  // Create a new router instance

// Import the rooms controller, which contains the logic to handle requests for the rooms page
const controller = require('../controllers/rooms_controller');  // Load the controller for handling rooms-related logic

/* GET rooms page route */
// When a GET request is made to the root URL ('/'), the 'rooms' function from the rooms controller is executed
router.get('/', controller.rooms);

// Export the router so it can be used in other parts of the application
module.exports = router;
