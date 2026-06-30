'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PropertyForm({ initialData = {}, isEdit = false }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    price: initialData.price || '',
    pricePeriod: initialData.pricePeriod !== undefined ? initialData.pricePeriod : 'Year',
    location: initialData.location || '',
    image: initialData.image || '',
    images: initialData.images ? initialData.images.join(', ') : '',
    badge: initialData.badge || 'For Rent',
    bedrooms: initialData.bedrooms || '',
    bathrooms: initialData.bathrooms || '',
    squareFt: initialData.squareFt || '',
    amenities: initialData.amenities || [],
    author: {
      name: initialData.author?.name || 'Onyinye',
      title: initialData.author?.title || 'Estate Agent',
      avatar: initialData.author?.avatar || '/images/author.jpg'
    }
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('author.')) {
      const authorField = name.split('.')[1];
      setFormData(prev => ({ ...prev, author: { ...prev.author, [authorField]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => {
      const exists = prev.amenities.includes(amenity);
      if (exists) {
        return { ...prev, amenities: prev.amenities.filter(a => a !== amenity) };
      } else {
        return { ...prev, amenities: [...prev.amenities, amenity] };
      }
    });
  };

  const handleFileUpload = async (e, field) => {
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
        if (field === 'image') {
          setFormData(prev => ({ ...prev, image: result.url }));
        } else if (field === 'images') {
          const currentImages = formData.images ? formData.images.split(',').map(s => s.trim()).filter(Boolean) : [];
          currentImages.push(result.url);
          setFormData(prev => ({ ...prev, images: currentImages.join(', ') }));
        }
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

    const url = isEdit ? `/api/properties/${initialData._id}` : '/api/properties';
    const method = isEdit ? 'PUT' : 'POST';

    const payload = { 
      ...formData, 
      images: formData.images.split(',').map(url => url.trim()).filter(url => url)
    };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      router.push('/admin/properties');
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
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="premium-input" placeholder="e.g. Luxury Duplex in Banana Island" />
        </div>
        <div className="form-group">
          <label className="form-label">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required className="premium-input" placeholder="e.g. Ikoyi, Lagos" />
        </div>
        <div className="form-group">
          <label className="form-label">Price (₦)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required className="premium-input" placeholder="e.g. 5000000" />
        </div>
        <div className="form-group">
          <label className="form-label">Price Period</label>
          <select name="pricePeriod" value={formData.pricePeriod} onChange={handleChange} className="premium-input">
            <option value="">None (For Sale)</option>
            <option value="Month">Month</option>
            <option value="Year">Year</option>
            <option value="One-time">One-time</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Primary Image URL</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input type="text" name="image" value={formData.image} onChange={handleChange} required className="premium-input" placeholder="https://..." />
            <label className="premium-btn btn-outline" style={{ whiteSpace: 'nowrap', margin: 0 }}>
              <ion-icon name={uploadingImage ? "sync-outline" : "cloud-upload-outline"}></ion-icon> {uploadingImage ? '...' : 'Upload'}
              <input type="file" style={{ display: 'none' }} accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} disabled={uploadingImage} />
            </label>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Extra Images (Comma separated URLs)</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input type="text" name="images" value={formData.images} onChange={handleChange} className="premium-input" placeholder="url1, url2..." />
            <label className="premium-btn btn-outline" style={{ whiteSpace: 'nowrap', margin: 0 }}>
              <ion-icon name={uploadingImage ? "sync-outline" : "cloud-upload-outline"}></ion-icon> {uploadingImage ? '...' : 'Upload'}
              <input type="file" style={{ display: 'none' }} accept="image/*" onChange={(e) => handleFileUpload(e, 'images')} disabled={uploadingImage} />
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Status Badge</label>
          <select name="badge" value={formData.badge} onChange={handleChange} className="premium-input">
            <option value="For Rent">For Rent</option>
            <option value="For Sales">For Sales</option>
          </select>
        </div>
        <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          <div>
            <label className="form-label">Beds</label>
            <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required className="premium-input" />
          </div>
          <div>
            <label className="form-label">Baths</label>
            <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required className="premium-input" />
          </div>
          <div>
            <label className="form-label">Sq Ft</label>
            <input type="number" name="squareFt" value={formData.squareFt} onChange={handleChange} required className="premium-input" />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="premium-input" style={{ resize: 'vertical' }} placeholder="Describe the property..." />
      </div>

      <div className="form-group">
        <label className="form-label" style={{ marginBottom: '16px' }}>Amenities</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {['Parking Space', 'Swimming Pool', 'Private Security', 'Medical Center', 'Library Area', 'King Size Beds', 'Smart Homes', "Kid’s Playland"].map(amenity => (
            <label key={amenity} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: 'var(--admin-text-main)' }}>
              <input 
                type="checkbox" 
                checked={formData.amenities.includes(amenity)} 
                onChange={() => handleAmenityChange(amenity)} 
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
        <button type="submit" disabled={loading} className="premium-btn btn-primary" style={{ minWidth: '150px' }}>
          {loading ? (
            <><ion-icon name="sync-outline" className="spin"></ion-icon> Saving...</>
          ) : (
            <><ion-icon name="save-outline"></ion-icon> {isEdit ? 'Update Property' : 'Add Property'}</>
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
