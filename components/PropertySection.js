import PropertyCard from './PropertyCard';

export default function PropertySection({ properties = [] }) {
  return (
    <section className="property" id="property">
      <div className="container">
        <p className="section-subtitle">Properties</p>
        <h2 className="h2 section-title">Featured Listings</h2>

        {properties.length > 0 ? (
          <ul className="property-list has-scrollbar">
            {properties.map((property, idx) => (
              <li key={property._id || idx}>
                <PropertyCard property={property} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No properties found. Please add some.</p>
        )}
      </div>
    </section>
  );
}
