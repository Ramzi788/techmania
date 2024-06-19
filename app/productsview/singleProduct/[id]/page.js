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

  useEffect(() => {
    if (id) {
      console.log("Fetching product with ID:", id);
      fetch(`http://localhost:3000/api/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [id]);

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
      <div className="flex flex-col w-full pl-16 pr-16 mt-10 max-sm:pl-4 max-sm:pr-4">
        {" "}
        <h1>{product.name}</h1>
        <Image width={300} height={300} src={product.thumbnail} />
        <p>Category: {product.category}</p>
        <p>Price: ${product.price}</p>
        <p>Stock: {product.quantity}</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductsPage;
