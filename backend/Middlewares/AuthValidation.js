// Importing the Joi library, which is used for validating the request data (like name, email, password)
const Joi = require("joi");

// Middleware for validating the signup data
const signupValidation = (req, res, next) => {
  // Defining a Joi schema for the data structure that needs to be validated
  const schema = Joi.object({
    // Name must be a string, between 3 and 100 characters, and is required
    name: Joi.string().min(3).max(100).required(),

    // Email must be in a valid email format and is required
    email: Joi.string().email().required(),

    // Password must be a string between 4 and 100 characters and is required
    password: Joi.string().min(4).max(100).required(),
  });

  // Validating the request body against the defined schema
  const { error } = schema.validate(req.body);

  // If there is an error in the validation, send a 400 Bad Request response with the error details
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }

  // If validation passes, move to the next middleware or route handler
  next();
};

// Middleware for validating the login data
const loginValidation = (req, res, next) => {
  // Defining a Joi schema for the login request data
  const schema = Joi.object({
    // Email must be in a valid format and is required
    email: Joi.string().email().required(),

    // Password must be a string between 4 and 100 characters and is required
    password: Joi.string().min(4).max(100).required(),
  });

  // Validating the request body for login
  const { error } = schema.validate(req.body);

  // If there is an error in the validation, send a 400 Bad Request response with the error details
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }

  // If validation passes, move to the next middleware or route handler
  next();
};

// Exporting the signup and login validation functions so they can be used in routes
module.exports = {
  signupValidation,
  loginValidation,
};
