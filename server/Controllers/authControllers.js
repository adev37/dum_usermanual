import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../Models/User.js";

// SIGNUP CONTROLLER
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!role || !["admin", "viewer"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role. Role must be either 'admin' or 'viewer'.",
        success: false,
      });
    }

    const existingUser = await UserModel.findOne({ email: email.trim() });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists, please log in.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful", success: true });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ✅ FIXED LOGIN CONTROLLER
export const login = async (req, res) => {
  try {
    const email = req.body.email?.trim();
    const password = req.body.password;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(403).json({
        message: "Auth failed, email or password is incorrect",
        success: false,
      });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: "Auth failed, email or password is incorrect",
        success: false,
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is not defined in .env");
      return res.status(500).json({
        message: "Server error: JWT secret not configured",
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      email: user.email,
      role: user.role,
      jwtToken,
      name: user.name,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email } = req.body;
    const updates = { name, email };
    await UserModel.findByIdAndUpdate(userId, updates, { new: true });
    res.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// USER DETAIL
export const userDetail = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
