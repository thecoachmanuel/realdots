'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', phone: '', avatar: '' });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    fetch('/api/user/profile')
      .then(res => {
        if (res.status === 401) { router.push('/login'); return null; }
        return res.json();
      })
      .then(data => {
        if (data?.user) {
          setUser(data.user);
          setForm({ name: data.user.name || '', email: data.user.email || '', phone: data.user.phone || '', avatar: data.user.avatar || '' });
        }
        setLoading(false);
      })
      .catch(() => { router.push('/login'); });
  }, [router]);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingAvatar(true);
    const data = new FormData();
    data.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: data });
      const result = await res.json();
      if (result.success) setForm(prev => ({ ...prev, avatar: result.url }));
      else alert('Upload failed');
    } catch { alert('Upload failed'); }
    finally { setUploadingAvatar(false); }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true); setError(''); setSuccess('');
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, avatar: form.avatar }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Update failed'); }
      else { setUser(data.user); setSuccess('Profile updated successfully!'); }
    } catch { setError('Something went wrong.'); }
    finally { setSaving(false); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) { setError('New passwords do not match'); return; }
    setSaving(true); setError(''); setSuccess('');
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Password change failed'); }
      else { setSuccess('Password changed successfully!'); setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' }); }
    } catch { setError('Something went wrong.'); }
    finally { setSaving(false); }
  };

  const handleLogout = async () => {
    await fetch('/api/user/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  const inputStyle = { width: '100%', padding: '13px 16px', borderRadius: '8px', border: '1.5px solid #e0e0e0', outline: 'none', fontSize: '15px', fontFamily: 'inherit' };
  const labelStyle = { display: 'block', fontWeight: '600', color: 'var(--dark-jungle-green)', marginBottom: '6px', fontSize: '14px' };

  if (loading) return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cultured-2)' }}>
        <div style={{ color: 'var(--cadet)', fontSize: '18px' }}>Loading your profile...</div>
      </main>
      <Footer />
    </>
  );

  return (
    <>
      <Header />
      <main style={{ background: 'var(--cultured-2)', padding: '120px 0 60px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--dark-jungle-green)', fontFamily: 'var(--ff-poppins)' }}>My Profile</h1>
            <button onClick={handleLogout} style={{ padding: '10px 24px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
              Sign Out
            </button>
          </div>

          {error && <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#dc2626', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>{error}</div>}
          {success && <div style={{ background: '#d1fae5', border: '1px solid #6ee7b7', color: '#065f46', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>{success}</div>}

          {/* Avatar & Info */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '30px', marginBottom: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '25px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', background: 'var(--cultured-2)', border: '3px solid var(--orange-soda)' }}>
                {form.avatar ? (
                  <img src={form.avatar} alt={user?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', color: 'var(--cadet)', background: '#f0f0f0' }}>
                    {user?.name?.[0]?.toUpperCase() || '👤'}
                  </div>
                )}
              </div>
              <label style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--orange-soda)', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', fontSize: '14px' }}>
                ✏️
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarUpload} />
              </label>
            </div>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--dark-jungle-green)', marginBottom: '4px', fontFamily: 'var(--ff-poppins)' }}>{user?.name}</h2>
              <p style={{ color: 'var(--cadet)', fontSize: '15px' }}>{user?.email}</p>
              {uploadingAvatar && <p style={{ color: 'var(--orange-soda)', fontSize: '13px', marginTop: '5px' }}>Uploading photo...</p>}
            </div>
          </div>

          {/* Profile Form */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '30px', marginBottom: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--dark-jungle-green)', marginBottom: '25px', fontFamily: 'var(--ff-poppins)' }}>Personal Information</h2>
            <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input type="text" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address (Non-editable)</label>
                  <input type="email" value={form.email} disabled style={{ ...inputStyle, background: '#f5f5f5', cursor: 'not-allowed', color: '#888' }} />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input type="tel" value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} style={inputStyle} placeholder="+234 800 000 0000" />
                </div>
                <div>
                  <label style={labelStyle}>Avatar URL</label>
                  <input type="text" value={form.avatar} onChange={e => setForm(p => ({...p, avatar: e.target.value}))} style={inputStyle} placeholder="https://..." />
                </div>
              </div>
              <button type="submit" disabled={saving} style={{ alignSelf: 'flex-start', padding: '12px 30px', background: 'var(--orange-soda)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, fontFamily: 'var(--ff-poppins)', fontSize: '15px' }}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Password Change */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--dark-jungle-green)', marginBottom: '25px', fontFamily: 'var(--ff-poppins)' }}>Change Password</h2>
            <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
                <div>
                  <label style={labelStyle}>Current Password</label>
                  <input type="password" value={pwForm.currentPassword} onChange={e => setPwForm(p => ({...p, currentPassword: e.target.value}))} required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>New Password</label>
                  <input type="password" value={pwForm.newPassword} onChange={e => setPwForm(p => ({...p, newPassword: e.target.value}))} required style={inputStyle} placeholder="Min. 6 characters" />
                </div>
                <div>
                  <label style={labelStyle}>Confirm New Password</label>
                  <input type="password" value={pwForm.confirmPassword} onChange={e => setPwForm(p => ({...p, confirmPassword: e.target.value}))} required style={inputStyle} />
                </div>
              </div>
              <button type="submit" disabled={saving} style={{ alignSelf: 'flex-start', padding: '12px 30px', background: 'var(--dark-jungle-green)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, fontFamily: 'var(--ff-poppins)', fontSize: '15px' }}>
                {saving ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
