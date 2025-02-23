const express = require('express');  // Importing express to create routes
const router = express.Router();     // Creating an instance of the express router
const jwt = require('express-jwt');  // Importing express-jwt middleware for JWT authentication

// JWT authentication middleware setup
const auth = jwt({
    secret: process.env.JWT_SECRET,  // Secret key for verifying the JWT token, stored in environment variables
    userProperty: 'payload',         // Adds the payload (user data) to the request object
    algorithms: ['HS256']            // Algorithm used to sign the JWT token
});

// Importing the authentication and trips controller
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

// Route for user login
router
    .route('/login')
    .post(authController.login);     // POST request to login, calls the login method from authController

// Route for user registration
router
    .route('/register')
    .post(authController.register);  // POST request to register, calls the register method from authController

// Route for getting the list of trips and adding a new trip
router
    .route('/trips')
    .get(tripsController.tripsList)          // GET request to retrieve the list of trips
    .post(auth, tripsController.tripsAddTrip);  // POST request to add a new trip, protected by JWT auth middleware

// Route for finding a trip by tripCode and updating the trip
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)      // GET request to retrieve a trip by its trip code
    .put(auth, tripsController.tripsUpdateTrip); // PUT request to update a trip by trip code, protected by JWT auth middleware

// Export the router so it can be used in other parts of the application
module.exports = router;
