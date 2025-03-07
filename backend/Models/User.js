// Importing the mongoose library, which is used to interact with MongoDB
const mongoose = require("mongoose");

// Creating a shorthand reference for mongoose.Schema, which is used to define the structure of a MongoDB document
const Schema = mongoose.Schema;

// Defining the user schema, which specifies the structure of the user data that will be stored in the MongoDB collection
const userSchema = new Schema({
  // Name field: Must be a string, is required, must be unique, and has a minimum and maximum length
  name: {
    type: String, // Data type is a string
    required: true, // This field is required (cannot be empty)
    unique: true, // This ensures that each user's name is unique (no duplicates allowed)
    minlength: 3, // Minimum length of 3 characters
    maxlength: 30, // Maximum length of 30 characters
  },

  // Email field: Must be a valid email format, is required, must be unique
  email: {
    type: String, // Data type is a string
    required: true, // This field is required
    unique: true, // Ensures that each email is unique
    // The `match` option validates the email format using a regular expression
    match: [/.+\@.+\..+/, "Please enter a valid email address"], // Custom error message for invalid email
  },

  // Password field: Must be a string, is required, and must have a minimum length of 6 characters
  password: {
    type: String, // Data type is a string
    required: true, // This field is required
    minlength: 6, // Minimum length of 6 characters
  },
});

// Exporting the user model. This creates a MongoDB collection named "users" (lowercase pluralized) based on the user schema.
// We can use UserModel to interact with the users collection (e.g., create, read, update, delete users)
const UserModel = mongoose.model("users", userSchema);

// Exporting the UserModel so it can be used in other parts of the application (e.g., controllers)
module.exports = UserModel;
