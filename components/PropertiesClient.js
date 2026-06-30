'use client';
import { useState, useMemo } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';

export default function PropertiesClient({ initialProperties }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [badgeFilter, setBadgeFilter] = useState('All');
  const [amenityFilter, setAmenityFilter] = useState('');

  const allAmenities = useMemo(() => {
    const amenities = new Set();
    initialProperties.forEach(p => {
      if (p.amenities) p.amenities.forEach(a => amenities.add(a));
    });
    return Array.from(amenities).sort();
  }, [initialProperties]);

  const filteredProperties = useMemo(() => {
    return initialProperties.filter(property => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        property.title.toLowerCase().includes(search) ||
        property.location.toLowerCase().includes(search);
      const matchesBadge =
        badgeFilter === 'All' ||
        property.badge === badgeFilter;
      const matchesAmenity =
        !amenityFilter || property.amenities?.includes(amenityFilter);
      return matchesSearch && matchesBadge && matchesAmenity;
    });
  }, [initialProperties, searchTerm, badgeFilter, amenityFilter]);

  const tabBtnStyle = (tab) => ({
    padding: '10px 24px',
    borderRadius: '50px',
    border: '2px solid var(--orange-soda)',
    background: badgeFilter === tab ? 'var(--orange-soda)' : 'transparent',
    color: badgeFilter === tab ? 'white' : 'var(--orange-soda)',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
  });

  return (
    <div>
      {/* Search & Filter Bar */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '30px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}>
        {/* Search Input */}
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--cadet)', fontSize: '20px' }}>
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 20px 14px 45px',
              borderRadius: '10px',
              border: '1.5px solid #e0e0e0',
              outline: 'none',
              fontSize: '1rem',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s',
            }}
          />
        </div>

        {/* Badge Filter Tabs */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['All', 'For Rent', 'For Sales'].map(tab => (
            <button key={tab} onClick={() => setBadgeFilter(tab)} style={tabBtnStyle(tab)}>
              {tab}
            </button>
          ))}
        </div>

        {/* Amenity Filter */}
        {allAmenities.length > 0 && (
          <select
            value={amenityFilter}
            onChange={(e) => setAmenityFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 20px',
              borderRadius: '10px',
              border: '1.5px solid #e0e0e0',
              outline: 'none',
              background: 'white',
              fontSize: '0.95rem',
              fontFamily: 'inherit',
              color: amenityFilter ? 'var(--dark-jungle-green)' : 'var(--cadet)',
            }}
          >
            <option value="">Filter by Amenity (All)</option>
            {allAmenities.map(amenity => (
              <option key={amenity} value={amenity}>{amenity}</option>
            ))}
          </select>
        )}

        {/* Result Count + Clear */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <p style={{ color: 'var(--cadet)', fontSize: '0.9rem', margin: 0 }}>
            Showing <strong style={{ color: 'var(--dark-jungle-green)' }}>{filteredProperties.length}</strong> of <strong style={{ color: 'var(--dark-jungle-green)' }}>{initialProperties.length}</strong> properties
          </p>
          {(searchTerm || badgeFilter !== 'All' || amenityFilter) && (
            <button
              onClick={() => { setSearchTerm(''); setBadgeFilter('All'); setAmenityFilter(''); }}
              style={{ background: 'none', border: 'none', color: 'var(--orange-soda)', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem', padding: 0 }}
            >
              ✕ Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Property Grid */}
      {filteredProperties.length > 0 ? (
        <div className="properties-grid">
          {filteredProperties.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>🏠</div>
          <h3 style={{ color: 'var(--dark-jungle-green)', marginBottom: '10px', fontSize: '1.4rem' }}>No Properties Found</h3>
          <p style={{ color: 'var(--cadet)', marginBottom: '25px' }}>Try adjusting your search or filters to find what you're looking for.</p>
          <button
            onClick={() => { setSearchTerm(''); setBadgeFilter('All'); setAmenityFilter(''); }}
            style={{ padding: '12px 28px', background: 'var(--orange-soda)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
