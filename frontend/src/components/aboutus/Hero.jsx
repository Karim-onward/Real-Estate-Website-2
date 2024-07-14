import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="mt-16">
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"
            animate={{
              background: [
                'linear-gradient(to bottom right, rgba(37, 99, 235, 1), rgba(79, 70, 229, 1), rgba(124, 58, 237, 0.8))',
                'linear-gradient(to bottom right, rgba(79, 70, 229, 1), rgba(124, 58, 237, 0.8), rgba(37, 99, 235, 1))',
                'linear-gradient(to bottom right, rgba(124, 58, 237, 0.8), rgba(37, 99, 235, 1), rgba(79, 70, 229, 1))'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Animated shapes */}
          <div className="absolute inset-0 opacity-20">
            <motion.div 
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-300"
              animate={{ 
                x: [0, 30, 0, -30, 0],
                y: [0, -30, 0, 30, 0],
                scale: [1, 1.1, 1, 0.9, 1]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div 
              className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-indigo-300"
              animate={{ 
                x: [0, -40, 0, 40, 0],
                y: [0, 40, 0, -40, 0],
                scale: [1, 0.9, 1, 1.1, 1]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div 
              className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-purple-300"
              animate={{ 
                x: [0, 50, 0, -50, 0],
                y: [0, -50, 0, 50, 0],
                scale: [1, 1.2, 1, 0.8, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjMiPjxwYXRoIGQ9Ik01IDEwQzMuODk1IDEwIDMgMTAuODk1IDMgMTJ2MzhjMCAxLjEwNS44OTUgMiAyIDJoMzhWMTBINXptMzgtMkg1QzIuODEgOCAxIDkuODEgMSAxMnYzOGMwIDIuMTkgMS43OSA0IDQgNGg0MWMxLjEwNSAwIDItLjg5NSAyLTJWMTBjMC0xLjEwNS0uODk1LTItMi0yaC0zeiIvPjwvZz48L2c+PC9zdmc+')]"></div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative text-center text-white px-4 max-w-4xl mx-auto z-10"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 leading-tight">
            Building Your Future,<br />One Home at a Time
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed font-light">
            We're more than just a property platform - we're your partner in finding the perfect place to call home.
          </p>
          
          {/* Decorative line */}
          <motion.div 
            className="w-24 h-1 bg-white mx-auto mt-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          />
        </motion.div>
      </div>
    </div>
  );
}