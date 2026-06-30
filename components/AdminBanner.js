'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminBanner() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/verify');
        const data = await res.json();
        if (data.isAuthenticated) {
          setIsAdmin(true);
        }
      } catch (err) {
        // ignore
      }
    };
    checkAuth();
  }, []);

  if (!isAdmin) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      zIndex: 9999,
      background: '#2c3e50',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '50px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '14px',
      fontWeight: '600',
    }}>
      <ion-icon name="settings" style={{ fontSize: '18px' }}></ion-icon>
      You are logged in as Admin
      <Link href="/admin" style={{
        background: '#3498db',
        color: 'white',
        textDecoration: 'none',
        padding: '6px 16px',
        borderRadius: '50px',
        marginLeft: '10px',
        transition: 'background 0.3s'
      }}>
        Dashboard &rarr;
      </Link>
    </div>
  );
}
