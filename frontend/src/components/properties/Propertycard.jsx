import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  IndianRupee, 
  BedDouble, 
  Bath, 
  Maximize,
  Share2,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import PropTypes from 'prop-types';

const PropertyCard = ({ property, viewType }) => {
  const isGrid = viewType === 'grid';
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const handleNavigateToDetails = () => {
    navigate(`/properties/single/${property._id}`);
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: property.title,
          text: `Check out this property: ${property.title}`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleImageNavigation = (e, direction) => {
    e.stopPropagation();
    const imagesCount = property.image.length;
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % imagesCount);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + imagesCount) % imagesCount);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300
        ${isGrid ? 'flex flex-col' : 'flex flex-row gap-6'}`}
      onClick={handleNavigateToDetails}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Image Carousel Section */}
      <div className={`relative ${isGrid ? 'h-64' : 'w-96'}`}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={property.image[currentImageIndex]}
            alt={property.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover rounded-t-xl rounded-b-none"
          />
        </AnimatePresence>

        {/* Image Navigation Controls */}
        {showControls && property.image.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
              onClick={(e) => handleImageNavigation(e, 'prev')}
              className="p-1 rounded-full bg-white/80 backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
              onClick={(e) => handleImageNavigation(e, 'next')}
              className="p-1 rounded-full bg-white/80 backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </motion.button>
          </div>
        )}

        {/* Image Indicators */}
        {property.image.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {property.image.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300
                  ${index === currentImageIndex ? 'bg-white w-3' : 'bg-white/60'}`}
              />
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleShare}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-blue-50 
              transition-colors shadow-lg"
          >
            <Share2 className="w-4 h-4 text-gray-700" />
          </motion.button>
        </div>

        {/* Property Tags */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white 
              px-3 py-1 rounded-full text-sm font-medium shadow-lg"
          >
            {property.type}
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-green-600 to-green-500 text-white 
              px-3 py-1 rounded-full text-sm font-medium shadow-lg"
          >
            {property.availability}
          </motion.span>
        </div>
      </div>

      {/* Content Section */}
      <div className={`flex-1 p-6 ${isGrid ? '' : 'flex flex-col justify-between'}`}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
              {property.location}
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Eye className="w-4 h-4" />
              <span>{Math.floor(Math.random() * 100) + 20}</span>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 
            group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center gap-2">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Price</p>
              <div className="flex items-center gap-1">
                <IndianRupee className="w-5 h-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">
                  {Number(property.price).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            {/* Rest of your price-related content */}
          </div>
        </div>

        {/* Property Features */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="flex flex-col items-center gap-1 bg-blue-50 p-2 rounded-lg">
            <BedDouble className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">
              {property.beds} {property.beds > 1 ? 'Beds' : 'Bed'}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-blue-50 p-2 rounded-lg">
            <Bath className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">
              {property.baths} {property.baths > 1 ? 'Baths' : 'Bath'}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-blue-50 p-2 rounded-lg">
            <Maximize className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">
              {property.sqft} sqft
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.object.isRequired,
  viewType: PropTypes.string.isRequired
};

export default PropertyCard;