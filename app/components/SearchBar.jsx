"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = "/localhost:3000";
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/${pathname}/productsview/multipleProducts/${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <form
      className="w-full max-w-full md:max-w-[672px] relative"
      onSubmit={handleSubmit}
    >
      <div className="flex relative">
        <input
          type="search"
          placeholder="Search for products here"
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full p-4 rounded-l-md bg-searchbar focus:outline-none text-searchbartext placeholder-searchbartext"
        />
        <button
          type="submit"
          className="flex items-center px-5 rounded-r-md bg-black text-white"
        >
          <Image
            src="/assets/icons/magnifying-glass.svg"
            width={24}
            height={25}
            alt="Search"
          />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
