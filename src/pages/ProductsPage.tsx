import React from "react";
import Navbar from "@/components/layout/Navbar";
import ProductGrid from "@/components/products/ProductGrid";
import { useLocation } from "react-router-dom";

const ProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category") || "";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-8 pb-16">
        <ProductGrid
          title="All Caps"
          showFilters={true}
          initialCategory={category}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
