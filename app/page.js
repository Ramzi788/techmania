"use client";
import React, { useEffect, useState } from "react";
import Menu from "./components/Menu";
import LargeCard from "./components/LargeCard";
import PromotionSquare from "./components/PromotionSquare";
import PromotionRect from "./components/PromotionRect";
import ProductCard from "./components/ProductCard";
import { notFound } from "next/navigation";
import Link from "next/link";

async function getProducts() {
  const res = await fetch("/api/products", {
    cache: "no-store",
  });
  if (!res.ok) return notFound;
  return res.json();
}

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <Menu />
      <LargeCard />
      <div className="flex flex-col mt-10 pl-16 pr-16 pb-24 w-full max-md:pl-4 max-md:pr-4">
        <p className="flex max-sm:hidden font-bold text-lg text-black">
          Discover
        </p>
        <div className="flex w-full max-sm:hidden flex-row gap-3 mt-8 mb-8 max-xl:flex-col flex-between ">
          <div className="xl:flex xl:justify-center xl:md:block hidden">
            <PromotionSquare
              src="/assets/images/sw.svg"
              title={"Smart Watches"}
              desc={
                "Explore our large collection of the best smart watches out there!"
              }
              price={150}
              href="/productsview/multipleProducts/SmartWatches"
            />
          </div>
          <div className="flex flex-col md:block ">
            <PromotionRect
              src="/assets/images/iphones.svg"
              title={"Apple Iphone 15"}
              desc={"Fill Your Pockets with the Latest Technology of Iphones"}
              price={900}
              href="/productsview/multipleProducts/Iphones"
            />
            <div className="xl:hidden max-sm:hidden mt-8 flex flex-row justify-between w-full gap-3">
              <PromotionSquare
                src="/assets/images/sw.svg"
                title={"Smart Watches"}
                desc={
                  "Explore our large collection of the best smart watches out there!"
                }
                price={150}
                href="/productsview/multipleProducts/Smart Watches"
              />
              <PromotionSquare
                src="/assets/images/headphones.svg"
                title={"Headphones"}
                desc={
                  "Immerse yourself in crystal-clear sound and unparalleled comfort."
                }
                price={95}
                href="/productsview/multipleProducts/Headphones"
              />
            </div>
          </div>
          <div className="xl:flex xl:justify-center xl:md:block hidden">
            <PromotionSquare
              src="/assets/images/headphones.svg"
              title={"Headphones"}
              desc={
                "Immerse yourself in crystal-clear sound and unparalleled comfort."
              }
              price={95}
              href="/productsview/multipleProducts/Headphones"
            />
          </div>
        </div>

        <p className="flex font-bold text-lg text-black">Featured Products</p>
        <div className="flex overflow-x-scroll space-x-4 mt-4 pb-12">
          <div className="flex space-x-4 w-max">
            {products.map((product) => (
              <div key={product._id}>
                <Link
                  href={`/productsview/singleProduct/${product._id}/`}
                  key={product._id}
                >
                  <ProductCard
                    key={product._id}
                    productId={product._id}
                    thumbnail={product.thumbnail}
                    category={product.category}
                    name={product.name}
                    price={product.price}
                    stock={product.quantity}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
