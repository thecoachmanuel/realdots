import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Service from '@/components/Service';
import PropertySection from '@/components/PropertySection';
import Features from '@/components/Features';
import Blog from '@/components/Blog';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import BlogModel from '@/models/Blog';

export const revalidate = 0; // Disable caching for now to see dynamic changes immediately

async function getProperties(amenity) {
  try {
    await dbConnect();
    const query = amenity ? { amenities: amenity } : {};
    const properties = await Property.find(query).lean();
    return JSON.parse(JSON.stringify(properties));
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

async function getBlogs() {
  try {
    await dbConnect();
    const blogs = await BlogModel.find({}).sort({ createdAt: -1 }).limit(3).lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function Home({ searchParams }) {
  const resolvedParams = await searchParams;
  const amenityFilter = resolvedParams?.amenity || null;
  const properties = await getProperties(amenityFilter);
  const blogs = await getBlogs();

  return (
    <>
      <Header />
      <main>
        <article>
          <Hero />
          <About />
          <Service />
          <PropertySection properties={properties} activeFilter={amenityFilter} />
          <Features />
          <Blog blogs={blogs} />
          <CTA />
        </article>
      </main>
      <Footer />
    </>
  );
}
