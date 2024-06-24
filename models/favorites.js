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
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Favorites ||
  mongoose.model("Favorites", favoritesSchema);
