import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CartPreview from "@/components/cart/CartPreview";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  rating?: number;
  image?: string;
  colors?: string[];
  category?: string;
}

const ProductCard = ({
  id = "1",
  name = "Premium Snapback Cap",
  price = 29.99,
  rating = 4.5,
  image = "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  colors = ["#000000", "#3B82F6", "#EF4444", "#10B981"],
  category = "snapback",
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { addItem } = useCart();

  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-4 w-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>,
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <>
      <Card
        className="w-full max-w-[320px] overflow-hidden bg-white transition-all duration-300 hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-[250px] overflow-hidden bg-gray-100">
          <motion.div
            className="h-full w-full"
            animate={{
              rotateY: isHovered ? 15 : 0,
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.5 }}
            style={{ height: "100%", width: "100%" }}
          >
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover max-w-none"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>

          {/* Quick view button overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-white text-black hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowQuickView(true);
                    }}
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Quick View</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="mb-2 text-sm font-medium uppercase text-gray-500">
            {category}
          </div>
          <h3 className="mb-2 text-lg font-semibold">{name}</h3>
          <div className="mb-3 flex items-center">
            <div className="flex mr-2">{renderStars()}</div>
            <span className="text-sm text-gray-500">({rating})</span>
          </div>
          <div className="flex space-x-2 mb-3">
            {colors.map((color, index) => (
              <div
                key={index}
                className="h-4 w-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
                aria-label={`Color option ${index + 1}`}
              />
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <div className="text-lg font-bold">${price.toFixed(2)}</div>
          <Button
            size="sm"
            className="flex items-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              addItem({
                id,
                name,
                price,
                quantity: 1,
                color: colors[0] || "#000000",
                size: "M",
                image,
              });
              setShowCart(true);
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </CardFooter>
      </Card>

      {/* Quick View Dialog */}
      <Dialog open={showQuickView} onOpenChange={setShowQuickView}>
        <DialogContent className="sm:max-w-[800px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="bg-gray-100 rounded-md overflow-hidden"
              style={{ height: "300px" }}
            >
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover max-w-none"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <div className="mb-2 text-sm font-medium uppercase text-gray-500">
                {category}
              </div>
              <h2 className="text-2xl font-bold mb-2">{name}</h2>
              <div className="mb-4 flex items-center">
                <div className="flex mr-2">{renderStars()}</div>
                <span className="text-sm text-gray-500">({rating})</span>
              </div>
              <div className="text-xl font-bold mb-4">${price.toFixed(2)}</div>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Colors</h3>
                <div className="flex space-x-3">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className="h-6 w-6 rounded-full border border-gray-300 cursor-pointer"
                      style={{ backgroundColor: color }}
                      aria-label={`Color option ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Size</h3>
                <div className="flex space-x-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <Button
                      key={size}
                      variant="outline"
                      className="w-10 h-10 p-0"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <Button className="w-full flex items-center justify-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cart Preview */}
      <CartPreview isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
};

export default ProductCard;
