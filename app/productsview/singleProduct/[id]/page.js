"use client";
import Menu from "@app/components/Menu";
import Loading from "@app/loading";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductsPage = () => {
  const pathname = usePathname();
  const id = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      console.log("Fetching product with ID:", id);
      fetch(`http://localhost:3000/api/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setMainImage(data.thumbnail);
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [id]);

  const handleImageClick = (url, index) => {
    setMainImage(url);
    setActiveImageIndex(index);
  };

  if (!product) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="product-detail">
      <Menu />
      <div className="flex flex-col w-full pl-24 pr-24 max-sm:pl-4 max-sm:pr-4">
        <section className="flex gap-3 align-center mt-10">
          <p className=" text-gray-400">{product.category}</p>
          <div className="border border-r-black border-white "></div>
          <p className="font-bold">{product.name}</p>
        </section>
        <div className="flex w-full">
          <div className="flex align-center">
            <div>
              <div className="flex flex-col mt-5 overflow-y-scroll space-y-4 hide-scrollbar max-h-[450px]">
                {product.additional_images.map((url, index) => (
                  <div
                    key={index}
                    className={`w-32 h-32 cursor-pointer p-2 ${
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
            <div className="w-[550px]">
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
          <div className="mt-12 flex flex-col gap-4 ml-16">
            <h1 className="text-3xl  font-bold ">{product.name}</h1>
            <hr className="flex w-full border-0.5 border-gray-200" />
            <p className="text-4xl font-bold ">${product.price}</p>
            <div className="flex list-none w-full mt-5 flex-col gap-2">
              <div className="list-item w-full">
                <div className="flex w-full">
                  <p className="font-bold flex-[0_0_150px]">Brand</p>
                  <p className="flex-1">{product.brand}</p>
                </div>
              </div>
              {product.storage != "null" && (
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
              {product.display != "null" && (
                <div className="list-item w-full">
                  <div className="flex w-full">
                    <p className="font-bold flex-[0_0_150px]">Display</p>
                    <p className="flex-1">{product.display}</p>
                  </div>
                </div>
              )}
              {product.memory != "null" && (
                <div className="list-item w-full">
                  <div className="flex w-full">
                    <p className="font-bold flex-[0_0_150px]">Memory (RAM)</p>
                    <p className="flex-1">{product.memory}</p>
                  </div>
                </div>
              )}
              {product.cpu != "null" && (
                <div className="list-item w-full">
                  <div className="flex w-full">
                    <p className="font-bold flex-[0_0_150px]">CPU</p>
                    <p className="flex-1">{product.cpu}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex align-center">
          <div className="flex align-center">
            <div className="flex">
              <Image
                src="/assets/icons/minus-circle.svg"
                width={40}
                height={40}
                alt="Minus Circle"
              />
            </div>
            <button
              type="button"
              className="flex mt-5 w-[200px] pl-5 pr-5 pt-3 pb-3 items-center justify-center text-white border border-blue-500 bg-blue-500 rounded-full text-md p-2 max-md:text-xs font-bold"
            >
              Shop Now
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
