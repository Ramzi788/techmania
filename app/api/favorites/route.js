import { NextResponse } from "next/server";
import connectToDB from "@db";
import mongoose from "mongoose";
import favorites from "@models/favorites";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (request) => {
  const session = await getServerSession({ req: request, ...authOptions });
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  const { productId, quantity } = await request.json();

  try {
    await connectToDB();

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return new NextResponse("Invalid product ID", { status: 400 });
    }

    const favorite = await favorites.findOneAndUpdate(
      { userId: session.user.id },
      { $addToSet: { products: { productId, quantity } } },
      { new: true, upsert: true }
    );

    return new NextResponse(JSON.stringify(favorite), { status: 200 });
  } catch (error) {
    return new NextResponse("Error adding to favorites: " + error.message, {
      status: 500,
    });
  }
};

export const GET = async (request) => {
  const session = await getServerSession({ req: request, ...authOptions });
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  try {
    await connectToDB();
    const favorite = await favorites
      .findOne({ userId: session.user.id })
      .populate("products.productId");

    if (!favorite) {
      return new NextResponse(JSON.stringify({ products: [] }), {
        status: 200,
      });
    }

    return new NextResponse(JSON.stringify(favorite), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching favorites: " + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request) => {
  const session = await getServerSession({ req: request, ...authOptions });
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  const { productId } = await request.json();

  try {
    await connectToDB();

    const favorite = await favorites
      .findOneAndUpdate(
        { userId: session.user.id },
        { $pull: { products: { productId } } },
        { new: true }
      )
      .populate("products.productId");

    return new NextResponse(JSON.stringify(favorite), { status: 200 });
  } catch (error) {
    return new NextResponse(
      "Error deleting item from favorites: " + error.message,
      { status: 500 }
    );
  }
};
