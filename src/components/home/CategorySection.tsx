import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  count: number;
}

interface CategorySectionProps {
  title?: string;
  subtitle?: string;
  categories?: Category[];
}

const CategorySection = ({
  title = "Shop By Category",
  subtitle = "Find the perfect cap for your style",
  categories = [
    {
      id: "snapback",
      name: "Snapback",
      image:
        "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      description: "Adjustable flat-brimmed caps with a modern look",
      count: 24,
    },
    {
      id: "fitted",
      name: "Fitted",
      image:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      description: "Structured caps with a perfect custom fit",
      count: 18,
    },
    {
      id: "trucker",
      name: "Trucker",
      image:
        "https://images.unsplash.com/photo-1534215754734-18e55d13e346?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      description: "Mesh-backed caps for breathability and casual style",
      count: 16,
    },
    {
      id: "dad-caps",
      name: "Dad Caps",
      image:
        "https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      description: "Soft, unstructured caps with a curved brim",
      count: 22,
    },
  ],
}: CategorySectionProps) => {
  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative rounded-lg overflow-hidden shadow-md bg-white h-[200px] group"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 max-w-none"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <div className="relative z-20 h-full flex flex-col justify-end p-5 text-white">
        <h3 className="text-xl font-bold mb-1">{category.name}</h3>
        <p className="text-sm text-gray-200 mb-2">{category.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm">{category.count} Products</span>
          <Link
            to={`/category/${category.id}`}
            className="flex items-center text-sm font-medium hover:underline group-hover:translate-x-1 transition-transform duration-300"
          >
            Shop Now
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CategorySection;
