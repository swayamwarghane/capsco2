import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./animations.css";

interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

const FullscreenHeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const slides: HeroSlide[] = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=2000&auto=format&fit=crop",
      title: "Premium Cap Collection",
      subtitle: "Discover our handcrafted caps made with premium materials",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=2000&auto=format&fit=crop",
      title: "Stylish Caps for Everyone",
      subtitle: "Find the perfect cap to match your unique style",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=2000&auto=format&fit=crop",
      title: "New Arrivals",
      subtitle: "Check out our latest cap designs and limited editions",
    },
  ];

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, slides.length]);

  // Pause autoplay when user interacts with carousel
  const handleManualNavigation = (index: number) => {
    setCurrentSlide(index);
    setAutoplay(false);

    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      <AnimatePresence initial={false}>
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className={`absolute inset-0 w-full h-full ${
              index === currentSlide ? "z-10" : "z-0"
            }`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <motion.img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1, filter: "blur(8px)" }}
                animate={{ scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5 }}
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-6 md:px-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="max-w-lg text-white"
                >
                  <h1 className="text-5xl md:text-6xl font-bold mb-4 text-yellow-300">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-white">
                    {slide.subtitle}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-4 md:px-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 h-12 w-12"
          onClick={() =>
            handleManualNavigation(
              currentSlide === 0 ? slides.length - 1 : currentSlide - 1
            )
          }
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 h-12 w-12"
          onClick={() =>
            handleManualNavigation(
              currentSlide === slides.length - 1 ? 0 : currentSlide + 1
            )
          }
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Static Shop Now Button - Styled to match image */}
      <div className="absolute z-30 bottom-32 left-1/2 transform -translate-x-1/2">
        <Button
          size="lg"
          className="bg-blue-600 text-white hover:bg-blue-700 font-semibold text-lg px-10 py-3 h-auto rounded-md shadow-lg"
          onClick={() => {
            window.location.href = "/products";
          }}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Shop Now
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <motion.button
            type="button"
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-10 animate-shimmer" : "bg-white/50"
            }`}
            onClick={() => handleManualNavigation(index)}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

export default FullscreenHeroCarousel;
