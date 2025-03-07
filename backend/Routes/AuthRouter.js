// Importing the signup and login functions from the AuthController file
const { signup, login } = require("../Controllers/AuthController");

// Importing the validation middleware for signup and login from the AuthValidation file
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation");

// Creating a new Express router instance to handle authentication routes
const router = require("express").Router();

// Defining a POST route for the signup endpoint
// First, the signupValidation middleware checks if the request data is valid
// If validation passes, the signup function is called to handle user registration
router.post("/signup", signupValidation, signup);

// Defining a POST route for the login endpoint
// First, the loginValidation middleware checks if the request data is valid
// If validation passes, the login function is called to handle user login
router.post("/login", loginValidation, login);

// Exporting the router so that it can be used in other parts of the application
module.exports = router;
