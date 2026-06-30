'use client';
import { useRouter } from 'next/navigation';

export default function MessageListClient({ messages }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this message?')) {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to delete message');
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', color: '#2c3e50' }}>Messages</h1>
      </div>

      <div className="admin-table-container" style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#ecf0f1', color: '#34495e' }}>
              <th style={{ padding: '15px' }}>Date</th>
              <th style={{ padding: '15px' }}>Contact</th>
              <th style={{ padding: '15px' }}>Property Inquired</th>
              <th style={{ padding: '15px' }}>Message</th>
              <th style={{ padding: '15px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(msg => (
              <tr key={msg._id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                <td style={{ padding: '15px', verticalAlign: 'top' }}>
                  {new Date(msg.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '15px', verticalAlign: 'top' }}>
                  <strong>{msg.name}</strong><br/>
                  <a href={`mailto:${msg.email}`} style={{ color: '#3498db', textDecoration: 'none' }}>{msg.email}</a><br/>
                  {msg.phone && <a href={`tel:${msg.phone}`} style={{ color: '#7f8c8d', textDecoration: 'none', fontSize: '0.9em' }}>{msg.phone}</a>}
                </td>
                <td style={{ padding: '15px', verticalAlign: 'top' }}>
                  <a href={`/property/${msg.propertyId}`} target="_blank" style={{ color: '#3498db', textDecoration: 'none' }}>
                    {msg.propertyTitle}
                  </a>
                </td>
                <td style={{ padding: '15px', verticalAlign: 'top', maxWidth: '300px' }}>
                  <p style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#555' }}>{msg.message}</p>
                </td>
                <td style={{ padding: '15px', textAlign: 'right', verticalAlign: 'top' }}>
                  <button onClick={() => handleDelete(msg._id)} style={{ padding: '6px 12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#7f8c8d' }}>No messages yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
