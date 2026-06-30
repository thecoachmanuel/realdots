const mongoose = require('mongoose');

require('dotenv').config({ path: '.env.local' }); // Or just ensure it's passed in environment
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env.local");
  process.exit(1);
}

const PropertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  pricePeriod: String,
  location: String,
  image: String,
  badge: String,
  bedrooms: Number,
  bathrooms: Number,
  squareFt: Number,
  author: {
    name: String,
    title: String,
    avatar: String,
  }
});

const Property = mongoose.models.Property || mongoose.model('Property', PropertySchema);

const seedProperties = [
  {
    title: "New Apartment Nice View",
    price: 34900,
    pricePeriod: "Month",
    location: "Belmont Gardens, Chicago",
    image: "/images/property-1.jpg",
    badge: "For Rent",
    bedrooms: 3,
    bathrooms: 2,
    squareFt: 3450,
    description: "Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood",
    author: {
      name: "William Seklo",
      title: "Estate Agents",
      avatar: "/images/author.jpg"
    }
  },
  {
    title: "Modern Apartments",
    price: 34900,
    pricePeriod: "Month",
    location: "Belmont Gardens, Chicago",
    image: "/images/property-2.jpg",
    badge: "For Sales",
    bedrooms: 3,
    bathrooms: 2,
    squareFt: 3450,
    description: "Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood",
    author: {
      name: "William Seklo",
      title: "Estate Agents",
      avatar: "/images/author.jpg"
    }
  },
  {
    title: "Comfortable Apartment",
    price: 34900,
    pricePeriod: "Month",
    location: "Belmont Gardens, Chicago",
    image: "/images/property-3.jpg",
    badge: "For Rent",
    bedrooms: 3,
    bathrooms: 2,
    squareFt: 3450,
    description: "Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood",
    author: {
      name: "William Seklo",
      title: "Estate Agents",
      avatar: "/images/author.jpg"
    }
  },
  {
    title: "Luxury villa in Rego Park",
    price: 34900,
    pricePeriod: "Month",
    location: "Belmont Gardens, Chicago",
    image: "/images/property-4.png",
    badge: "For Rent",
    bedrooms: 3,
    bathrooms: 2,
    squareFt: 3450,
    description: "Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood",
    author: {
      name: "William Seklo",
      title: "Estate Agents",
      avatar: "/images/author.jpg"
    }
  }
];

async function seedDB() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected! Clearing existing properties...");
    await Property.deleteMany({});
    
    console.log("Seeding new properties...");
    await Property.insertMany(seedProperties);
    
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
