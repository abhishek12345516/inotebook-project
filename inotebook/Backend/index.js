require("dotenv").config();
const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["https://full-stack-inotebook.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

connectToMongo();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send({ activeStatus: true, error: false });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
