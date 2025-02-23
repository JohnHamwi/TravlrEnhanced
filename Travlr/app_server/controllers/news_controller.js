// Import the file system module to access the local file system
const fs = require('fs');  // Expensive operation as synchronous file access blocks the event loop

// Read and parse the JSON data file containing the latest news
const latest_news = JSON.parse(fs.readFileSync('./data/latest_news.json', 'utf8'));  // Synchronous read; not optimal for performance

// Read and parse the JSON data file containing vacation tips
const vacation_tips = JSON.parse(fs.readFileSync('./data/vacation_tips.json', 'utf8'));  // Another synchronous read; should consider async reads for production

// Define the 'news' function to handle the request and response for the news page
const news = (req, res) => {
    // Set the page title dynamically using the package description from environment variables
    pageTitle = process.env.npm_package_description + ' - News';
    
    // Render the 'news' template, passing the page title, latest news, and vacation tips data
    res.render('news', {title: pageTitle, latest_news, vacation_tips});
}

// Export the 'news' function so it can be used by the application
module.exports = {
    news
}
