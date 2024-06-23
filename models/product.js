import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the laptop schema
const productSchema = new Schema(
  {
    name: String,
    category: String,
    price: String,
    Storage: String,
    Memory: String,
    Brand: String,
    CPU: String,
    Display: String,
    Weight: String,
    Thumbnail: String,
    quantity: Number,
    type: String,
    additional_images: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
