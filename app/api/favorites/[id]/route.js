import { NextResponse } from "next/server";
import connectToDB from "@db";
import Favorite from "@models/favorite";
import mongoose from "mongoose";

export const POST = async (request) => {
  const { userId, productId } = await request.json();

  try {
    await connectToDB();

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return new NextResponse("Invalid product ID", { status: 400 });
    }

    const favorite = await Favorite.findOneAndUpdate(
      { userId },
      { $addToSet: { products: productId } },
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
