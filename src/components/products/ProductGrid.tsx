import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Search,
  X,
} from "lucide-react";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  colors: string[];
  category: string;
  description?: string;
  sizes?: string[];
  images?: string[];
}

interface ProductGridProps {
  products?: Product[];
  title?: string;
  showFilters?: boolean;
  initialCategory?: string;
}

const ProductGrid = ({
  products = [
    {
      id: "7",
      name: "Urban Streetwear Cap",
      price: 32.99,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1517941823-815bea90d291?q=80&w=500&auto=format&fit=crop",
      colors: ["#000000", "#3B82F6", "#10B981"],
      category: "snapback",
      description: "Urban style snapback with bold graphic design.",
      sizes: ["S", "M", "L", "XL"],
      images: [
        "https://images.unsplash.com/photo-1517941823-815bea90d291?q=80&w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop",
      ],
    },
    {
      id: "8",
      name: "Retro Baseball Cap",
      price: 28.99,
      rating: 4.4,
      image:
        "https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=500&auto=format&fit=crop",
      colors: ["#000000", "#EF4444", "#3B82F6"],
      category: "fitted",
      description: "Retro-inspired fitted baseball cap with team logo.",
      sizes: ["S", "M", "L", "XL"],
      images: [
        "https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop",
      ],
    },
    {
      id: "9",
      name: "Outdoor Adventure Cap",
      price: 27.99,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=500&auto=format&fit=crop",
      colors: ["#10B981", "#F59E0B", "#6B7280"],
      category: "dad-caps",
      description: "Durable dad cap perfect for outdoor adventures.",
      sizes: ["S", "M", "L", "XL"],
      images: [
        "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop",
      ],
    },
    {
      id: "10",
      name: "Summer Mesh Cap",
      price: 26.99,
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=500&auto=format&fit=crop",
      colors: ["#3B82F6", "#F59E0B", "#FFFFFF"],
      category: "trucker",
      description: "Breathable mesh trucker cap for hot summer days.",
      sizes: ["S", "M", "L", "XL"],
      images: [
        "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop",
      ],
    },
    {
      id: "1",
      name: "Classic Snapback",
      price: 29.99,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop",
      colors: ["#000000", "#3B82F6", "#EF4444", "#10B981"],
      category: "snapback",
      description: "Premium quality snapback with adjustable strap.",
      sizes: ["S", "M", "L", "XL"],
      images: [
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=500&auto=format&fit=crop",
      ],
    },
    {
      id: "2",
      name: "Vintage Trucker Cap",
      price: 34.99,
      rating: 4.2,
      image:
        "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=500&auto=format&fit=crop",
      colors: ["#000000", "#3B82F6", "#EF4444"],
      category: "trucker",
      description:
        "Vintage style trucker cap with mesh back for breathability.",
      sizes: ["S", "M", "L", "XL"],
      images: [
        "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop",
      ],
    },
    {
      id: "3",
      name: "Premium Fitted Cap",
      price: 39.99,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=500&auto=format&fit=crop",
      colors: ["#000000", "#3B82F6", "#10B981"],
      category: "fitted",
      description: "Premium fitted cap with embroidered logo.",
      sizes: ["S", "M", "L", "XL"],
      images: [
        "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop",
      ],
    },
    {
      id: "4",
      name: "Classic Dad Cap",
      price: 24.99,
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=500&auto=format&fit=crop",
      colors: ["#000000", "#EF4444", "#10B981"],
      category: "dad-caps",
      description: "Classic dad cap with curved brim and adjustable strap.",
      sizes: ["S", "M", "L", "XL"],
      images: [
        "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop",
      ],
    },
    {
      id: "5",
      name: "Sport Performance Cap",
      price: 32.99,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=500&auto=format&fit=crop",
      colors: ["#000000", "#3B82F6", "#EF4444"],
      category: "snapback",
      description: "Sport performance cap with moisture-wicking technology.",
      sizes: ["S", "M", "L", "XL"],
      images: [
        "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop",
      ],
    },
    {
      id: "6",
      name: "Embroidered Snapback",
      price: 36.99,
      rating: 4.4,
      image:
        "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=500&auto=format&fit=crop",
      colors: ["#000000", "#3B82F6", "#10B981"],
      category: "snapback",
      description: "Snapback cap with custom embroidered design.",
      sizes: ["S", "M", "L", "XL"],
      images: [
        "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=500&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop",
      ],
    },
  ],
  title = "Our Collection",
  showFilters = true,
  initialCategory = "",
}: ProductGridProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortOption, setSortOption] = useState("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // All available categories from products
  const categories = [
    { value: "", label: "All Categories" },
    { value: "snapback", label: "Snapback" },
    { value: "fitted", label: "Fitted" },
    { value: "trucker", label: "Trucker" },
    { value: "dad-caps", label: "Dad Caps" },
  ];

  // All available colors from products
  const availableColors = [
    { value: "#000000", label: "Black" },
    { value: "#3B82F6", label: "Blue" },
    { value: "#EF4444", label: "Red" },
    { value: "#10B981", label: "Green" },
  ];

  // Sort options
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
  ];

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      result = result.filter((product) =>
        product.colors.some((color) => selectedColors.includes(color)),
      );
    }

    // Filter by price range
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1],
    );

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // In a real app, you would sort by date
        // Here we just reverse the array as a placeholder
        result.reverse();
        break;
      default:
        // Featured - no specific sorting
        break;
    }

    setFilteredProducts(result);
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedColors,
    priceRange,
    sortOption,
  ]);

  const handleColorToggle = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct({
      ...product,
      sizes: product.sizes || ["S", "M", "L", "XL"],
      images: product.images || [product.image],
      description: product.description || "No description available.",
    });
    setShowQuickView(true);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedColors([]);
    setPriceRange([0, 100]);
    setSortOption("featured");
  };

  // Animation variants for grid items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full sm:w-auto sm:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search caps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Sort Dropdown */}
            <div className="w-full sm:w-[200px]">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Filter Button */}
            <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="sm:hidden flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your product search with filters
                  </SheetDescription>
                </SheetHeader>

                <div className="py-6 space-y-6">
                  {/* Categories */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.value} className="flex items-center">
                          <Checkbox
                            id={`mobile-category-${category.value}`}
                            checked={selectedCategory === category.value}
                            onCheckedChange={() =>
                              setSelectedCategory(
                                selectedCategory === category.value
                                  ? ""
                                  : category.value,
                              )
                            }
                          />
                          <Label
                            htmlFor={`mobile-category-${category.value}`}
                            className="ml-2"
                          >
                            {category.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Colors</h3>
                    <div className="flex flex-wrap gap-3">
                      {availableColors.map((color) => (
                        <div
                          key={color.value}
                          className={`h-8 w-8 rounded-full cursor-pointer border-2 ${selectedColors.includes(color.value) ? "border-blue-500" : "border-gray-200"}`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => handleColorToggle(color.value)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Price Range</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 100]}
                        value={priceRange}
                        onValueChange={(value) =>
                          setPriceRange(value as [number, number])
                        }
                        max={100}
                        step={1}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <SheetFooter>
                  <div className="flex justify-between w-full">
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="w-1/2 mr-2"
                    >
                      Clear All
                    </Button>
                    <SheetClose asChild>
                      <Button className="w-1/2 ml-2">Apply Filters</Button>
                    </SheetClose>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters Sidebar */}
        {showFilters && (
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear All
                </Button>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {/* Categories */}
                <AccordionItem value="categories">
                  <AccordionTrigger className="text-base font-medium py-3">
                    Categories
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {categories.map((category) => (
                        <div key={category.value} className="flex items-center">
                          <Checkbox
                            id={`category-${category.value}`}
                            checked={selectedCategory === category.value}
                            onCheckedChange={() =>
                              setSelectedCategory(
                                selectedCategory === category.value
                                  ? ""
                                  : category.value,
                              )
                            }
                          />
                          <Label
                            htmlFor={`category-${category.value}`}
                            className="ml-2"
                          >
                            {category.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Colors */}
                <AccordionItem value="colors">
                  <AccordionTrigger className="text-base font-medium py-3">
                    Colors
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-3 pt-2">
                      {availableColors.map((color) => (
                        <div
                          key={color.value}
                          className={`h-8 w-8 rounded-full cursor-pointer border-2 ${selectedColors.includes(color.value) ? "border-blue-500" : "border-gray-200"}`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => handleColorToggle(color.value)}
                          title={color.label}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Price Range */}
                <AccordionItem value="price">
                  <AccordionTrigger className="text-base font-medium py-3">
                    Price Range
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-2 pt-4">
                      <Slider
                        defaultValue={[0, 100]}
                        value={priceRange}
                        onValueChange={(value) =>
                          setPriceRange(value as [number, number])
                        }
                        max={100}
                        step={1}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {/* Active Filters */}
          {(selectedCategory || selectedColors.length > 0 || searchQuery) && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">Active Filters:</span>

              {selectedCategory && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs rounded-full"
                  onClick={() => setSelectedCategory("")}
                >
                  {categories.find((c) => c.value === selectedCategory)?.label}
                  <X className="ml-1 h-3 w-3" />
                </Button>
              )}

              {selectedColors.map((color) => (
                <Button
                  key={color}
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs rounded-full"
                  onClick={() => handleColorToggle(color)}
                >
                  <div
                    className="h-3 w-3 rounded-full mr-1"
                    style={{ backgroundColor: color }}
                  />
                  {availableColors.find((c) => c.value === color)?.label}
                  <X className="ml-1 h-3 w-3" />
                </Button>
              ))}

              {searchQuery && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs rounded-full"
                  onClick={() => setSearchQuery("")}
                >
                  Search: {searchQuery}
                  <X className="ml-1 h-3 w-3" />
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-blue-600"
                onClick={clearFilters}
              >
                Clear All
              </Button>
            </div>
          )}

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-gray-500">
              Showing {filteredProducts.length} results
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    image={product.image}
                    colors={product.colors}
                    category={product.category}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-6 max-w-md">
                We couldn't find any products matching your current filters. Try
                adjusting your search or filters.
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal
          open={showQuickView}
          onOpenChange={setShowQuickView}
          product={{
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            rating: selectedProduct.rating,
            description: selectedProduct.description || "",
            colors: selectedProduct.colors.map((color) => {
              const colorName =
                availableColors.find((c) => c.value === color)?.label ||
                "Color";
              return colorName;
            }),
            sizes: selectedProduct.sizes || ["S", "M", "L", "XL"],
            images: selectedProduct.images || [selectedProduct.image],
          }}
        />
      )}
    </div>
  );
};

export default ProductGrid;
