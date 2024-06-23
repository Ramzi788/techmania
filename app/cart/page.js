"use client";
import Menu from "@app/components/Menu";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Shopping from "../../public/assets/images/shopping.json";
import Lottie from "lottie-react";
import Link from "next/link";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuantities, setSelectedQuantities] = useState({});

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/api/cart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        const data = await response.json();
        setCart(data);

        const initialQuantities = {};
        data.products.forEach((item) => {
          initialQuantities[item.productId._id] = item.quantity;
        });
        setSelectedQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));

    const updateQuantity = async () => {
      try {
        const response = await fetch("/api/cart", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, quantity: newQuantity }),
        });

        if (!response.ok) {
          throw new Error("Failed to update cart quantity");
        }

        const updatedCart = await response.json();
        setCart(updatedCart);
      } catch (error) {
        console.error("Error updating cart quantity:", error);
      }
    };

    updateQuantity();
  };

  const deleteItem = async (productId) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col w-full">
      {cart && cart.products.length > 0 ? (
        <div className="flex flex-col pl-16 pr-16 pt-10">
          <p className="font-bold text-xl">
            Cart ({cart.products.length} items)
          </p>
          <div className="grid grid-cols-3 mt-10 gap-10">
            <div className="flex col-span-2 flex-col border-1 border-gray-300 rounded-md p-7">
              <p className="text-lg">Items ({cart.products.length})</p>
              {cart.products.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-flow-row grid-cols-7 items-center border-b border-gray-200 py-4"
                >
                  <img
                    src={item.productId.thumbnail}
                    alt={item.productId.name}
                    className="w-20 h-20 object-cover col-span-1"
                  />

                  <div className="col-span-4">
                    <p className="font-bold mb-2">{item.productId.name}</p>
                    <div className="flex items-center gap-3">
                      <p>Quantity: </p>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="bordered" className="capitalize">
                            {selectedQuantities[item.productId._id]}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Single selection example"
                          variant="flat"
                          disallowEmptySelection
                          selectionMode="single"
                          selectedKeys={
                            new Set([
                              selectedQuantities[item.productId._id].toString(),
                            ])
                          }
                          onSelectionChange={(keys) =>
                            handleQuantityChange(
                              item.productId._id,
                              parseInt(Array.from(keys)[0], 10)
                            )
                          }
                        >
                          {Array.from({ length: 10 }, (_, i) => (
                            <DropdownItem key={i + 1}>{i + 1}</DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                  <p className="col-span-1 text-right font-bold">
                    ${item.productId.price}
                  </p>
                  <div className="flex col-span-1 justify-end items-center relative">
                    <Image
                      className="hover:cursor-pointer absolute transition-opacity duration-1 easein-out hover:opacity-100"
                      src="/assets/icons/trash.svg"
                      width={30}
                      height={30}
                      onClick={() => deleteItem(item.productId._id)}
                    />
                    <Image
                      className="hover:cursor-pointer absolute justify-center opacity-0 transition-opacity duration-1 ease-in-out hover:opacity-100"
                      src="/assets/icons/trash-fill.svg"
                      width={30}
                      height={30}
                      onClick={() => deleteItem(item.productId._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex col-span-1 flex-col border-1 border-gray-300 rounded-md p-7">
              <p className="text-lg font-bold">Order Summary</p>
              <div className="flex flex-col gap-2 mt-4">
                {cart.products.map((item, index) => (
                  <div key={index} className="flex justify-between mb-2 gap-4">
                    <p>
                      {item.productId.name} x {item.quantity}
                    </p>
                    <p className="font-bold">
                      ${item.productId.price * item.quantity}
                    </p>
                  </div>
                ))}
                <hr className="my-4" />
                <div className="flex justify-between font-bold">
                  <p>Total</p>

                  <p>
                    $
                    {cart.products.reduce(
                      (total, item) =>
                        total + item.productId.price * item.quantity,
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center h-[600px] my-10">
          <div className="flex flex-col border-1 border-dashed mx-16 py-4 px-4 items-center justify-center border-gray-500 rounded-lg w-full">
            <div className="flex w-[500px]">
              <Lottie animationData={Shopping} />
            </div>
            <p className="font-bold text-lg ">
              Let's Find Your Favorite Products!
            </p>
            <p className="font-bold text-sm mt-2">Your cart is empty.</p>
            <p className="mt-7 text-gray-500">
              Hi, user - fill up your cart from our different categories
            </p>
            <div className="flex justify-evenly mt-5 gap-7">
              <Link href="/productsview/multipleProducts/All">
                <button
                  className="rounded-full py-3 px-5 items-center justify-center border border-black text-sm hover:bg-gray-200 "
                  type="button"
                >
                  Shop All Products
                </button>
              </Link>
              <Link href="/productsview/multipleProducts/Phones">
                <button
                  className="rounded-full py-3 px-5 items-center justify-center border border-black text-sm hover:bg-gray-200 "
                  type="button"
                >
                  Shop Phones
                </button>
              </Link>
              <Link href="/productsview/multipleProducts/Laptops">
                <button
                  className="rounded-full py-3 px-5 items-center justify-center border border-black text-sm hover:bg-gray-200 "
                  type="button"
                >
                  Shop Laptops
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
