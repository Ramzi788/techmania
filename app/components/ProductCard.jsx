import Image from "next/image";
import React from "react";

const ProductCard = ({ thumbnail, category, name, price, stock }) => {
  return (
    <div className="relative p-3 flex flex-col w-[300px] hover:border border-gray-300 rounded-md group">
      <div className="absolute top-0 left-0 right-0 bottom-10 bg-transparent bg-opacity-100 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex flex-between gap-8">
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full border border-blue-700 z-10">
            <Image
              src="/assets/icons/heart.svg"
              width={23}
              height={23}
              alt="Heart Icon"
            />
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full border border-blue-700 z-10">
            <Image
              src="/assets/icons/cart-blue.svg"
              width={23}
              height={23}
              alt="Cart Icon"
            />
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
