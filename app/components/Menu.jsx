"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Menu = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/productsview/multipleProducts/All" },
    { name: "Phones", href: "/productsview/multipleProducts/Phones" },
    { name: "Laptops", href: "/productsview/multipleProducts/Laptops" },
    { name: "Desktops", href: "/productsview/multipleProducts/Desktops" },
    { name: "Wearables", href: "/productsview/multipleProducts/Wearables" },
    { name: "Accessories", href: "/productsview/multipleProducts/Accessories" },
  ];

  const pathname = usePathname();

  return (
    <div className="flex pl-16 gap-16 bg-menucontainer mt-5 text-white p-4 w-full font-archivo_black text-xs max-md:flex-col max-md:pt-8 max-md:pl-8">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            href={link.href}
            key={link.name}
            className={isActive ? "text-white" : "text-inactive"}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
