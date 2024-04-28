import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: { 
    type: [String],
    required: true
 },
  beds: {
    type: Number,
    required: true,
  },
  baths: {
    type: Number,
    required: true,
  },
  sqft: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amenities: {
    type: Array,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Property = mongoose.model("Property", propertySchema);

export default Property;
