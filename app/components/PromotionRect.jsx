"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const PromotionRect = ({ src, title, desc, price, href }) => {
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
        <div className="flex flex-col gap-7 absolute inset-0 rounded-md p-8 ">
          <div className="flex flex-col gap-5">
            <p className="promotion_text text-gray-400 text-sm">{title}</p>
            <p className="promotion_text text-black text-lg max-w-[300px]">
              {desc}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-3 w-full">
              <p className="text-gray-400 opacity-100 text-xs">Starting From</p>
              <p className="text-black font-bold text-lg">${price}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PromotionRect;
