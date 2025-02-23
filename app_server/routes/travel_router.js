// Import the express module and create a router object
var express = require('express');
var router = express.Router();  // Create a new router instance

// Import the travel controller, which contains the logic to handle requests for the travel page
const controller = require('../controllers/travel_controller');  // Load the controller for handling travel-related logic

/* GET travel page route */
// When a GET request is made to the root URL ('/'), the 'travelList' function from the travel controller is executed
router.get('/', controller.travelList);

// Export the router so it can be used in other parts of the application
module.exports = router;
