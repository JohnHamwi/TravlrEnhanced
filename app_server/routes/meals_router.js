// Import the express module and create a router object
var express = require('express');
var router = express.Router();  // Create an instance of the express Router to handle routing

// Import the meals controller which contains logic for handling requests to the meals page
const controller = require('../controllers/meals_controller');  // Load the meals controller for meals page logic

/* GET meals page route */
// When a GET request is made to the root URL ('/'), the 'meals' function from the meals controller is executed
router.get('/', controller.meals);

// Export the router module so it can be used in the main application
module.exports = router;
