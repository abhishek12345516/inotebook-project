const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
require("dotenv").config({ path: "./.env" });

// 🟢 Route 1: Create user
router.post("/createuser", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    user = await User.create({ name, email, password: secPass });

    const data = { user: { id: user.id } };
    const authToken = jwt.sign(data, process.env.JWT_SECRET);

    res.json({ success: true, authToken });
  } catch (error) {
    console.error("❌ Error in /createuser:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// 🟢 Route 2: Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, error: "Invalid credentials" });

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare)
      return res.status(400).json({ success: false, error: "Invalid credentials" });

    const data = { user: { id: user.id } };
    const authToken = jwt.sign(data, process.env.JWT_SECRET);

    res.json({ success: true, authToken });
  } catch (error) {
    console.error("❌ Error in /login:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// 🟢 Route 3: Get logged-in user details
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error("❌ Error in /getuser:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
