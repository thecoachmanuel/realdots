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

export const revalidate = 0; // Disable caching for now to see dynamic changes immediately

async function getProperties() {
  try {
    await dbConnect();
    const properties = await Property.find({}).lean();
    
    // Convert ObjectId and nested objects to plain strings for Next.js serialization
    return properties.map(doc => {
      const property = { ...doc };
      property._id = property._id.toString();
      return property;
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export default async function Home() {
  const properties = await getProperties();

  return (
    <>
      <Header />
      <main>
        <article>
          <Hero />
          <About />
          <Service />
          <PropertySection properties={properties} />
          <Features />
          <Blog />
          <CTA />
        </article>
      </main>
      <Footer />
    </>
  );
}
