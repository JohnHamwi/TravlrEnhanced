// Import the file system module to access the local file system
const fs = require('fs');  // Expensive operation due to synchronous file reads

// Read and parse the JSON data file containing blog posts
const blogs = JSON.parse(fs.readFileSync('./data/blogs.json', 'utf8'));  // Synchronously reading the file, which blocks the event loop and can slow down the application

// Read and parse the JSON data file containing sidebar items for the index page
const sidebarItems = JSON.parse(fs.readFileSync('./data/index_sidebar_links.json', 'utf8'));  // Another synchronous read, which could be costly in high-traffic scenarios

// Define the 'index' function to handle the request and response for the homepage
const index = (req, res) => {
    // Set the page title using the package description from environment variables
    pageTitle = process.env.npm_package_description + ' - Home';
    
    // Render the 'index' template, passing the page title, blogs, and sidebar items
    res.render('index', {title: pageTitle, blogs, sidebarItems});
}

// Export the 'index' function so it can be used by the application
module.exports = {
    index
}
