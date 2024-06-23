const { Schema, default: mongoose } = require("mongoose");

const favoritesSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    name: String,
    category: String,
    price: String,
    storage: String,
    memory: String,
    brand: String,
    cpu: String,
    display: String,
    weight: String,
    thumbnail: String,
    orderQTY: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Favorites ||
  mongoose.model("Favorites", favoritesSchema);
