import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo connection successful");
  } catch (error) {
    throw new Error("Error in connecting to mongodb");
  }
};

export default connectToDB;