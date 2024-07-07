import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  MapPin, 
  IndianRupee, 
  BedDouble, 
  Bath, 
  Maximize, 
  Heart,
  Eye,
  ArrowRight,
  Building,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Backendurl } from '../App';
import PropTypes from "prop-types";

// Sample featured properties for fallback
const sampleProperties = [
  {
    _id: "sample1",
    title: "Luxury Beachfront Villa",
    location: "Juhu Beach, Mumbai",
    price: 25000000,
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: "Villa",
    availability: "Buy",
    image: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"]
  },
  {
    _id: "sample2",
    title: "Modern Highrise Apartment",
    location: "Bandra West, Mumbai",
    price: 18500000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "Apartment",
    availability: "Rent",
    image: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"]
  },
  {
    _id: "sample3",
    title: "Riverside Townhouse",
    location: "Koramangala, Bangalore",
    price: 12000000,
    beds: 3,
    baths: 2.5,
    sqft: 2200,
    type: "House",
    availability: "Buy",
    image: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"]
  }
];

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleNavigate = () => {
    navigate(`/properties/single/${property._id}`);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // Here you would typically call an API to save to user's favorites
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={handleNavigate}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Property Image */}
      <div className="relative h-64">
        <img
          src={property.image[0]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {/* Property badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md">
            {property.type}
          </span>
          <span className={`text-xs font-medium px-3 py-1.5 rounded-full shadow-md 
            ${property.availability === 'Rent' 
              ? 'bg-green-600 text-white' 
              : 'bg-purple-600 text-white'}`}>
            For {property.availability}
          </span>
        </div>
        
        {/* Favorite button */}
        <button 
          onClick={toggleFavorite}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 
            ${isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:text-red-500'}`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        
        {/* View overlay on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="px-5 py-3 bg-white text-blue-600 rounded-lg font-medium flex items-center gap-2 shadow-lg"
              >
                <Eye className="w-5 h-5" />
                View Details
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Property Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-blue-500" />
          <span className="line-clamp-1">{property.location}</span>
        </div>
        
        {/* Property Features */}
        <div className="flex justify-between items-center py-3 border-y border-gray-100 mb-4">
          <div className="flex items-center gap-1">
            <BedDouble className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600">{property.beds} {property.beds > 1 ? 'Beds' : 'Bed'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600">{property.baths} {property.baths > 1 ? 'Baths' : 'Bath'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600">{property.sqft} sqft</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-blue-600 font-bold">
            <IndianRupee className="h-5 w-5 mr-1" />
            <span className="text-xl">{Number(property.price).toLocaleString('en-IN')}</span>
          </div>
          
          <div className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-md flex items-center">
            <Building className="w-3.5 h-3.5 mr-1" />
            {property.availability === 'Rent' ? 'Rental' : 'Purchase'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PropertiesShow = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', label: 'All Properties' },
    { id: 'apartment', label: 'Apartments' },
    { id: 'villa', label: 'Villas' },
    { id: 'house', label: 'Houses' }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${Backendurl}/api/products/list`);
        
        if (response.data.success) {
          // Take only the first 6 properties for featured section
          const featuredProperties = response.data.property.slice(0, 6);
          setProperties(featuredProperties);
        } else {
          setError('Failed to fetch properties');
          // Fallback to sample data in case of API error
          setProperties(sampleProperties);
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties. Using sample data instead.');
        // Fallback to sample data
        setProperties(sampleProperties);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = activeCategory === 'all' 
    ? properties 
    : properties.filter(property => property.type.toLowerCase() === activeCategory);

  const viewAllProperties = () => {
    navigate('/properties');
  };

  if (loading) {
    return (
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/4 mx-auto mb-16"></div>
            
            <div className="h-10 bg-gray-100 rounded-lg w-full max-w-md mx-auto mb-8 flex justify-center gap-4">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="h-8 bg-gray-200 rounded-full w-24"></div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-xl shadow h-96">
                  <div className="h-64 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Explore Properties</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Featured Properties
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties designed to match your lifestyle needs
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200
                ${activeCategory === category.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'}`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-amber-700 bg-amber-50 p-4 rounded-lg border border-amber-200 mb-8 max-w-md mx-auto text-center"
          >
            <p className="font-medium mb-1">Note: {error}</p>
            <p className="text-sm">Showing sample properties for demonstration.</p>
          </motion.div>
        )}

        {properties.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProperties.map((property) => (
              <motion.div key={property._id} variants={itemVariants}>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-10 bg-white rounded-xl shadow-sm">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">No properties available</h3>
            <p className="text-gray-600 mb-6">No properties found in this category.</p>
            <button 
              onClick={() => setActiveCategory('all')} 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Properties
            </button>
          </div>
        )}

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={viewAllProperties}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 font-medium"
          >
            Browse All Properties
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
          <p className="text-gray-600 mt-4 text-sm">
            Discover our complete collection of premium properties
          </p>
        </motion.div>
      </div>
    </section>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.object.isRequired
};

export default PropertiesShow;