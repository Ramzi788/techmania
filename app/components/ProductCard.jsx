"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const ProductCard = ({
  productId,
  thumbnail,
  category,
  name,
  price,
  stock,
}) => {
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isInFavorites, setIsInFavorites] = useState(false);

  const addToCart = async (productId) => {
    try {
      const response = await fetch(`/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      // Update cart items state after successful addition
      setCartItems((prevCartItems) => [...prevCartItems, productId]);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const response = await fetch("/api/favorites", {
        method: isInFavorites ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      if (response.ok) {
        setIsInFavorites(!isInFavorites);
      } else {
        console.error(
          `Failed to ${isInFavorites ? "remove from" : "add to"} favorites`
        );
      }
    } catch (error) {
      console.error(
        `Error ${isInFavorites ? "removing from" : "adding to"} favorites:`,
        error
      );
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/favorites");
        if (!response.ok) {
          throw new Error("Failed to fetch favorites data");
        }
        const data = await response.json();
        const favoriteProductIds = data.products.map(
          (item) => item.productId._id
        );
        setFavorites(favoriteProductIds);
        setIsInFavorites(favoriteProductIds.includes(productId));
      } catch (error) {
        console.error("Error fetching favorites data:", error);
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await fetch("/api/cart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        const data = await response.json();
        setCartItems(data.products.map((item) => item.productId._id));
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchFavorites();
    fetchCartItems();
  }, [productId]);

  return (
    <div className="relative p-3 flex flex-col w-[300px] hover:border border-gray-300 rounded-md group">
      <div className="absolute top-0 left-0 right-0 bottom-10 bg-transparent bg-opacity-100 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex flex-between gap-8">
          <div
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full border border-blue-700 z-10 relative"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite();
            }}
          >
            {isInFavorites ? (
              <Image
                className="absolute justify-center transition-opacity duration-1 ease-in-out"
                src="/assets/icons/heart-fill-blue.svg"
                width={23}
                height={23}
                alt="Filled Heart Icon"
              />
            ) : (
              <Image
                className="absolute justify-center transition-opacity duration-1 ease-in-out"
                src="/assets/icons/heart.svg"
                width={23}
                height={23}
                alt="Heart Icon"
              />
            )}
          </div>
          <div
            className={`flex items-center justify-center w-12 h-12 bg-white rounded-full border border-blue-700 z-10 relative ${
              cartItems.includes(productId) ? "cursor-not-allowed" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              if (!cartItems.includes(productId)) {
                addToCart(productId);
              }
            }}
          >
            {cartItems.includes(productId) ? (
              <Image
                className="absolute justify-center transition-opacity duration-1 ease-in-out"
                src="/assets/icons/shopping-cart-fill.svg"
                width={23}
                height={23}
                alt="Filled Cart Icon"
              />
            ) : (
              <Image
                className="absolute justify-center transition-opacity duration-1 ease-in-out"
                src="/assets/icons/shopping-cart-blue.svg"
                width={23}
                height={23}
                alt="Cart Icon"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center max-sm:w-32 h-[250px] self-center">
        <Image width={200} height={200} src={thumbnail} alt={name} />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <p className="text-sm text-gray-400 h-[20px] max-sm:text-xs">
          {category}
        </p>
        <p className="font-bold h-[50px] max-sm:text-sm">{name}</p>
        <div className="flex flex-col h-[50px] ">
          <p
            className={
              stock > 0
                ? "text-green-500 max-sm:text-xs"
                : "text-red-500 max-sm:text-xs"
            }
          >
            {stock > 0 ? "In Stock" : "Out Of Stock"}
          </p>
          <p className="font-bold text-lg h-[50px] max-sm:text-sm">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
