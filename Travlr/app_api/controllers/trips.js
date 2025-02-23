// Import required modules
const mongoose = require('mongoose');
const Trip = mongoose.model('trips'); // Reference to the Trip model
const User = mongoose.model('users'); // Reference to the User model

// GET: /trips - lists all trips
const tripsList = async (req, res) => {
    // Find all trips in the Trip collection
    Trip
        .find({})  // No filter in find() returns all trips
        .exec((err, trips) => {
            // If no trips are found, return 404 with a 'Trip not found' message
            if (!trips) {
                return res
                    .status(404)
                    .json({ "message": "Trip not found" });
            // If an error occurs during the query, return 404 with the error
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            // If trips are found, return 200 (OK) and the list of trips
            } else {
                return res
                    .status(200)
                    .json(trips);
            }
        });
};

// GET: /trips/:tripCode - returns a single trip by its code
const tripsFindCode = async (req, res) => {
    // Find a trip by its code (provided as a URL parameter)
    Trip
        .find({ 'code': req.params.tripCode })  // Use tripCode parameter to filter trips
        .exec((err, trip) => {
            // If the trip is not found, return 404 with a 'Trip not found' message
            if (!trip) {
                return res
                    .status(404)
                    .json({ "message": "Trip not found" });
            // If an error occurs, return 404 with the error
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            // If the trip is found, return 200 (OK) and the trip data
            } else {
                return res
                    .status(200)
                    .json(trip);
            }
        });
};

// POST: /trips - creates a new trip
const tripsAddTrip = async (req, res) => {
    // Use the getUser function to authenticate and get user details
    getUser(req, res, (req, res) => {
        // Create a new Trip document with the provided request body data
        Trip
            .create({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            (err, trip) => {
                // If an error occurs, return 400 (Bad Request) with the error
                if (err) {
                    return res
                        .status(400)
                        .json(err);
                // If successful, return 201 (Created) and the new trip
                } else {
                    return res
                        .status(201)
                        .json(trip);
                }
            });
    });
};

// PUT: /trips/:tripCode - updates a trip with the given tripCode
const tripsUpdateTrip = async (req, res) => {
    // Use getUser to authenticate and get user details
    getUser(req, res, (req, res) => {
        // Log the incoming request body to check for changes
        console.log(req.body);
        // Find a trip by its code and update its details with the provided data
        Trip
            .findOneAndUpdate(
                { 'code': req.params.tripCode }, // Find trip by tripCode
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                { new: true } // Return the updated document
            )
            .then(trip => {
                // If the trip is not found, return 404 with a 'Trip not found' message
                if (!trip) {
                    return res
                        .status(404)
                        .send({
                            message: "Trip not found with code " + req.params.tripCode
                        });
                }
                // If the trip is successfully updated, return it in the response
                res.send(trip);
            })
            .catch(err => {
                // Handle potential errors like invalid ObjectId or other server issues
                if (err.kind === 'ObjectId') {
                    return res
                        .status(404)
                        .send({
                            message: "Trip not found with code " + req.params.tripCode
                        });
                }
                return res
                    .status(500) // Return server error if other issues occur
                    .json(err);
            });
    });
};

// Helper function: Get user details based on the payload (e.g., JWT token)
const getUser = (req, res, callback) => {
    // Check if payload (e.g., JWT) contains an email
    if (req.payload && req.payload.email) {
        // Find the user by their email address
        User
            .findOne({ email: req.payload.email })
            .exec((err, user) => {
                // If user is not found, return 404
                if (!user) {
                    return res
                        .status(404)
                        .json({ "message": "User not found" });
                // If an error occurs, log it and return 404
                } else if (err) {
                    console.log(err);
                    return res
                        .status(404)
                        .json(err);
                }
                // If user is found, proceed with the callback
                callback(req, res, user.name);
            });
    } else {
        // If no email in payload, return 404 (User not found)
        return res
            .status(404)
            .json({ "message": "User not found" });
    }
};

// Export the functions so they can be used in routes or other modules
module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip
};
