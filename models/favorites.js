const { Schema } = require("mongoose");

const favoritesSchema = new Schema(
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
  },
  { timestamps: true }
);

export default mongoose.models.Favorite ||
  mongoose.model("Favorite", favoritesSchema);
