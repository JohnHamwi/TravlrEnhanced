// Import the express module and create a router object
var express = require('express');
var router = express.Router();  // Router instance to handle routes

// Import the controller that handles the 'about' page functionality
const controller = require('../controllers/about_controller');  // Load the controller for the about page

/* GET about page route */
// When the user accesses the root URL ('/'), the 'about' function from the controller is called
router.get('/', controller.about);

// Export the router module so it can be used in other parts of the application
module.exports = router;
