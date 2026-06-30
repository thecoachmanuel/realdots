'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PropertyListClient({ properties }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this property?')) {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to delete property');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--admin-text-main)', margin: '0 0 8px 0' }}>Manage Properties</h1>
          <p style={{ color: 'var(--admin-text-muted)', margin: 0 }}>View, edit, or delete your real estate listings.</p>
        </div>
        <Link href="/admin/properties/new" className="premium-btn btn-primary">
          <ion-icon name="add-circle-outline"></ion-icon> Add New
        </Link>
      </div>

      <div className="premium-table-container">
        <table className="premium-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property._id}>
                <td>
                  <div style={{ fontWeight: '600' }}>{property.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--admin-text-muted)', marginTop: '4px' }}>{property.bedrooms} Beds • {property.bathrooms} Baths</div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ion-icon name="location-outline" style={{ color: 'var(--admin-text-muted)' }}></ion-icon> {property.location}
                  </div>
                </td>
                <td><strong style={{ color: 'var(--admin-primary)' }}>₦{property.price.toLocaleString()}</strong> {property.pricePeriod ? <span style={{ fontSize: '12px', color: 'var(--admin-text-muted)' }}>/{property.pricePeriod}</span> : ''}</td>
                <td>
                  <span className={`admin-badge ${property.badge === 'For Rent' ? 'badge-green' : 'badge-blue'}`}>
                    {property.badge}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Link href={`/admin/properties/${property._id}`} className="action-icon-btn" title="Edit">
                    <ion-icon name="create-outline"></ion-icon>
                  </Link>
                  <button onClick={() => handleDelete(property._id)} className="action-icon-btn delete" title="Delete">
                    <ion-icon name="trash-outline"></ion-icon>
                  </button>
                </td>
              </tr>
            ))}
            {properties.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '48px', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                  <ion-icon name="home-outline" style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}></ion-icon>
                  <p>No properties found. Click "Add New" to create your first listing.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
