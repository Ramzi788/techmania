import { NextResponse } from "next/server";
import connectToDB from "@db";
import mongoose from "mongoose";
import Cart from "@models/Cart";

export const POST = async (request) => {
  const { productId, quantity } = await request.json();

  try {
    await connectToDB();

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return new NextResponse("Invalid product ID", { status: 400 });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: "some-user-id" },
      { $addToSet: { products: { productId, quantity } } },
      { new: true, upsert: true }
    );

    return new NextResponse(JSON.stringify(cart), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error adding to cart: " + error.message, {
      status: 500,
    });
  }
};

export const GET = async (request) => {
  try {
    await connectToDB();
    const cart = await Cart.findOne({ userId: "some-user-id" }).populate(
      "products.productId"
    );
    return new NextResponse(JSON.stringify(cart), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error in fetching cart: " + error.message, {
      status: 500,
    });
  }
};

export const PUT = async (request) => {
  const { productId, quantity } = await request.json();

  try {
    await connectToDB();

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return new NextResponse("Invalid product ID", { status: 400 });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: "some-user-id", "products.productId": productId },
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    ).populate("products.productId");

    return new NextResponse(JSON.stringify(cart), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error updating cart: " + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request) => {
  const { productId } = await request.json();

  try {
    await connectToDB();

    const cart = await Cart.findOneAndUpdate(
      { userId: "some-user-id" },
      { $pull: { products: { productId: productId } } },
      { new: true }
    ).populate("products.productId");

    return new NextResponse(JSON.stringify(cart), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error deleting item from cart: " + error.message, {
      status: 500,
    });
  }
};
