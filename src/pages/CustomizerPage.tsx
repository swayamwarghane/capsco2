import React from "react";
import Navbar from "@/components/layout/Navbar";
import CapCustomizer from "@/components/customizer/CapCustomizer";

const CustomizerPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Design Your Own Cap
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Create a unique cap that matches your style with our interactive cap
          customizer. Choose colors, add text, and make it your own.
        </p>
        <CapCustomizer />
      </div>
    </div>
  );
};

export default CustomizerPage;
