import { NextResponse } from "next/server";
import connectToDB from "@db";
import mongoose from "mongoose";
import Cart from "@models/Cart";
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

    const cart = await Cart.findOneAndUpdate(
      { userId: session.user.id },
      { $addToSet: { products: { productId, quantity } } },
      { new: true, upsert: true }
    );

    return new NextResponse(JSON.stringify(cart), { status: 200 });
  } catch (error) {
    return new NextResponse("Error adding to cart: " + error.message, {
      status: 500,
    });
  }
};

export const GET = async (request) => {
  const session = await getServerSession({ req: request, ...authOptions });
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  try {
    await connectToDB();
    const cart = await Cart.findOne({ userId: session.user.id }).populate(
      "products.productId"
    );
    return new NextResponse(JSON.stringify(cart), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching cart: " + error.message, {
      status: 500,
    });
  }
};

export const PUT = async (request) => {
  const session = await getServerSession({ req: request, ...authOptions });
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  const { productId, quantity } = await request.json();

  try {
    await connectToDB();

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return new NextResponse("Invalid product ID", { status: 400 });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: session.user.id, "products.productId": productId },
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    ).populate("products.productId");

    return new NextResponse(JSON.stringify(cart), { status: 200 });
  } catch (error) {
    return new NextResponse("Error updating cart: " + error.message, {
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
    let cart;
    if (productId) {
      cart = await Cart.findOneAndUpdate(
        { userId: session.user.id },
        { $pull: { products: { productId } } },
        { new: true }
      ).populate("products.productId");
    } else {
      cart = await Cart.findOneAndUpdate(
        { userId: session.user.id },
        { $set: { products: [] } },
        { new: true }
      ).populate("products.productId");
    }

    return new NextResponse(JSON.stringify(cart), { status: 200 });
  } catch (error) {
    return new NextResponse("Error deleting item from cart: " + error.message, {
      status: 500,
    });
  }
};
