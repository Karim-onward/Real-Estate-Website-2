import React, { useRef, useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroimage from "../assets/images/heroimage.png";
import { RadialGradient } from "react-text-gradients";

const popularLocations = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai"
];

export const AnimatedContainer = ({ children, distance = 100, direction = "vertical", reverse = false }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const directions = {
    vertical: "Y",
    horizontal: "X",
  };

  const springProps = useSpring({
    from: {
      transform: `translate${directions[direction]}(${
        reverse ? `-${distance}px` : `${distance}px`
      })`,
    },
    to: inView ? { transform: `translate${directions[direction]}(0px)` } : {},
    config: { tension: 50, friction: 25 },
  });

  return (
    <animated.div ref={ref} style={springProps}>
      {children}
    </animated.div>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (location = searchQuery) => {
    navigate(`/properties?location=${encodeURIComponent(location)}`);
  };

  return (
    <AnimatedContainer distance={50} direction="vertical">
      <div className="mt-20">
        <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 my-3 mx-6">
          {/* Background Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0 rounded-2xl overflow-hidden"
            style={{
              backgroundImage: `url(${heroimage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-sky-300/40 via-slate/10 to-transparent" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-12"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
                <RadialGradient
                  gradient={["circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%"]}
                >
                  Find Your Perfect
                  <br />
                  <span className="text-gray-800">Living Space</span>
                </RadialGradient>
              </h1>

              <p className="text-slate-700 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
                Discover your dream home in the most sought-after locations
              </p>
            </motion.div>

            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative max-w-md mx-auto"
            >
              <div className="flex flex-col md:flex-row gap-4 p-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Enter location..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-0 bg-white/90 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <button
                  onClick={() => handleSubmit()}
                  className="md:w-auto w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 
                    transition-colors flex items-center justify-center gap-2 font-medium shadow-md"
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>

              {/* Location Suggestions */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg divide-y divide-gray-100 overflow-hidden"
                  >
                    <div className="p-2">
                      <h3 className="text-xs font-medium text-gray-500 px-3 mb-2">
                        Popular Locations
                      </h3>
                      {popularLocations.map((location) => (
                        <button
                          key={location}
                          onClick={() => {
                            setSearchQuery(location);
                            handleSubmit(location);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg flex items-center 
                            justify-between text-gray-700 transition-colors"
                        >
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{location}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default Hero;