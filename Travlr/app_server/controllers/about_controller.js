// Import the file system module to access the local file system
const fs = require('fs');  // Importing fs, a built-in Node.js module, to read and write files. Note: It's expensive to use for large files or high-traffic applications.

// Synchronously read and parse the JSON data file
const ads = JSON.parse(fs.readFileSync('./data/about_ads.json', 'utf8'));  // Reading and parsing the JSON file synchronously. This is blocking (not ideal for performance) and should be avoided for large data or high traffic environments.

// Define the 'about' function to handle the request and response for the "About" page
const about = (req, res) => {
    // Set the page title using the package description from environment variables
    pageTitle = process.env.npm_package_description + ' - About';
    // Render the 'about' template, passing the page title and ads data to be displayed
    res.render('about', {title: pageTitle, ads});
}

// Export the 'about' function so it can be used by the application
module.exports = {
    about
}
