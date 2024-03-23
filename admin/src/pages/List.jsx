import React, { useState, useEffect } from "react";
import { 
  Trash2, 
  Edit3, 
  Search, 
  Filter, 
  Plus, 
  Home,
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  Building,
  Loader 
} from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { backendurl } from "../App";

const PropertyListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendurl}/api/products/list`);
      if (response.data.success) {
        const parsedProperties = response.data.property.map(property => ({
          ...property,
          amenities: parseAmenities(property.amenities)
        }));
        setProperties(parsedProperties);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const parseAmenities = (amenities) => {
    if (!amenities || !Array.isArray(amenities)) return [];
    try {
      return typeof amenities[0] === "string" 
        ? JSON.parse(amenities[0].replace(/'/g, '"'))
        : amenities;
    } catch (error) {
      console.error("Error parsing amenities:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleRemoveProperty = async (propertyId, propertyTitle) => {
    if (window.confirm(`Are you sure you want to remove "${propertyTitle}"?`)) {
      try {
        const response = await axios.post(`${backendurl}/api/products/remove`, {
          id: propertyId
        });

        if (response.data.success) {
          toast.success("Property removed successfully");
          await fetchProperties();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error removing property:", error);
        toast.error("Failed to remove property");
      }
    }
  };

  const filteredProperties = properties
    .filter(property => {
      const matchesSearch = !searchTerm || 
        [property.title, property.location, property.type]
          .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = filterType === "all" || property.type.toLowerCase() === filterType.toLowerCase();
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Property Listings
            </h1>
            <p className="text-gray-600">
              {filteredProperties.length} Properties Found
            </p>
          </div>

          <Link 
            to="/add"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Property
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-4 h-4" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="house">Houses</option>
                  <option value="apartment">Apartments</option>
                  <option value="villa">Villas</option>
                  <option value="office">Offices</option>
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProperties.map((property) => (
              <motion.div
                key={property._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Property Image */}
                <div className="relative h-48">
                  <img
                    src={property.image[0] || "/placeholder.jpg"}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                      {property.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Link 
                      to={`/update/${property._id}`}
                      className="p-2 bg-white/90 backdrop-blur-sm text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleRemoveProperty(property._id, property.title)}
                      className="p-2 bg-white/90 backdrop-blur-sm text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {property.title}
                    </h2>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {property.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{property.price.toLocaleString()}
                    </p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      property.availability === 'rent' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      For {property.availability}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                      <BedDouble className="w-5 h-5 text-gray-400 mb-1" />
                      <span className="text-sm text-gray-600">{property.beds} Beds</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                      <Bath className="w-5 h-5 text-gray-400 mb-1" />
                      <span className="text-sm text-gray-600">{property.baths} Baths</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                      <Maximize className="w-5 h-5 text-gray-400 mb-1" />
                      <span className="text-sm text-gray-600">{property.sqft} sqft</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  {property.amenities.length > 0 && (
                    <div className="border-t pt-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        {property.amenities.slice(0, 3).map((amenity, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                          >
                            <Building className="w-3 h-3 mr-1" />
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{property.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProperties.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-lg shadow-sm"
          >
            <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PropertyListings;