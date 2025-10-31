const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/inotebook"; // ✅ 127.0.0.1 यूज़ करो, localhost की जगह

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

module.exports = connectToMongo;
