// Import the express module and create a router object
var express = require('express');
var router = express.Router();  // Create an instance of the express Router to handle routing

// Import the main controller which contains logic for handling requests to the home page
const controller = require('../controllers/main_controller');  // Load the main controller for home page logic

/* GET home page route */
// When a GET request is made to the root URL ('/'), the 'index' function from the main controller is executed
router.get('/', controller.index);

// Export the router module so it can be used in the main application
module.exports = router;
