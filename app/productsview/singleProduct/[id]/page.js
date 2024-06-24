"use client";
import Menu from "@app/components/Menu";
import ProductCard from "@app/components/ProductCard";
import Loading from "@app/loading";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Heart from "../../../../public/assets/icons/heart.svg";
import HeartFill from "../../../../public/assets/icons/heart-fill.svg";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";

const ProductsPage = () => {
  const pathname = usePathname();
  const id = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);
  const [product, setProduct] = useState(null);
  const [filter, setFilter] = useState();
  const [mainImage, setMainImage] = useState("");
  const [products, setProducts] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    if (id) {
      console.log("Fetching product with ID:", id);
      fetch(`http://localhost:3000/api/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setMainImage(data.thumbnail);
          checkFavorite(data._id);
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      fetch(`/api/products/${product.category}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.filter((p) => p._id !== product._id));
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [product]);

  useEffect(() => {
    const checkCart = async () => {
      try {
        const response = await fetch("/api/cart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        const cartData = await response.json();
        const productInCart = cartData.products.some(
          (item) => item.productId._id === id
        );
        setIsInCart(productInCart);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    checkCart();
  }, [id]);

  const checkFavorite = async (productId) => {
    try {
      const response = await fetch("/api/favorites");
      if (!response.ok) {
        throw new Error("Failed to fetch favorites data");
      }
      const favoritesData = await response.json();
      const productInFavorites = favoritesData.products.some(
        (item) => item.productId._id === productId
      );
      setIsInFavorites(productInFavorites);
    } catch (error) {
      console.error("Error fetching favorites data:", error);
    }
  };

  const handleImageClick = (url, index) => {
    setMainImage(url);
    setActiveImageIndex(index);
  };

  const handleSelectionChange = (keys) => {
    const selectedQuantity = Array.from(keys)[0];
    setSelectedKeys(keys);
    setQuantity(selectedQuantity);
  };

  const toggleFavorite = async () => {
    try {
      const response = await fetch("/api/favorites", {
        method: isInFavorites ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
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

  const addToCart = async () => {
    try {
      const response = await fetch(`/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id, quantity }),
      });

      if (response.ok) {
        console.log("Product added to cart");
        setIsInCart(true);
      } else {
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  if (!product) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="product-detail pb-24">
      <Menu />
      <div className="flex flex-col w-full pl-24 pr-24 max-sm:pl-4 max-sm:pr-4">
        <section className="flex gap-3 align-center mt-10">
          <p className=" text-gray-400">{product.category}</p>
          <div className="border border-r-black border-white "></div>
          <p className="font-bold">{product.name}</p>
        </section>
        <div className="flex w-full max-lg:flex-col">
          <div className="flex align-center mt-10">
            <div>
              <div className="flex flex-col overflow-y-scroll space-y-4 hide-scrollbar max-h-[450px]">
                {product.additional_images.map((url, index) => (
                  <div
                    key={index}
                    className={`w-32 h-32 cursor-pointer p-2 max-md:w-20 max-md:h-20 ${
                      activeImageIndex === index
                        ? "border-2 rounded-lg border-blue-500"
                        : ""
                    }`}
                    onClick={() => handleImageClick(url, index)}
                  >
                    <Image
                      src={url}
                      width={300}
                      height={300}
                      className="flex w-full"
                      layout="responsive"
                      alt={`${product.name} ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-[550px] min-w-[400px] max-md:min-w-[200px]">
              <div className="absolute right-0 top-0 flex items-center justify-center w-12 h-12 bg-white rounded-full border border-blue-700 z-10 hover:cursor-pointer">
                {isInFavorites ? (
                  <Image
                    className="absolute transition-opacity duration-1 ease-in-out"
                    src="/assets/icons/heart-fill-blue.svg"
                    width={23}
                    height={23}
                    alt="Filled Heart Icon"
                    onClick={toggleFavorite}
                  />
                ) : (
                  <Image
                    className="absolute transition-opacity duration-1 ease-in-out"
                    src="/assets/icons/heart.svg"
                    width={23}
                    height={23}
                    alt="Heart Icon"
                    onClick={toggleFavorite}
                  />
                )}
              </div>
              <Image
                width={300}
                height={300}
                className="flex w-full"
                layout="responsive"
                src={mainImage}
                alt="Main Image"
              />
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-4 ml-16 max-md:ml-5">
            <h1 className="text-3xl  font-bold max-md:text-xl ">
              {product.name}
            </h1>
            <hr className="flex w-full border-0.5 border-gray-200" />
            <p className="text-4xl font-bold ">${product.price}</p>
            <div className="flex list-none w-full mt-5 flex-col gap-2">
              <div className="list-item w-full">
                <div className="flex w-full">
                  <p className="font-bold flex-[0_0_150px]">Brand</p>
                  <p className="flex-1">{product.brand}</p>
                </div>
              </div>
              {product.storage !== "null" && (
                <div className="list-item w-full">
                  <div className="flex w-full">
                    <p className="font-bold flex-[0_0_150px]">Storage</p>
                    <p className="flex-1">{product.storage}</p>
                  </div>
                </div>
              )}
              <div className="list-item w-full">
                <div className="flex w-full">
                  <p className="font-bold flex-[0_0_150px]">Weight</p>
                  <p className="flex-1">{product.weight}</p>
                </div>
              </div>
              {product.display !== "null" && (
                <div className="list-item w-full">
                  <div className="flex w-full">
                    <p className="font-bold flex-[0_0_150px]">Display</p>
                    <p className="flex-1">{product.display}</p>
                  </div>
                </div>
              )}
              {product.memory !== "null" && (
                <div className="list-item w-full">
                  <div className="flex w-full">
                    <p className="font-bold flex-[0_0_150px]">Memory (RAM)</p>
                    <p className="flex-1">{product.memory}</p>
                  </div>
                </div>
              )}
              {product.cpu !== "null" && (
                <div className="list-item w-full">
                  <div className="flex w-full">
                    <p className="font-bold flex-[0_0_150px]">CPU</p>
                    <p className="flex-1">{product.cpu}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-end gap-4 mt-10">
              <p>Quantity</p>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="capitalize">
                    {selectedValue}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Single selection example"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedKeys}
                  onSelectionChange={handleSelectionChange}
                >
                  {Array.from({ length: product.quantity }, (_, i) => (
                    <DropdownItem key={i + 1}>{i + 1}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              <button
                type="submit"
                onClick={addToCart}
                className={`flex w-[200px] pl-5 pr-5 pt-2 pb-2 items-center rounded-lg justify-center text-md p-2 max-md:text-xs font-bold ${
                  isInCart
                    ? "bg-gray-300 text-gray-700 border border-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white border border-blue-500"
                }`}
                disabled={isInCart}
              >
                {isInCart ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>

        {products.length > 0 && (
          <p className="font-bold mt-10 text-xl">Related Products</p>
        )}
        <div className="flex overflow-x-scroll space-x-4 mt-4 pb-12">
          <div className="flex space-x-4 w-max">
            {products.length > 0 &&
              products.map((product) => (
                <Link
                  href={`/productsview/singleProduct/${product._id}/`}
                  key={product._id}
                >
                  <ProductCard
                    thumbnail={product.thumbnail}
                    category={product.category}
                    name={product.name}
                    price={product.price}
                    stock={product.quantity}
                  />
                </Link>
              ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-10">
            <p className="font-bold text-xl">Customer Reviews & Ratings</p>

            <button
              type="submit"
              className="flex w-[200px] pl-5 pr-5 pt-2 pb-2 items-center rounded-lg justify-center text-blue-500 border border-blue-500 text-md p-2 max-md:text-xs font-bold"
            >
              Write a Review
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProductsPage;
