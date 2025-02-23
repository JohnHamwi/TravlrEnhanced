const mongoose = require('mongoose');

// Define the schema for trips, which includes required fields and indexing for some fields
const tripSchema = new mongoose.Schema({
    code: { 
        type: String,        // The code for the trip (must be a string)
        required: true,      // Field is required
        index: true          // Index this field to improve query performance
    },
    name: { 
        type: String,        // The name of the trip (must be a string)
        required: true,      // Field is required
        index: true          // Index this field for faster search
    },
    length: { 
        type: String,        // The duration or length of the trip (must be a string)
        required: true       // Field is required
    },
    start: { 
        type: Date,          // The start date of the trip (must be a date)
        required: true       // Field is required
    },
    resort: { 
        type: String,        // The resort name or location (must be a string)
        required: true       // Field is required
    },
    perPerson: { 
        type: String,        // The cost per person for the trip (must be a string)
        required: true       // Field is required
    },
    image: { 
        type: String,        // URL or path to the trip's image (must be a string)
        required: true       // Field is required
    },
    description: { 
        type: String,        // Description of the trip (must be a string)
        required: true       // Field is required
    }
});

// Define the schema for rooms (not yet defined in this code)

// Compile the model named 'trips' using the tripSchema schema
mongoose.model('trips', tripSchema);
