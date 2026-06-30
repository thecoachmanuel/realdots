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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--admin-text-main)', margin: '0 0 8px 0' }}>Messages</h1>
          <p style={{ color: 'var(--admin-text-muted)', margin: 0 }}>Review inquiries from potential clients and buyers.</p>
        </div>
      </div>

      <div className="premium-table-container">
        <table className="premium-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Contact</th>
              <th>Property Inquired</th>
              <th>Message</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(msg => (
              <tr key={msg._id}>
                <td style={{ verticalAlign: 'top' }}>
                  <div style={{ fontWeight: '600', color: 'var(--admin-text-main)' }}>{new Date(msg.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                  <div style={{ fontSize: '12px', color: 'var(--admin-text-muted)' }}>{new Date(msg.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</div>
                </td>
                <td style={{ verticalAlign: 'top' }}>
                  <strong style={{ display: 'block', color: 'var(--admin-text-main)' }}>{msg.name}</strong>
                  <a href={`mailto:${msg.email}`} style={{ color: 'var(--admin-primary)', textDecoration: 'none', display: 'block', fontSize: '13px', marginTop: '4px' }}>{msg.email}</a>
                  {msg.phone && <a href={`tel:${msg.phone}`} style={{ color: 'var(--admin-text-muted)', textDecoration: 'none', fontSize: '13px', marginTop: '2px', display: 'block' }}>{msg.phone}</a>}
                </td>
                <td style={{ verticalAlign: 'top' }}>
                  <a href={`/property/${msg.propertyId}`} target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--admin-text-main)', textDecoration: 'none', fontWeight: '500' }}>
                    <ion-icon name="home-outline"></ion-icon> {msg.propertyTitle}
                  </a>
                </td>
                <td style={{ verticalAlign: 'top', maxWidth: '300px' }}>
                  <p style={{ margin: 0, whiteSpace: 'pre-wrap', color: 'var(--admin-text-muted)', fontSize: '14px', lineHeight: '1.5' }}>{msg.message}</p>
                </td>
                <td style={{ textAlign: 'right', verticalAlign: 'top' }}>
                  <button onClick={() => handleDelete(msg._id)} className="action-icon-btn delete" title="Delete">
                    <ion-icon name="trash-outline"></ion-icon>
                  </button>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '48px', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                  <ion-icon name="mail-open-outline" style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}></ion-icon>
                  <p>No new messages at the moment.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
