// Import necessary modules
const passport = require('passport'); // Passport.js library for authentication
const LocalStrategy = require('passport-local').Strategy; // Strategy for local authentication (username/password)
const mongoose = require('mongoose'); // Mongoose for interacting with MongoDB
const User = mongoose.model('users'); // Reference to the User model (assumed to be previously defined)

// Configure the local authentication strategy using Passport.js
passport.use(new LocalStrategy({
        usernameField: 'email' // Specify that the email field will be used as the username
    },
    // Function to handle the authentication logic
    (username, password, done) => {
        // Find a user in the database based on the email (username)
        User.findOne({ email: username }, (err, user) => {
            // If there’s an error during the query, return the error
            if (err) { return done(err); }

            // If no user is found, authentication fails (incorrect username)
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.' // Error message for incorrect username
                });
            }

            // If the user is found but the password is incorrect, authentication fails
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.' // Error message for incorrect password
                });
            }

            // If the username and password are correct, return the user object (successful authentication)
            return done(null, user);
        });
    }
));
