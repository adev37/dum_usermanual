const router = require("express").Router();

// Controllers
const {
  signup,
  login,
  updateUser,
  userDetail,
} = require("../Controllers/AuthController");

// Middlewares
const verifyToken = require("../Middlewares/verifyToken");
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation");

// Routes
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.put("/updateUser", verifyToken, updateUser);
router.get("/userDetail", verifyToken, userDetail);

module.exports = router;
