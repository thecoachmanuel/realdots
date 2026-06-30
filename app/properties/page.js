import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import PropertiesClient from '@/components/PropertiesClient';

export const revalidate = 0;

async function getAllProperties() {
  try {
    await dbConnect();
    const properties = await Property.find({}).sort({ createdAt: -1 }).lean();
    return properties.map(doc => {
      const prop = { ...doc };
      prop._id = prop._id.toString();
      prop.createdAt = prop.createdAt.toISOString();
      return prop;
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export default async function PropertiesPage() {
  const properties = await getAllProperties();

  return (
    <>
      <Header />
      <main style={{ padding: '120px 0 60px', background: 'var(--cultured-2)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 className="h2 section-title">Explore All Properties</h1>
            <p className="section-text" style={{ color: 'var(--cadet)' }}>
              Find your perfect home in Nigeria. Use the search and filters below to narrow down your options.
            </p>
          </div>
          
          <PropertiesClient initialProperties={properties} />
          
        </div>
      </main>
      <Footer />
    </>
  );
}
