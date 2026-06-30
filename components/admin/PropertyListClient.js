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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', color: '#2c3e50' }}>Manage Properties</h1>
        <Link href="/admin/properties/new" style={{ padding: '10px 20px', background: '#2ecc71', color: 'white', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
          + Add New
        </Link>
      </div>

      <div className="admin-table-container" style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#ecf0f1', color: '#34495e' }}>
              <th style={{ padding: '15px' }}>Title</th>
              <th style={{ padding: '15px' }}>Location</th>
              <th style={{ padding: '15px' }}>Price</th>
              <th style={{ padding: '15px' }}>Badge</th>
              <th style={{ padding: '15px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property._id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                <td style={{ padding: '15px' }}>{property.title}</td>
                <td style={{ padding: '15px' }}>{property.location}</td>
                <td style={{ padding: '15px' }}>₦{property.price.toLocaleString()} {property.pricePeriod ? `/${property.pricePeriod}` : ''}</td>
                <td style={{ padding: '15px' }}>{property.badge}</td>
                <td style={{ padding: '15px', textAlign: 'right' }}>
                  <Link href={`/admin/properties/${property._id}`} style={{ padding: '6px 12px', background: '#3498db', color: 'white', textDecoration: 'none', borderRadius: '4px', marginRight: '10px' }}>
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(property._id)} style={{ padding: '6px 12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {properties.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#7f8c8d' }}>No properties found. Add one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
