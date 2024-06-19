import { NextResponse } from "next/server";
import connectToDB from "@db";
import Product from "@models/product";
import mongoose from "mongoose";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connectToDB();
    const singleProduct = await Product.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    if (!singleProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(singleProduct), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error in fetching product: " + error, {
      status: 500,
    });
  }
};
