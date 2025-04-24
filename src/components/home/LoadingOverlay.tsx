import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingOverlayProps {
  duration?: number;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ duration = 2000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.2, 1],
              opacity: 1
            }}
            transition={{ 
              duration: 1.5,
              times: [0, 0.5, 1],
              repeat: Infinity
            }}
            className="relative w-32 h-32 mb-8"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full text-blue-600"
              >
                <path
                  d="M50 15 C 25 15, 15 25, 15 50 C 15 75, 25 85, 50 85 C 75 85, 85 75, 85 50 C 85 25, 75 15, 50 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M25 50 L 75 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M50 25 L 50 75"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl font-bold text-white mb-4"
          >
            CapCo.
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-1 bg-blue-600 rounded-full mb-4"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-gray-400"
          >
            Premium Cap Collection
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
