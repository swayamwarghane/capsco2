import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, RotateCcw, Download, Text } from "lucide-react";
import CartPreview from "@/components/cart/CartPreview";
import { useCart } from "@/contexts/CartContext";

interface CapCustomizerProps {
  defaultCap?: {
    baseColor: string;
    accentColor: string;
    billColor: string;
    text: string;
    textColor: string;
    textSize: number;
    style: "snapback" | "fitted" | "trucker" | "dad";
  };
}

const CapCustomizer = ({
  defaultCap = {
    baseColor: "#3B82F6",
    accentColor: "#FFFFFF",
    billColor: "#000000",
    text: "",
    textColor: "#FFFFFF",
    textSize: 24,
    style: "snapback" as const,
  },
}: CapCustomizerProps) => {
  const [cap, setCap] = useState(defaultCap);
  const [angle, setAngle] = useState(0);
  const [view, setView] = useState<"front" | "side" | "back">("front");
  const [showCart, setShowCart] = useState(false);
  const { addItem } = useCart();

  const capStyles = {
    snapback: {
      name: "Snapback",
      price: 39.99,
      description: "Flat bill with adjustable snap closure",
    },
    fitted: {
      name: "Fitted",
      price: 44.99,
      description: "Structured crown with curved bill",
    },
    trucker: {
      name: "Trucker",
      price: 34.99,
      description: "Mesh back panels with foam front",
    },
    dad: {
      name: "Dad Cap",
      price: 29.99,
      description: "Unstructured with curved bill",
    },
  };

  const colorOptions = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Red", value: "#EF4444" },
    { name: "Green", value: "#10B981" },
    { name: "Yellow", value: "#F59E0B" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Gray", value: "#6B7280" },
  ];

  const handleColorChange = (
    colorType: "baseColor" | "accentColor" | "billColor" | "textColor",
    value: string,
  ) => {
    setCap({ ...cap, [colorType]: value });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCap({ ...cap, text: e.target.value });
  };

  const handleTextSizeChange = (value: number[]) => {
    setCap({ ...cap, textSize: value[0] });
  };

  const handleStyleChange = (
    value: "snapback" | "fitted" | "trucker" | "dad",
  ) => {
    setCap({ ...cap, style: value });
  };

  const handleRotate = (direction: "left" | "right") => {
    const newAngle = direction === "left" ? angle - 45 : angle + 45;
    setAngle(newAngle);
  };

  const resetCustomization = () => {
    setCap(defaultCap);
    setAngle(0);
    setView("front");
  };

  const renderCapVisualization = () => {
    // This would ideally be a 3D model or multiple images
    // For this scaffolding, we'll use a simplified representation
    return (
      <div className="relative w-full h-[300px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{ rotateY: angle }}
          transition={{ duration: 0.5 }}
        >
          {/* Base cap shape */}
          <div className="relative w-[200px] h-[120px]">
            {/* Cap crown */}
            <div
              className="absolute top-0 w-[200px] h-[100px] rounded-t-full"
              style={{ backgroundColor: cap.baseColor }}
            >
              {/* Cap front panel (for trucker style) */}
              {cap.style === "trucker" && (
                <div
                  className="absolute top-0 left-[50px] w-[100px] h-[80px] rounded-t-full"
                  style={{ backgroundColor: cap.accentColor }}
                ></div>
              )}

              {/* Cap text */}
              {cap.text && view === "front" && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <p
                    style={{
                      color: cap.textColor,
                      fontSize: `${cap.textSize}px`,
                      fontWeight: "bold",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    {cap.text}
                  </p>
                </div>
              )}
            </div>

            {/* Cap bill */}
            <div
              className={`absolute bottom-0 left-[25px] w-[150px] h-[30px] ${cap.style === "snapback" || cap.style === "trucker" ? "rounded-sm" : "rounded-full"}`}
              style={{ backgroundColor: cap.billColor }}
            ></div>

            {/* Snapback adjustment strap */}
            {(cap.style === "snapback" || cap.style === "trucker") &&
              view === "back" && (
                <div
                  className="absolute bottom-[20px] left-[60px] w-[80px] h-[15px] rounded-sm"
                  style={{ backgroundColor: cap.accentColor }}
                ></div>
              )}
          </div>
        </motion.div>

        {/* View controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView("front")}
            className={view === "front" ? "bg-blue-100" : ""}
          >
            Front
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView("side")}
            className={view === "side" ? "bg-blue-100" : ""}
          >
            Side
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView("back")}
            className={view === "back" ? "bg-blue-100" : ""}
          >
            Back
          </Button>
        </div>

        {/* Rotation controls */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleRotate("left")}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleRotate("right")}
          >
            <RotateCcw className="h-4 w-4 transform rotate-180" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full max-w-[1400px] mx-auto p-6 bg-white">
        <h2 className="text-3xl font-bold mb-6">Customize Your Cap</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cap visualization */}
          <div>
            {renderCapVisualization()}

            <div className="mt-4 flex justify-between items-center">
              <Button variant="outline" onClick={resetCustomization}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>

              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Save Design
              </Button>
            </div>
          </div>

          {/* Customization options */}
          <div>
            <Tabs defaultValue="style" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="style">Style</TabsTrigger>
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="text">Text</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="style" className="space-y-4">
                <h3 className="text-lg font-medium">Choose Cap Style</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(capStyles).map(([styleKey, styleData]) => (
                    <Card
                      key={styleKey}
                      className={`cursor-pointer transition-all ${cap.style === styleKey ? "ring-2 ring-blue-500" : "hover:shadow-md"}`}
                      onClick={() => handleStyleChange(styleKey as any)}
                    >
                      <CardContent className="p-4">
                        <div className="aspect-video bg-gray-100 rounded-md mb-3 flex items-center justify-center overflow-hidden">
                          <img
                            src={`https://images.unsplash.com/photo-${
                              styleKey === "snapback"
                                ? "1588850561407-ed78c282e89b"
                                : styleKey === "fitted"
                                  ? "1556306535-0f09a537f0a3"
                                  : styleKey === "trucker"
                                    ? "1575428652377-a2d80e2277fc"
                                    : "1521369909029-2afed882baee"
                            }?w=300&q=80&auto=format&fit=crop`}
                            alt={`${styleData.name} cap`}
                            className="w-full h-full object-cover rounded-md max-w-none"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <h4 className="font-medium">{styleData.name}</h4>
                        <p className="text-sm text-gray-500">
                          {styleData.description}
                        </p>
                        <p className="font-bold mt-2">
                          ${styleData.price.toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="colors" className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Base Color</h3>
                  <RadioGroup
                    value={cap.baseColor}
                    onValueChange={(value) =>
                      handleColorChange("baseColor", value)
                    }
                    className="grid grid-cols-4 gap-2"
                  >
                    {colorOptions.map((color) => (
                      <div
                        key={color.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={color.value}
                          id={`base-${color.value}`}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`base-${color.value}`}
                          className={`flex items-center justify-center w-full p-2 rounded-md cursor-pointer ${cap.baseColor === color.value ? "ring-2 ring-blue-500" : "hover:bg-gray-50"}`}
                        >
                          <div
                            className="w-6 h-6 rounded-full mr-2 border border-gray-300"
                            style={{ backgroundColor: color.value }}
                          ></div>
                          <span className="text-sm">{color.name}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Accent Color</h3>
                  <RadioGroup
                    value={cap.accentColor}
                    onValueChange={(value) =>
                      handleColorChange("accentColor", value)
                    }
                    className="grid grid-cols-4 gap-2"
                  >
                    {colorOptions.map((color) => (
                      <div
                        key={color.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={color.value}
                          id={`accent-${color.value}`}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`accent-${color.value}`}
                          className={`flex items-center justify-center w-full p-2 rounded-md cursor-pointer ${cap.accentColor === color.value ? "ring-2 ring-blue-500" : "hover:bg-gray-50"}`}
                        >
                          <div
                            className="w-6 h-6 rounded-full mr-2 border border-gray-300"
                            style={{ backgroundColor: color.value }}
                          ></div>
                          <span className="text-sm">{color.name}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Bill Color</h3>
                  <RadioGroup
                    value={cap.billColor}
                    onValueChange={(value) =>
                      handleColorChange("billColor", value)
                    }
                    className="grid grid-cols-4 gap-2"
                  >
                    {colorOptions.map((color) => (
                      <div
                        key={color.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={color.value}
                          id={`bill-${color.value}`}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`bill-${color.value}`}
                          className={`flex items-center justify-center w-full p-2 rounded-md cursor-pointer ${cap.billColor === color.value ? "ring-2 ring-blue-500" : "hover:bg-gray-50"}`}
                        >
                          <div
                            className="w-6 h-6 rounded-full mr-2 border border-gray-300"
                            style={{ backgroundColor: color.value }}
                          ></div>
                          <span className="text-sm">{color.name}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Custom Text</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <Text className="h-5 w-5 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Enter text for your cap"
                      value={cap.text}
                      onChange={handleTextChange}
                      maxLength={10}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    Maximum 10 characters. Text will appear on the front of the
                    cap.
                  </p>
                </div>

                {cap.text && (
                  <>
                    <div>
                      <h3 className="text-lg font-medium mb-3">Text Color</h3>
                      <RadioGroup
                        value={cap.textColor}
                        onValueChange={(value) =>
                          handleColorChange("textColor", value)
                        }
                        className="grid grid-cols-4 gap-2"
                      >
                        {colorOptions.map((color) => (
                          <div
                            key={color.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={color.value}
                              id={`text-${color.value}`}
                              className="sr-only"
                            />
                            <Label
                              htmlFor={`text-${color.value}`}
                              className={`flex items-center justify-center w-full p-2 rounded-md cursor-pointer ${cap.textColor === color.value ? "ring-2 ring-blue-500" : "hover:bg-gray-50"}`}
                            >
                              <div
                                className="w-6 h-6 rounded-full mr-2 border border-gray-300"
                                style={{ backgroundColor: color.value }}
                              ></div>
                              <span className="text-sm">{color.name}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Text Size</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[cap.textSize]}
                          max={36}
                          min={12}
                          step={1}
                          onValueChange={handleTextSizeChange}
                        />
                        <div className="flex justify-between mt-2 text-sm text-gray-500">
                          <span>Small</span>
                          <span>Medium</span>
                          <span>Large</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>

              <TabsContent value="summary" className="space-y-6">
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Your Custom Cap</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Style:</span>
                      <span className="font-medium">
                        {capStyles[cap.style].name}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Color:</span>
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: cap.baseColor }}
                        ></div>
                        <span className="font-medium">
                          {colorOptions.find((c) => c.value === cap.baseColor)
                            ?.name || "Custom"}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Accent Color:</span>
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: cap.accentColor }}
                        ></div>
                        <span className="font-medium">
                          {colorOptions.find((c) => c.value === cap.accentColor)
                            ?.name || "Custom"}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Bill Color:</span>
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: cap.billColor }}
                        ></div>
                        <span className="font-medium">
                          {colorOptions.find((c) => c.value === cap.billColor)
                            ?.name || "Custom"}
                        </span>
                      </div>
                    </div>

                    {cap.text && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Custom Text:</span>
                          <span className="font-medium">{cap.text}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">Text Color:</span>
                          <div className="flex items-center">
                            <div
                              className="w-4 h-4 rounded-full mr-2"
                              style={{ backgroundColor: cap.textColor }}
                            ></div>
                            <span className="font-medium">
                              {colorOptions.find(
                                (c) => c.value === cap.textColor,
                              )?.name || "Custom"}
                            </span>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between text-lg">
                        <span className="font-medium">Price:</span>
                        <span className="font-bold">
                          ${capStyles[cap.style].price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Custom text and colors included at no extra charge
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    addItem({
                      id: `custom-${Date.now()}`,
                      name: `Custom ${capStyles[cap.style].name} Cap`,
                      price: capStyles[cap.style].price,
                      quantity: 1,
                      color:
                        colorOptions.find((c) => c.value === cap.baseColor)
                          ?.name || "Custom",
                      size: "M",
                      image: `https://images.unsplash.com/photo-${
                        cap.style === "snapback"
                          ? "1588850561407-ed78c282e89b"
                          : cap.style === "fitted"
                            ? "1556306535-0f09a537f0a3"
                            : cap.style === "trucker"
                              ? "1575428652377-a2d80e2277fc"
                              : "1521369909029-2afed882baee"
                      }?w=300&q=80&auto=format&fit=crop`,
                    });
                    setShowCart(true);
                  }}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Cart Preview */}
      <CartPreview isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
};

export default CapCustomizer;
