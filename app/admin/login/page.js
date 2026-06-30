'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f5f7' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Logo width={180} />
        </div>
        <h1 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center', color: '#333' }}>Admin Login</h1>
        {error && <p style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
          />
          <button type="submit" style={{ padding: '12px', background: 'var(--orange-soda, #ff5a3c)', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
