const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Fetchuser = require("../Middleware/Fetchuser");
const JWT_SECRET = "ThisIsSecret@";

// ROUTE 1: Create a User using: POST "/api/auth/createuser"
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3, max: 15 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password atleast 5 characters ").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res.json({ error: " This email id is already exists " });
      } else {
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);
        // Create a new user
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: securePass,
        });

        const data = {
          user: {
            id: user._id,
          },
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password can't be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: "Not Found" });
    }
    const { email, password } = req.body;

    try {
      let success = false;
      const user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }
      const data = {
        user: {
          id: user._id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2: Get User details using: POST "/api/auth/getuser"

router.post("/getuser", Fetchuser, async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId.id).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
