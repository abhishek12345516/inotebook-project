const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

// ✅ Ye line ensure karti hai ki dotenv correct file padhe
dotenv.config({ path: path.resolve(__dirname, ".env") });

const connectToMongo = async () => {
  try {
    console.log("📡 Connecting to MongoDB...");
    console.log("MONGO_URI from .env:", process.env.MONGO_URI);

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI missing in .env file");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;
