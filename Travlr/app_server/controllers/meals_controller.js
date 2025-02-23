// Import the file system module to access the local file system
const fs = require('fs');  // Expensive operation because synchronous file reads block the event loop

// Read and parse the JSON data file containing food items
const foods = JSON.parse(fs.readFileSync('./data/foods.json', 'utf8'));  // Synchronously reading the file, which can cause delays in handling requests

// Define the 'meals' function to handle the request and response for the meals page
const meals = (req, res) => {
    // Set the page title using the package description from environment variables
    pageTitle = process.env.npm_package_description + ' - Meals';
    
    // Render the 'meals' template, passing the page title and food data
    res.render('meals', {title: pageTitle, foods});
}

// Export the 'meals' function so it can be used by the application
module.exports = {
    meals
}
