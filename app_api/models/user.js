const mongoose = require('mongoose');  // Importing mongoose for MongoDB schema and model creation
const crypto = require('crypto');      // Importing crypto for password hashing and salt generation
const jwt = require('jsonwebtoken');   // Importing jsonwebtoken for generating JWT tokens

// Define the schema for users, including email, name, hash, and salt
const userSchema = new mongoose.Schema({
    email: {
        type: String,       // Email field (must be a string)
        unique: true,       // Email must be unique for each user
        required: true      // Email is required
    },
    name: {
        type: String,       // Name field (must be a string)
        required: true      // Name is required
    },
    hash: String,           // Stores the password hash
    salt: String            // Stores the salt used for password hashing
});

// Method to set password by generating a salt and hashing the password
userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');  // Create a random salt
    this.hash = crypto.pbkdf2Sync(password, this.salt,   // Hash the password using PBKDF2 with the salt
        1000, 64, 'sha512').toString('hex');             // 1000 iterations, 64-byte key, sha512 hashing algorithm
};

// Method to validate password by comparing the provided password with the stored hash
userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password,               // Hash the provided password using the stored salt
        this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;                           // Compare the hashed password with the stored hash
};

// Method to generate a JWT token for the user, setting it to expire in 7 days
userSchema.methods.generateJwt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);                // Set the token to expire in 7 days

    // Return a signed JWT token with user details and expiration
    return jwt.sign({
        _id: this._id,                                   // User ID
        email: this.email,                               // User email
        name: this.name,                                 // User name
        exp: parseInt(expiry.getTime() / 1000, 10),      // Expiry date in seconds since the Unix epoch
    }, process.env.JWT_SECRET);                          // Use the secret key from environment variables
};

// Compile the model named 'users' using the userSchema schema
mongoose.model('users', userSchema);
