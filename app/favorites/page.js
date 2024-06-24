"use client";
import Menu from "@app/components/Menu";
import SelectComponent from "@app/components/SelectComponent";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const filters = [
    {
      key: "price-l",
      label: "Price low",
    },
    {
      key: "price-h",
      label: "Price high",
    },
    {
      key: "recent",
      label: "Most Recent",
    },
  ];

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/favorites");
        if (!response.ok) {
          throw new Error("Failed to fetch favorites data");
        }
        const data = await response.json();
        setFavorites(data);
        const initialQuantities = {};
        data.products.forEach((item) => {
          initialQuantities[item.productId._id] = item.quantity;
        });
        setSelectedQuantities(initialQuantities);
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
  }, []);

  const deleteItem = async (productId) => {
    try {
      const response = await fetch("/api/favorites", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error deleting item from favorites:", error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch(`/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity: 1 }), // Assuming quantity is 1
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

  return (
    <div className="flex flex-col w-full">
      <Menu />
      {favorites && (
        <div className="grid grid-cols-3 px-16 py-10 gap-4">
          <div
            className={`flex col-span-2 flex-col w-full space-y-4 ${
              favorites.products.length == 0 && "col-span-3"
            }`}
          >
            <p className="font-bold text-lg">Your Favorite Items</p>
            <div className="flex justify-between items-center w-full">
              <p>{favorites.products.length} items</p>
              <div className="flex items-center gap-4 w-[200px]">
                <SelectComponent data={filters} />
              </div>
            </div>
            <hr className="w-full border-0.5 border-gray-200 " />
            <div className="border border-dashed border-gray-300 rounded-lg p-4 max-h-[400px] overflow-y-auto">
              {favorites.products.length > 0 &&
                favorites.products.map((item, index) => (
                  <div className="border-b-1 py-5" key={index}>
                    <div className="flex gap-5">
                      <img
                        src={item.productId.thumbnail}
                        alt={item.productId.name}
                        className="w-fit h-20 object-cover col-span-1"
                      />
                      <div className="flex flex-col w-full gap-5">
                        <div className="flex justify-between">
                          <p>{item.productId.name}</p>
                          <p className="font-bold">${item.productId.price}</p>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <p
                            className="text-xs underline hover:cursor-pointer"
                            onClick={() => deleteItem(item.productId._id)}
                          >
                            Remove Item
                          </p>
                          <button
                            onClick={() => addToCart(item.productId._id)}
                            className={`flex w-fit px-12 items-center justify-center font-bold rounded-lg text-sm py-2 ${
                              cartItems.includes(item.productId._id)
                                ? "bg-gray-400 text-white cursor-not-allowed"
                                : "bg-white text-blue-500 border border-blue-500 hover:bg-blue-400 hover:text-white"
                            }`}
                            disabled={cartItems.includes(item.productId._id)}
                          >
                            {cartItems.includes(item.productId._id)
                              ? "Already In Cart"
                              : "Add item to cart"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {favorites.products.length == 0 && (
                <div className="flex justify-between w-full items-center">
                  <p className="text-sm">No Items Favorited</p>
                  <Link href="/">
                    <button className="flex items-center justify-center py-2 px-5 text-sm bg-blue-500 text-white rounded-lg">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div
            className={`flex h-fit flex-col col-span-1 rounded-lg p-4 border-1 border-gray-300 gap-3 ${
              favorites.products.length == 0 && "hidden"
            }`}
          >
            <div className="gap-3">
              <p className="font-bold text-lg">
                $
                {favorites.products
                  .reduce((total, item) => {
                    const price = parseFloat(item.productId.price);
                    return total + (isNaN(price) ? 0 : price);
                  }, 0)
                  .toFixed(2)}
              </p>
              <p className="text-xs text-gray-400">Estimated Total</p>
            </div>
            <hr className="w-full border-0.5 border-gray-200 " />
            <button className="flex items-center justify-center bg-blue-500 text-white font-bold rounded-lg text-sm py-2">
              Add all to cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
