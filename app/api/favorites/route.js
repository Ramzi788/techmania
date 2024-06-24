import { NextResponse } from "next/server";
import connectToDB from "@db";
import mongoose from "mongoose";
import favorites from "@models/Favorites";

export const POST = async (request) => {
  const { productId, quantity } = await request.json();

  try {
    await connectToDB();

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return new NextResponse("Invalid product ID", { status: 400 });
    }

    const favorite = await favorites.findOneAndUpdate(
      { userId: "some-user-id" },
      { $addToSet: { products: { productId, quantity } } },
      { new: true, upsert: true }
    );

    return new NextResponse(JSON.stringify(favorite), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error adding to favorites: " + error.message, {
      status: 500,
    });
  }
};

export const GET = async (request) => {
  try {
    await connectToDB();
    const favorite = await favorites
      .findOne({ userId: "some-user-id" })
      .populate("products.productId");
    return new NextResponse(JSON.stringify(favorite), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error in fetching favorites: " + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request) => {
  const { productId } = await request.json();

  try {
    await connectToDB();

    const favorite = await favorites
      .findOneAndUpdate(
        { userId: "some-user-id" },
        { $pull: { products: { productId: productId } } },
        { new: true }
      )
      .populate("products.productId");

    return new NextResponse(JSON.stringify(favorite), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      "Error deleting item from favorites: " + error.message,
      {
        status: 500,
      }
    );
  }
};
