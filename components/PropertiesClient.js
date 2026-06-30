'use client';
import { useState, useMemo } from 'react';
import PropertyCard from '@/components/PropertyCard';

export default function PropertiesClient({ initialProperties }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAmenity, setSelectedAmenity] = useState('');

  const allAmenities = useMemo(() => {
    const amenities = new Set();
    initialProperties.forEach(p => {
      if (p.amenities) {
        p.amenities.forEach(a => amenities.add(a));
      }
    });
    return Array.from(amenities).sort();
  }, [initialProperties]);

  const filteredProperties = useMemo(() => {
    return initialProperties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            property.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAmenity = selectedAmenity ? property.amenities?.includes(selectedAmenity) : true;
      return matchesSearch && matchesAmenity;
    });
  }, [initialProperties, searchTerm, selectedAmenity]);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '40px', background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ flex: '1', minWidth: '250px' }}>
          <input 
            type="text" 
            placeholder="Search by title or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px 20px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none' }}
          />
        </div>
        <div style={{ flex: '1', minWidth: '250px' }}>
          <select 
            value={selectedAmenity}
            onChange={(e) => setSelectedAmenity(e.target.value)}
            style={{ width: '100%', padding: '12px 20px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', background: 'white' }}
          >
            <option value="">All Amenities</option>
            {allAmenities.map(amenity => (
              <option key={amenity} value={amenity}>{amenity}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
        {filteredProperties.map(property => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '12px', color: 'var(--cadet)' }}>
          <h3>No properties found.</h3>
          <p>Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}
