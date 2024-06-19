"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CustomDropdown from "@app/components/DropdownComponent";
import Link from "next/link";
import ProductCard from "@app/components/ProductCard";
import Menu from "@app/components/Menu";

const MultipleProducts = () => {
  const pathname = usePathname();
  const productType = pathname.substring(
    pathname.lastIndexOf("/") + 1,
    pathname.length
  );
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (productType !== "All") {
      fetch(`/api/products/${productType}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setFilteredProducts(data);
        })
        .catch((error) => console.error("Error fetching products:", error));
    } else {
      fetch(`/api/products/`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setFilteredProducts(data);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [productType]);

  useEffect(() => {
    let sortedProducts = [...products];
    if (filter === "Price: low to high") {
      sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (filter === "Price: high to low") {
      sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    setFilteredProducts(sortedProducts);
  }, [filter, products]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  if (!productType) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col ">
      <Menu />
      <div className="pl-16 pr-16 mt-10 max-sm:pl-4 max-sm:pr-4">
        <p className="text-2xl font-archivo mb-5 font-bold">
          {productType === "All" ? productType + " Products" : productType}
        </p>
        <div className="flex justify-between items-center text-gray-500">
          <p>
            Showing {filteredProducts.length} of {products.length} products.
          </p>
          <div className="flex items-center gap-4">
            <p className="max-sm:hidden">Filter By</p>
            <CustomDropdown onFilterChange={handleFilterChange} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-7 max-md:flex max-md:flex-col max-md:items-center">
          {filteredProducts.map((product) => (
            <Link
              key={product._id}
              href={`/productsview/singleProduct/${product._id}/`}
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
    </div>
  );
};

export default MultipleProducts;
