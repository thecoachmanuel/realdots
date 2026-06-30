'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import './admin.css';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return children;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="admin-layout-wrapper">
      
      {/* Mobile Header */}
      <div className="admin-mobile-header" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--admin-sidebar-bg)', color: 'white' }}>
        <div style={{ fontSize: '20px', fontWeight: '800' }}>RealDots<span style={{ color: 'var(--admin-primary)' }}>.</span> Admin</div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '28px', cursor: 'pointer', display: 'flex' }}
        >
          <ion-icon name={isMobileMenuOpen ? "close-outline" : "menu-outline"}></ion-icon>
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* Sidebar */}
        <aside className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="admin-sidebar-header">
            RealDots<span style={{ color: 'var(--admin-primary)' }}>.</span>
          </div>
          <nav style={{ flex: 1, overflowY: 'auto' }}>
            <ul className="admin-nav-list">
              <li>
                <Link href="/admin" className={`admin-nav-link ${pathname === '/admin' ? 'active' : ''}`}>
                  <ion-icon name="grid-outline"></ion-icon> Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/properties" className={`admin-nav-link ${pathname === '/admin/properties' ? 'active' : ''}`}>
                  <ion-icon name="home-outline"></ion-icon> Properties
                </Link>
              </li>
              <li>
                <Link href="/admin/messages" className={`admin-nav-link ${pathname === '/admin/messages' ? 'active' : ''}`}>
                  <ion-icon name="mail-unread-outline"></ion-icon> Messages
                </Link>
              </li>
              <li>
                <Link href="/admin/blogs" className={`admin-nav-link ${pathname.startsWith('/admin/blogs') ? 'active' : ''}`}>
                  <ion-icon name="document-text-outline"></ion-icon> Blogs
                </Link>
              </li>
              <li>
                <Link href="/" className="admin-nav-link" style={{ marginTop: '20px' }}>
                  <ion-icon name="earth-outline"></ion-icon> View Site
                </Link>
              </li>
            </ul>
          </nav>
          <div style={{ padding: '24px' }}>
            <button onClick={handleLogout} className="premium-btn btn-danger" style={{ width: '100%' }}>
              <ion-icon name="log-out-outline"></ion-icon> Logout
            </button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 40 }}
          ></div>
        )}

        {/* Main Content */}
        <main style={{ flex: 1, padding: '32px', overflowX: 'hidden', overflowY: 'auto' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {children}
          </div>
        </main>
      </div>
      
      {/* Hide mobile header on desktop */}
      <style jsx>{`
        @media (min-width: 992px) {
          .admin-mobile-header { display: none !important; }
        }
      `}</style>
    </div>
  );
}
