import connectToDB from "@db";
import Product from "@models/product";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { category } = params;
  try {
    await connectToDB();
    const products = await Product.find({ category });
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse("Error fetching products: " + error, {
      status: 500,
    });
  }
};
