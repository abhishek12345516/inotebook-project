// backend/index.js
require("dotenv").config(); // ✅ ye sabse upar likhna zaroori hai

const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || "https://full-stack-inotebook.netlify.app/login";

app.use(cors());
app.use(express.json());

// ✅ Database connect karo
connectToMongo();

// ✅ Routes import
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
