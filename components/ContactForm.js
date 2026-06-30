'use client';
import { useState } from 'react';

export default function ContactForm({ propertyId, propertyTitle }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, propertyId, propertyTitle })
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to send message');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  const inputStyle = { padding: '15px', borderRadius: '8px', border: '1px solid var(--alice-blue)', width: '100%', fontSize: '1rem', background: 'var(--white)' };

  if (success) {
    return (
      <div style={{ background: '#d4edda', color: '#155724', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
        <h4 style={{ marginBottom: '10px' }}>Message Sent!</h4>
        <p>Thank you for your interest. We will get back to you shortly.</p>
        <button onClick={() => setSuccess(false)} style={{ marginTop: '15px', background: 'transparent', border: 'none', color: '#155724', textDecoration: 'underline', cursor: 'pointer' }}>Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required style={inputStyle} />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required style={inputStyle} />
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone Number" style={inputStyle} />
      <textarea name="message" value={formData.message} onChange={handleChange} placeholder={`Hi, I'm interested in ${propertyTitle}...`} required rows="4" style={{...inputStyle, resize: 'vertical'}}></textarea>
      <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
