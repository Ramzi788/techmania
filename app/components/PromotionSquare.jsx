"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const PromotionSquare = ({ src, title, desc, price, href }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or return a fallback placeholder
  }

  return (
    <Link href={href}>
      <div className="relative w-fit max-xl:w-full">
        <Image
          src={src}
          width={600}
          layout="responsive"
          height={150}
          className="object-cover"
          alt={title}
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 rounded-lg w-full"></div>
        <div className="absolute inset-0 flex flex-col gap-7 p-8 w-full">
          <p className="text-white font-bold">{title}</p>
          <p className="text-white text-sm">{desc}</p>
          <div className="flex justify-between">
            <div className="flex flex-col gap-3 w-full">
              <p className="text-gray-50 text-xs">Starting From</p>
              <div className="flex justify-between w-full">
                <p className="text-white font-bold text-lg">${price}</p>
                <Link href={href}>
                  <Image
                    src="/assets/icons/arrow-right.svg"
                    width={24}
                    height={20}
                    alt="arrow"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PromotionSquare;
