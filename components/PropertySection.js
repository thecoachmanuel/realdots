import PropertyCard from './PropertyCard';
import Link from 'next/link';

export default function PropertySection({ properties = [], activeFilter = null }) {
  return (
    <section className="property animate-on-scroll" id="property">
      <div className="container">
        <p className="section-subtitle">Properties</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 className="h2 section-title" style={{ margin: 0 }}>
            {activeFilter ? `Listings with: ${activeFilter}` : 'Featured Listings'}
          </h2>
          {activeFilter && (
            <Link href="/#property" className="btn" style={{ padding: '10px 20px', fontSize: '14px' }} scroll={true}>
              Clear Filter
            </Link>
          )}
        </div>

        {properties.length > 0 ? (
          <ul className="property-list has-scrollbar">
            {properties.map((property, idx) => (
              <li key={property._id || idx}>
                <PropertyCard property={property} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No properties found matching your criteria. Try clearing the filter.</p>
        )}
      </div>
    </section>
  );
}
