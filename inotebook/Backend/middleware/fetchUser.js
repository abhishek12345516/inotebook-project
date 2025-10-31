const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = fetchUser;
