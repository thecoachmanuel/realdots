import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import ContactForm from '@/components/ContactForm';
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';

export const revalidate = 0; // Disable caching to fetch live data

async function getProperty(id) {
  try {
    await dbConnect();
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const property = await Property.findById(id).lean();
    if (property) {
      property._id = property._id.toString();
    }
    return property;
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

export default async function PropertyDetails({ params }) {
  const resolvedParams = await params;
  const property = await getProperty(resolvedParams.id);

  if (!property) {
    notFound();
  }

  return (
    <>
      <Header />
      <main style={{ padding: '120px 0 60px' }}>
        <div className="container">
          <div style={{ display: 'grid', gap: '40px', gridTemplateColumns: '1fr', '@media (minWidth: 992px)': { gridTemplateColumns: '2fr 1fr' } }}>
            {/* Property Details Section */}
            <div>
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', marginBottom: '30px' }}>
                <img 
                  src={property.image} 
                  alt={property.title} 
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
                />
                <div className={`card-badge ${property.badge === 'For Rent' ? 'green' : 'orange'}`} style={{ position: 'absolute', top: '20px', left: '20px' }}>
                  {property.badge}
                </div>
              </div>
              
              <h1 className="h2" style={{ marginBottom: '15px' }}>{property.title}</h1>
              <p style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--cadet)', marginBottom: '20px' }}>
                <ion-icon name="location"></ion-icon>
                <address>{property.location}</address>
              </p>

              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--orange-soda)', marginBottom: '30px' }}>
                ₦{property.price.toLocaleString()} <span style={{ fontSize: '1rem', color: 'var(--cadet)', fontWeight: '400' }}>/{property.pricePeriod}</span>
              </div>

              <h2 className="h3" style={{ marginBottom: '15px' }}>Property Details</h2>
              <p style={{ color: 'var(--cadet)', lineHeight: '1.7', marginBottom: '30px' }}>{property.description}</p>

              <ul className="card-list" style={{ padding: '0', display: 'flex', gap: '20px', listStyle: 'none', marginBottom: '30px' }}>
                <li className="card-item" style={{ flex: '1' }}>
                  <strong>{property.bedrooms}</strong>
                  <ion-icon name="bed-outline"></ion-icon>
                  <span>Bedrooms</span>
                </li>
                <li className="card-item" style={{ flex: '1' }}>
                  <strong>{property.bathrooms}</strong>
                  <ion-icon name="man-outline"></ion-icon>
                  <span>Bathrooms</span>
                </li>
                <li className="card-item" style={{ flex: '1' }}>
                  <strong>{property.squareFt}</strong>
                  <ion-icon name="square-outline"></ion-icon>
                  <span>Square Ft</span>
                </li>
              </ul>

              {property.amenities && property.amenities.length > 0 && (
                <>
                  <h2 className="h3" style={{ marginBottom: '15px' }}>Amenities</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
                    {property.amenities.map(amenity => (
                      <span key={amenity} style={{ background: 'var(--alice-blue)', color: 'var(--dark-jungle-green)', padding: '8px 15px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '500' }}>
                        {amenity}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Contact Form Section */}
            <div style={{ '@media (minWidth: 992px)': { paddingLeft: '40px' } }}>
              <div style={{ background: 'var(--cultured-2)', padding: '30px', borderRadius: '12px' }}>
                <h3 className="h3" style={{ marginBottom: '20px', textAlign: 'center' }}>Contact RealDots</h3>
                <p style={{ color: 'var(--cadet)', marginBottom: '30px', textAlign: 'center' }}>
                  Interested in {property.title}? Send us a message directly to get started.
                </p>
                <ContactForm propertyId={property._id} propertyTitle={property.title} />
                
                <div style={{ marginTop: '30px', borderTop: '1px solid var(--alice-blue)', paddingTop: '20px', textAlign: 'center' }}>
                  <p style={{ color: 'var(--cadet)', marginBottom: '10px' }}>Or reach out directly:</p>
                  <a href="tel:+2348034382235" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--dark-jungle-green)', fontWeight: '600', marginBottom: '5px' }}>
                    <ion-icon name="call-outline"></ion-icon> +234 803 438 2235
                  </a>
                  <a href="mailto:realdotsproperties@gmail.com" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--dark-jungle-green)', fontWeight: '600' }}>
                    <ion-icon name="mail-outline"></ion-icon> realdotsproperties@gmail.com
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
