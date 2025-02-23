// Import the file system module to access the local file system
const fs = require('fs');  // Using fs to read and write files. It's an expensive operation, especially for large files or in high-traffic scenarios.

// Synchronously read and parse the JSON data file containing contact information
const contactInfo = JSON.parse(fs.readFileSync('./data/contact.json', 'utf8'));  // This is a blocking (synchronous) operation, which can affect performance in high-traffic apps.

// Define the 'contact' function to handle the request and response for the "Contact" page
const contact = (req, res) => {
    // Set the page title using the package description from environment variables
    pageTitle = process.env.npm_package_description + ' - Contact';
    // Render the 'contact' template, passing the page title and contact information data
    res.render('contact', {title: pageTitle, contactInfo});
}

// Export the 'contact' function so it can be used by the application
module.exports = {
    contact
}
