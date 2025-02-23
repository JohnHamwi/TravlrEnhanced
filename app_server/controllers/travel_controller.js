// Import necessary modules from 'express' and 'request'
const { response } = require('express');  // Importing 'response' but it's unused in this code
const request = require('request');  // 'request' library is used to send HTTP requests to external APIs

// Set the server URL where the API requests will be sent
const apiOptions = {
    server: 'http://localhost:3000'  // Server address for API requests
}

// Function to render the travel list view
const renderTravelList = (req, res, responseBody) => {
    let message = null;  // Variable to hold any error or empty list messages
    let pageTitle = process.env.npm_package_description + ' - Travel';  // Set page title from environment description

    // Check if the API response is an array, if not, set an error message
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';  // Error if the response is not an array
        responseBody = [];  // Set empty array as responseBody in case of error
    }
    else {
        // If the response is an empty array, show a message indicating no trips are available
        if (!responseBody.length) {
            message = 'No trips exist in database';  // Message when there are no trips
        }
    }

    // Render the 'travel' view with the given title, trips data, and any message
    res.render('travel', {
        title: pageTitle,  // Page title
        trips: responseBody,  // API data containing trips
        message  // Error or no trips message
    });
};

// GET request handler for fetching and displaying the travel list
const travelList = (req, res) => {
    const path = '/api/trips';  // Define the API endpoint for fetching trips

    // Construct the options for the API request
    const requestOptions = {
        url: `${apiOptions.server}${path}`,  // Full API URL
        method: 'GET',  // HTTP method (GET request)
        json: {},  // Send request as JSON
    };

    // Log the URL being called by the travelList function
    console.info('>> travelController.travelList calling ' + requestOptions.url);

    // Send the request to the API and handle the response
    request(
        requestOptions,
        (err, { statusCode }, body) => {  // Callback function to handle response or error
            if (err) {
                console.error(err);  // Log any error that occurs during the request
            }
            console.log('statusCode: ', response && response.statusCode);  // Log the response status code (undefined in current code)
            renderTravelList(req, res, body);  // Call the render function with the response body
        }
    )
};

// Export the travelList function to be used in other parts of the application
module.exports = {
    travelList
};
