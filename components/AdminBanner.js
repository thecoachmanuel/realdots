'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminBanner() {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/verify', { cache: 'no-store' });
      const data = await res.json();
      setIsAdmin(!!data.isAuthenticated);
    } catch (err) {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    checkAuth();

    // Re-check auth when the window regains focus (e.g. if they logged out in another tab)
    window.addEventListener('focus', checkAuth);
    
    // Polling every 10 seconds just in case
    const interval = setInterval(checkAuth, 10000);

    return () => {
      window.removeEventListener('focus', checkAuth);
      clearInterval(interval);
    };
  }, []);

  if (!isAdmin) return null;

  return (
    <Link href="/admin" className="admin-fab" aria-label="Go to Admin Dashboard">
      <div className="fab-icon">
        <ion-icon name="options-outline"></ion-icon>
      </div>
      <span className="fab-text">Admin Dashboard</span>

      <style jsx>{`
        .admin-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(8px);
          color: white;
          border-radius: 999px;
          display: flex;
          align-items: center;
          padding: 8px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          width: 56px;
          height: 56px;
        }

        .fab-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ff5a3d;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .fab-text {
          white-space: nowrap;
          font-weight: 600;
          font-size: 14px;
          opacity: 0;
          max-width: 0;
          padding-left: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .admin-fab:hover {
          width: 200px;
          padding-right: 20px;
          background: rgba(15, 23, 42, 1);
        }

        .admin-fab:hover .fab-icon {
          transform: rotate(90deg);
        }

        .admin-fab:hover .fab-text {
          opacity: 1;
          max-width: 200px;
          padding-left: 12px;
        }

        @media (max-width: 768px) {
          .admin-fab {
            bottom: 20px;
            right: 20px;
          }
        }
      `}</style>
    </Link>
  );
}
