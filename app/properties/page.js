import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import PropertiesClient from '@/components/PropertiesClient';

export const revalidate = 0;

export const metadata = {
  title: 'All Properties | RealDots',
  description: 'Browse all available properties for rent and sale across Lagos, Nigeria.',
};

async function getAllProperties() {
  try {
    await dbConnect();
    const properties = await Property.find({}).sort({ createdAt: -1 }).lean();
    // Safely serialize everything using JSON to convert all ObjectIds and Dates
    return JSON.parse(JSON.stringify(properties));
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
      <main>
        {/* Hero Banner */}
        <div style={{
          background: 'linear-gradient(135deg, var(--prussian-blue), var(--dark-jungle-green))',
          padding: '140px 0 60px',
          textAlign: 'center',
        }}>
          <div className="container">
            <p className="section-subtitle" style={{ margin: '0 auto 15px' }}>Lagos, Nigeria</p>
            <h1 className="h1" style={{ color: 'white', marginBottom: '15px', lineHeight: 1.2 }}>
              Explore All Properties
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '550px', margin: '0 auto', lineHeight: 1.7 }}>
              Find your perfect home. Search, filter and discover properties for rent and sale across the finest neighbourhoods in Lagos.
            </p>
          </div>
        </div>

        {/* Properties Section */}
        <div style={{ background: 'var(--cultured-2)', padding: '50px 0 80px' }}>
          <div className="container">
            <PropertiesClient initialProperties={properties} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

