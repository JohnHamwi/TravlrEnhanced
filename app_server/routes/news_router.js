// Import the express module and create a router object
var express = require('express');
var router = express.Router();  // Create a new router instance

// Import the news controller, which contains the logic to handle requests for the news page
const controller = require('../controllers/news_controller');  // Load the controller for handling news-related logic

/* GET news page route */
// When a GET request is made to the root URL ('/'), the 'news' function from the news controller is executed
router.get('/', controller.news);

// Export the router so it can be used in other parts of the application
module.exports = router;
