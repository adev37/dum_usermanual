import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongo_url = process.env.MONGO_CONN;

if (!mongo_url) {
  console.error("❌ MONGO_CONN is undefined. Check your .env file.");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully...");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// ✅ Export the function
export default connectDB;
