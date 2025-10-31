const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');// ✅ keep lowercase 'jwt' (conventionally used)
const fetchUser = require('../middleware/fetchUser');
const JWT_SECRET = "Abhishekisagoodboy";

// ROUTE 1: Create a new user using POST "/api/auth/createuser"
router.post(
  '/createuser',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // ✅ Check if user already exists
      let existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ error: 'A user with this email already exists' });
      }

      // ✅ Hash password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // ✅ Create new user
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // ✅ Create payload for JWT
      const data = {
        user: { id: user.id },
      };

      // ✅ Generate JWT token
      const authToken = jwt.sign(data, JWT_SECRET);

      // ✅ Send token as response
      res.json({ success: true, authToken });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  }
);


// ROUTE 2: login  using POST "/api/auth/login". No login required. No login required.

router.post('/login',[
  body('email', 'Enter a valid email').isEmail(),
body('password', 'password cannot be blank').isLength({ min: 5 }),

], async (req, res) => {
 const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
      // ✅ Check if user with this email exists or not
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ success: false, error: 'Please try to login with correct credentials' });
      }

      // ✅ Compare the password with the hashed password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success: false, error: 'Please try to login with correct credentials' });
      }
      // ✅ Create JWT token
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authtoken: authtoken});
      }
    catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }


});


//Routes: get logged in user details using: POST "/api/auth/getuser". Login required

router.post('/getuser', fetchUser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;
