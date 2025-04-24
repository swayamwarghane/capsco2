import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface HeroCarouselProps {
  slides?: {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  }[];
}

const HeroCarousel = ({
  slides = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1500&auto=format&fit=crop",
      title: "Premium Cap Collection",
      subtitle: "Discover our handcrafted caps made with premium materials",
      ctaText: "Shop Now",
      ctaLink: "/products",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1500&auto=format&fit=crop",
      title: "Stylish Caps for Everyone",
      subtitle: "Find the perfect cap to match your unique style",
      ctaText: "Shop Now",
      ctaLink: "/products",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1500&auto=format&fit=crop",
      title: "New Arrivals",
      subtitle: "Check out our latest cap designs and limited editions",
      ctaText: "Shop Now",
      ctaLink: "/products",
    },
  ],
}: HeroCarouselProps) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

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
    <div className="relative w-full h-[600px] bg-gray-100 overflow-hidden">
      {/* Main Carousel */}
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className="relative w-full h-full">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center max-w-none"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-6 md:px-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="max-w-lg text-white"
                    >
                      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-300">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl mb-8">
                        {slide.subtitle}
                      </p>
                      <Button
                        size="lg"
                        className="bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => navigate(slide.ctaLink)}
                      >
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        {slide.ctaText}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-10">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            onClick={() =>
              handleManualNavigation(
                currentSlide === 0 ? slides.length - 1 : currentSlide - 1,
              )
            }
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            onClick={() =>
              handleManualNavigation(
                currentSlide === slides.length - 1 ? 0 : currentSlide + 1,
              )
            }
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </Carousel>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            type="button"
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white w-8" : "bg-white/50"}`}
            onClick={() => handleManualNavigation(index)}
            aria-label={`Go to slide ${index + 1} - ${slides[index].title}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
