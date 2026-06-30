import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this property.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description.'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price.'],
  },
  pricePeriod: {
    type: String,
    default: 'Month', // 'Month', 'Year', 'One-time'
  },
  location: {
    type: String,
    required: [true, 'Please provide the property location.'],
  },
  image: {
    type: String,
    required: [true, 'Please provide a primary image url.'],
  },
  images: {
    type: [String],
    default: [],
  },
  badge: {
    type: String, // 'For Rent', 'For Sales'
    default: 'For Rent',
  },
  bedrooms: {
    type: Number,
    required: [true, 'Please provide number of bedrooms.'],
  },
  bathrooms: {
    type: Number,
    required: [true, 'Please provide number of bathrooms.'],
  },
  squareFt: {
    type: Number,
    required: [true, 'Please provide square footage.'],
  },
  amenities: [String],
  author: {
    name: String,
    title: String,
    avatar: String,
  }
});

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);
