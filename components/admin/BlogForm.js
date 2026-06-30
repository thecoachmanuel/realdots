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

  return (
    <form onSubmit={handleSubmit} className="premium-form">
      {error && <div style={{ background: '#fef2f2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #fca5a5' }}>{error}</div>}
      
      <div className="form-grid-2">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="premium-input" placeholder="Enter blog title" />
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required className="premium-input" placeholder="e.g. Interior, Market" />
        </div>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Cover Image</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input type="text" name="image" value={formData.image} onChange={handleChange} required className="premium-input" placeholder="https://example.com/image.jpg or upload" />
            <label className="premium-btn btn-outline" style={{ whiteSpace: 'nowrap', margin: 0 }}>
              <ion-icon name={uploadingImage ? "sync-outline" : "cloud-upload-outline"}></ion-icon> {uploadingImage ? 'Uploading...' : 'Upload'}
              <input type="file" style={{ display: 'none' }} accept="image/*" onChange={handleFileUpload} disabled={uploadingImage} />
            </label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Content</label>
        <textarea name="content" value={formData.content} onChange={handleChange} required rows="12" className="premium-input" style={{ resize: 'vertical' }} placeholder="Write your blog post content here..." />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
        <button type="submit" disabled={loading} className="premium-btn btn-primary" style={{ minWidth: '150px' }}>
          {loading ? (
            <><ion-icon name="sync-outline" className="spin"></ion-icon> Saving...</>
          ) : (
            <><ion-icon name="save-outline"></ion-icon> {isEdit ? 'Update Blog' : 'Publish Blog'}</>
          )}
        </button>
      </div>
      <style jsx>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}
