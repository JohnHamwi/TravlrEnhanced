// Import necessary modules
const passport = require('passport'); // Passport.js for authentication
const mongoose = require('mongoose'); // Mongoose for database interaction
const User = mongoose.model('users'); // Reference to the User model (assumed to be previously defined)

// Function to handle user registration
const register = (req, res) => {
    // Check if all required fields are provided in the request body
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400) // Send a 400 Bad Request status if any field is missing
            .json({"message": "All fields required"}); // Error message
    }
    
    // Create a new instance of the User model
    const user = new User();
    user.name = req.body.name; // Assign name from the request body
    user.email = req.body.email; // Assign email from the request body
    user.setPassword(req.body.password); // Use the setPassword method to hash the password

    // Save the new user to the database
    user.save((err) => {
        if (err) {
            res
                .status(400) // Send a 400 status if there’s an error saving the user
                .json(err); // Return the error message
        } else {
            // Generate a JWT token if the user is successfully registered
            const token = user.generateJwt();
            res
                .status(200) // Send a 200 OK status
                .json({token}); // Return the generated JWT token
        }
    });
};

// Function to handle user login
const login = (req, res) => {
    // Check if both email and password are provided in the request body
    if (!req.body.email || !req.body.password) {
        return res
            .status(400) // Send a 400 Bad Request status if any field is missing
            .json({"message": "All fields required"}); // Error message
    }

    // Use Passport.js to authenticate the user with the 'local' strategy
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res
                .status(404) // Send a 404 status if an error occurs during authentication
                .json(err); // Return the error message
        }
        if (user) {
            // If the user is authenticated, generate a JWT token
            const token = user.generateJwt();
            res
                .status(200) // Send a 200 OK status
                .json({token}); // Return the generated JWT token
        } else {
            // If authentication fails, send a 401 Unauthorized status with the failure info
            res
                .status(401)
                .json(info); // Return the authentication failure message
        }
    })(req, res); // Invoke the passport middleware
};

// Export the register and login functions for use in other parts of the application
module.exports = {
    register,
    login
};
