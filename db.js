import mongoose from "mongoose";

const connectToDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo connection successful");
  } catch (error) {
    console.error("Error in connecting to MongoDB:", error.message);
    throw new Error("Error in connecting to MongoDB");
  }
};

export default connectToDB;
