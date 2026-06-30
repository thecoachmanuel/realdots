'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogForm({ initialData = {}, isEdit = false }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    category: initialData.category || '',
    image: initialData.image || '',
    content: initialData.content || '',
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setFormData(prev => ({ ...prev, image: result.url }));
      } else {
        alert(result.error || 'Upload failed');
      }
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const url = isEdit ? `/api/blogs/${initialData._id}` : '/api/blogs';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      router.push('/admin/blogs');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || 'Something went wrong');
      setLoading(false);
    }
  };

  const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' };
  const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' };
  const groupStyle = { marginBottom: '15px' };

  return (
    <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={groupStyle}>
          <label style={labelStyle}>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={groupStyle}>
          <label style={labelStyle}>Category (e.g. Interior, Market)</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={groupStyle}>
          <label style={labelStyle}>Image URL</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" name="image" value={formData.image} onChange={handleChange} required style={inputStyle} placeholder="/images/blog-1.png" />
            <label style={{ padding: '10px', background: '#ecf0f1', borderRadius: '4px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {uploadingImage ? 'Uploading...' : 'Upload'}
              <input type="file" style={{ display: 'none' }} accept="image/*" onChange={handleFileUpload} />
            </label>
          </div>
        </div>
      </div>

      <div style={groupStyle}>
        <label style={labelStyle}>Content</label>
        <textarea name="content" value={formData.content} onChange={handleChange} required rows="10" style={{...inputStyle, resize: 'vertical'}} />
      </div>

      <button type="submit" disabled={loading} style={{ padding: '12px 24px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '16px' }}>
        {loading ? 'Saving...' : isEdit ? 'Update Blog' : 'Add Blog'}
      </button>
    </form>
  );
}
