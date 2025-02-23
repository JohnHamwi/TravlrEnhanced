// Import the file system module to access the local file system
const fs = require('fs');  // Expensive operation as synchronous file access blocks the event loop

// Read and parse the JSON data file containing the rooms data
const rooms_data = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));  // Synchronous read; not optimal for performance

// Define the 'rooms' function to handle the request and response for the rooms page
const rooms = (req, res) => {
    // Set the page title dynamically using the package description from environment variables
    pageTitle = process.env.npm_package_description + ' - Rooms';
    
    // Render the 'rooms' template, passing the page title and rooms data to the template
    res.render('rooms', {title: pageTitle, rooms_data});
}

// Export the 'rooms' function so it can be used by the application
module.exports = {
    rooms
}
