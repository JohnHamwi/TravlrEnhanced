// Import mongoose for interacting with MongoDB
const mongoose = require('mongoose');

// Set the database host, using an environment variable or defaulting to localhost
const host = process.env.DB_HOST || '127.0.0.1';
// Set the database URL for connecting to MongoDB
let dbURL = `mongodb://${host}/travlr`;

// Import the readline module to handle terminal input in Windows environments
const readLine = require('readline');

// If the app is in production, use the production database URL from environment variables
if (process.env.NODE_ENV === 'production') {
  dbURL = process.env.DB_HOST || process.env.MONGODB_URI;
}

// Function to connect to MongoDB with a delay (retry logic in case of connection failure)
const connect = () => {
  setTimeout(() => mongoose.connect(dbURL, { 
    useNewUrlParser: true, // Use the new MongoDB connection string parser
    useCreateIndex: true, // Use MongoDB's new createIndex function
    useUnifiedTopology: true // Use the new unified topology engine
  }), 1000);
}

// Event listener for successful connection to MongoDB
mongoose.connection.on('connected', () => {
  console.log('connected'); // Logs when connected to MongoDB
});

// Event listener for connection errors
mongoose.connection.on('error', err => {
  console.log('error: ' + err); // Logs connection errors
  return connect(); // Retry connection on error
});

// Event listener for disconnection from MongoDB
mongoose.connection.on('disconnected', () => {
  console.log('disconnected'); // Logs when disconnected from MongoDB
});

// Handle SIGINT signal in Windows environments (terminal input interrupts)
if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  // Manually emit SIGINT for Windows compatibility
  rl.on ('SIGINT', () => {
    process.emit("SIGINT");
  });
}

// Function to gracefully shut down MongoDB connection
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`); // Log the shutdown reason
    callback(); // Execute callback (exit process)
  });
};

// Listen for SIGUSR2 signal (typically sent by nodemon for restarting the app)
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2'); // Kill the process and restart
  });
});

// Listen for SIGINT signal (app termination, typically triggered with Ctrl+C)
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0); // Exit process after shutdown
  });
});

// Listen for SIGTERM signal (Heroku or other hosting shutdown)
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0); // Exit process after shutdown
  });
});

// Call connect function to start the MongoDB connection process
connect();

// Import the Mongoose schema for 'travlr' and 'user' models
require('./travlr');
require('./user');
