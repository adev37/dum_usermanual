// Importing the bcrypt library to hash passwords for security purposes
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Importing the User model to interact with the MongoDB users collection
const UserModel = require("../Models/User");

// Signup function that handles user registration
const signup = async (req, res) => {
  try {
    // Extracting the name, email, and password from the request body
    const { name, email, password } = req.body;

    // Checking if a user with the provided email already exists in the database
    const user = await UserModel.findOne({ email });

    // If the user exists, return a 409 Conflict status code with a message
    if (user) {
      return res.status(409).json({
        message: "User already exists, please log in.",
        success: false,
      });
    }

    // Creating a new instance of the User model with the provided name, email, and password
    const userModel = new UserModel({ name, email, password });

    // Hashing the user's password using bcrypt with a salt of 10 rounds for security
    userModel.password = await bcrypt.hash(password, 10);

    // Saving the newly created user with the hashed password to the database
    await userModel.save();

    // Sending a success response with a 201 status code and a success message
    res.status(201).json({ message: "Signup successful", success: true });
  } catch (error) {
    // Handling any errors that occur during the process and returning a 500 Internal Server Error
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
const login = async (req, res) => {
  try {
    // Extracting email and password from the request body
    const { email, password } = req.body;

    // Finding the user by their email in the database
    const user = await UserModel.findOne({ email });

    // If the user does not exist, return a 403 error
    if (!user) {
      return res.status(403).json({
        message: "Auth failed, email or password is incorrect",
        success: false,
      });
    }

    // Comparing the provided password with the hashed password stored in the database
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: "Auth failed, email or password is incorrect",
        success: false,
      });
    }

    // If the email and password are correct, generate a JWT token
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id }, // Payload data for the token
      process.env.JWT_SECRET, // The secret key from the environment variables
      { expiresIn: "24h" } // Token expiration time
    );

    // Responding with the user data and the JWT token
    res.status(200).json({
      message: "Login successful",
      success: true,
      email: user.email,
      jwtToken,
      name: user.name,
    });
  } catch (error) {
    // Handling any errors that occur and responding with a 500 status code
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Exporting the signup function so that it can be used in the routes (e.g., in AuthRouter)
module.exports = {
  signup,
  login,
};
