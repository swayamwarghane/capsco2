import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Star, Plus, Minus, ShoppingCart } from "lucide-react";
import CartPreview from "@/components/cart/CartPreview";
import { useCart } from "@/contexts/CartContext";

interface QuickViewModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  product?: {
    id: string;
    name: string;
    price: number;
    rating: number;
    description: string;
    colors: string[];
    sizes: string[];
    images: string[];
  };
}

const QuickViewModal = ({
  open = true,
  onOpenChange,
  product = {
    id: "1",
    name: "Classic Snapback Cap",
    price: 39.99,
    rating: 4.5,
    description:
      "Premium quality snapback cap with adjustable strap. Made from durable materials with a comfortable fit for all-day wear.",
    colors: ["Black", "Navy", "Red", "Gray"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=500&auto=format&fit=crop",
    ],
  },
}: QuickViewModalProps) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const { addItem } = useCart();

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    // Add the item to cart using the context
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
      image: product.images[0],
    });

    // Close the modal and show cart
    if (onOpenChange) {
      onOpenChange(false);
    }
    setShowCart(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] bg-white p-0 overflow-hidden">
          <div className="flex flex-col md:flex-row h-full">
            {/* Product Images Section */}
            <div className="md:w-1/2 bg-gray-50 p-4">
              <div className="relative aspect-square overflow-hidden rounded-md mb-4">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="object-cover w-full h-full transition-all duration-300 hover:scale-105 max-w-none"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="flex space-x-2 justify-center">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 ${activeImage === index ? "border-blue-500" : "border-transparent"}`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="object-cover w-full h-full max-w-none"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="md:w-1/2 p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {product.name}
                </DialogTitle>
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} stars
                  </span>
                </div>
                <div className="mt-2 text-xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </div>
              </DialogHeader>

              <DialogDescription className="mt-4 text-gray-700">
                {product.description}
              </DialogDescription>

              <div className="mt-6 space-y-6">
                {/* Color Selection */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <RadioGroup
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                    className="mt-2 flex space-x-3"
                  >
                    {product.colors.map((color) => (
                      <div key={color} className="flex items-center">
                        <RadioGroupItem
                          value={color}
                          id={`color-${color}`}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`color-${color}`}
                          className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${selectedColor === color ? "ring-2 ring-blue-500" : ""}`}
                        >
                          <span className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center text-xs">
                            {color.charAt(0)}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Size Selection */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Select a size" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Quantity
                  </h3>
                  <div className="flex items-center mt-2 border rounded-md w-32">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleDecreaseQuantity}
                      className="h-8 w-8"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 text-center">{quantity}</div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleIncreaseQuantity}
                      className="h-8 w-8"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-8">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cart Preview */}
      <CartPreview isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
};

export default QuickViewModal;
