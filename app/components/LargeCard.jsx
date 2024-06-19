import React from "react";
import Image from "next/image";
import Link from "next/link";

const LargeCard = () => {
  return (
    <div className="flex bg-dark_green w-full">
      <div className="flex flex-col w-[750px] pb-12 pl-16 flex-wrap pr-10 max-sm:pl-5 max-sm:gap-8">
        <p className="text-white text-4xl pt-10 w-full break-words leading-relaxed max-340px:text-sm">
          Our Largest Collection Of Laptops Has Arrived
        </p>
        <p className="text-white text-sm pt-4 w-full break-words leading-relaxed max-sm:text-xs">
          Get up to 10% Discount on Your Orders
        </p>
        <Link
          className="flex w-[350px] max-sm:w-[150px]"
          href={`/productsview/multipleProducts/Laptops`}
        >
          <button
            type="button"
            className="flex mt-5 w-full items-center justify-center text-white border border-white rounded-md text-sm p-2 max-md:text-xs"
          >
            Shop Now
          </button>
        </Link>
      </div>
      <div className="flex relative w-full max-w-[850px] min-w-[100px] h-[340px] justify-between">
        <Image
          src="/assets/images/macbook.jpg"
          width={400}
          height={300}
          layout="responsive"
          objectFit="cover"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LargeCard;
