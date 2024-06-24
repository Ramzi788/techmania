"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";

const Nav = () => {
  const [toggleDropdown, settoggleDropdown] = useState(false);
  const [toggleSettingsDropdown, settoggleSettingsDropdown] = useState(false);

  return (
    <nav className="flex flex-wrap items-center justify-between w-full p-4">
      <Link href="/">
        <p className="logo_text text-xl md:text-2xl lg:text-3xl">TechMania</p>
      </Link>
      <div className="w-full md:w-auto flex-grow mt-4 md:mt-0 lg:flex justify-center max-md:order-last max-sm:order-last">
        <SearchBar />
      </div>
      <div className="flex items-center gap-x-4 md:gap-x-10 mt-4 md:mt-0">
        <Link href="/favorites">
          <Image
            src="/assets/icons/heart (2).svg"
            width={27}
            height={27}
            alt="Wishlist"
          />
        </Link>
        <Link href="/cart">
          <Image
            src="/assets/icons/shopping-cart.svg"
            width={27}
            height={27}
            alt="Cart"
          />
        </Link>
        <div className="relative">
          <Image
            src="/assets/icons/gear.svg"
            width={27}
            height={27}
            alt="Settings"
            onClick={() => settoggleSettingsDropdown((prev) => !prev)}
            className="cursor-pointer"
          />
          {toggleSettingsDropdown && (
            <div className="dropdown">
              <Link
                href="/settings"
                className="dropdown_link"
                onClick={() => settoggleSettingsDropdown(false)}
              >
                Settings
              </Link>
            </div>
          )}
        </div>
        <div className="relative">
          <Image
            src="/assets/icons/user.svg"
            width={27}
            height={27}
            alt="User"
            onClick={() => settoggleDropdown((prev) => !prev)}
            className="cursor-pointer"
          />
          {toggleDropdown && (
            <div className="dropdown">
              <Link
                href="/profile"
                className="dropdown_link"
                onClick={() => settoggleDropdown(false)}
              >
                Profile
              </Link>
              <Link
                href="/orders"
                className="dropdown_link"
                onClick={() => settoggleDropdown(false)}
              >
                Previous Orders
              </Link>
              <Link
                href="/payments"
                className="dropdown_link"
                onClick={() => settoggleDropdown(false)}
              >
                Saved Payment Methods
              </Link>
              <hr
                className="border border-gray-250 w-full"
                onClick={() => settoggleDropdown(false)}
              />
              <Link
                href="/signOut"
                className="dropdown_link"
                onClick={() => {
                  settoggleDropdown(false);
                }}
              >
                Sign Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
