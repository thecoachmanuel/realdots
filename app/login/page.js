'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Login failed'); setLoading(false); return; }
      router.push('/profile');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', background: 'var(--cultured-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 15px 60px' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '50px 40px', width: '100%', maxWidth: '480px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '35px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--dark-jungle-green)', marginBottom: '8px', fontFamily: 'var(--ff-poppins)' }}>Welcome Back</h1>
            <p style={{ color: 'var(--cadet)', fontSize: '15px' }}>Sign in to your RealDots account</p>
          </div>

          {error && (
            <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#dc2626', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', color: 'var(--dark-jungle-green)', marginBottom: '6px', fontSize: '14px' }}>Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com"
                style={{ width: '100%', padding: '13px 16px', borderRadius: '8px', border: '1.5px solid #e0e0e0', outline: 'none', fontSize: '15px', fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', color: 'var(--dark-jungle-green)', marginBottom: '6px', fontSize: '14px' }}>Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="Your password"
                style={{ width: '100%', padding: '13px 16px', borderRadius: '8px', border: '1.5px solid #e0e0e0', outline: 'none', fontSize: '15px', fontFamily: 'inherit' }} />
            </div>
            <button type="submit" disabled={loading}
              style={{ padding: '14px', background: 'var(--orange-soda)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '5px', fontFamily: 'var(--ff-poppins)', transition: 'opacity 0.2s' }}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--cadet)', fontSize: '14px' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" style={{ color: 'var(--orange-soda)', fontWeight: '600', textDecoration: 'none' }}>Sign Up</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
