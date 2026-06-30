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
      router.push('/admin');
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
          <label style={labelStyle}>Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={groupStyle}>
          <label style={labelStyle}>Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={groupStyle}>
          <label style={labelStyle}>Price Period</label>
          <select name="pricePeriod" value={formData.pricePeriod} onChange={handleChange} style={inputStyle}>
            <option value="">None (Sales)</option>
            <option value="Month">Month</option>
            <option value="Year">Year</option>
            <option value="One-time">One-time</option>
          </select>
        </div>
        <div style={groupStyle}>
          <label style={labelStyle}>Primary Image URL</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" name="image" value={formData.image} onChange={handleChange} required style={inputStyle} />
            <label style={{ padding: '10px', background: '#ecf0f1', borderRadius: '4px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {uploadingImage ? 'Uploading...' : 'Upload'}
              <input type="file" style={{ display: 'none' }} accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} />
            </label>
          </div>
        </div>
        <div style={groupStyle}>
          <label style={labelStyle}>Extra Images (Comma separated URLs)</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" name="images" value={formData.images} onChange={handleChange} style={inputStyle} placeholder="/images/prop2.jpg, /images/prop3.jpg" />
            <label style={{ padding: '10px', background: '#ecf0f1', borderRadius: '4px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {uploadingImage ? 'Uploading...' : 'Upload'}
              <input type="file" style={{ display: 'none' }} accept="image/*" onChange={(e) => handleFileUpload(e, 'images')} />
            </label>
          </div>
        </div>
        <div style={groupStyle}>
          <label style={labelStyle}>Badge</label>
          <select name="badge" value={formData.badge} onChange={handleChange} style={inputStyle}>
            <option value="For Rent">For Rent</option>
            <option value="For Sales">For Sales</option>
          </select>
        </div>
        <div style={groupStyle}>
          <label style={labelStyle}>Bedrooms</label>
          <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={groupStyle}>
          <label style={labelStyle}>Bathrooms</label>
          <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={groupStyle}>
          <label style={labelStyle}>Square Ft</label>
          <input type="number" name="squareFt" value={formData.squareFt} onChange={handleChange} required style={inputStyle} />
        </div>
      </div>

      <div style={groupStyle}>
        <label style={labelStyle}>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" style={{...inputStyle, resize: 'vertical'}} />
      </div>

      <div style={groupStyle}>
        <label style={labelStyle}>Amenities</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {['Parking Space', 'Swimming Pool', 'Private Security', 'Medical Center', 'Library Area', 'King Size Beds', 'Smart Homes', "Kid’s Playland"].map(amenity => (
            <label key={amenity} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={formData.amenities.includes(amenity)} 
                onChange={() => handleAmenityChange(amenity)} 
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" disabled={loading} style={{ padding: '12px 24px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '16px' }}>
        {loading ? 'Saving...' : isEdit ? 'Update Property' : 'Add Property'}
      </button>
    </form>
  );
}
