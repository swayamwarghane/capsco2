import React from "react";
import Navbar from "@/components/layout/Navbar";
import ProductGrid from "@/components/products/ProductGrid";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { categoryId, subcategoryId } = useParams<{
    categoryId: string;
    subcategoryId?: string;
  }>();

  // Format the category name for display
  const formatCategoryName = (id: string) => {
    return id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const title = subcategoryId
    ? `${formatCategoryName(subcategoryId)} ${formatCategoryName(categoryId)}`
    : formatCategoryName(categoryId || "");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-8 pb-16">
        <ProductGrid
          title={title}
          showFilters={true}
          initialCategory={categoryId}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
