'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f4f5f7', fontFamily: 'sans-serif' }}>
      
      {/* Mobile Header */}
      <div className="admin-mobile-header">
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>RealDots Admin</div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}
        >
          <ion-icon name={isMobileMenuOpen ? "close-outline" : "menu-outline"}></ion-icon>
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* Sidebar */}
        <aside style={{ 
          width: '250px', 
          background: '#2c3e50', 
          color: 'white', 
          flexDirection: 'column',
          position: 'absolute',
          top: 0,
          left: isMobileMenuOpen ? 0 : '-250px',
          bottom: 0,
          zIndex: 50,
          transition: 'left 0.3s ease',
        }}
        className="admin-sidebar"
        >
          <div style={{ padding: '20px', fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid #34495e', display: 'none' }} className="admin-sidebar-header">
            RealDots Admin
          </div>
          <nav style={{ flex: 1, padding: '20px 0', overflowY: 'auto' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <Link href="/admin" style={{ display: 'block', padding: '15px 20px', color: 'white', textDecoration: 'none', background: pathname === '/admin' ? '#34495e' : 'transparent' }}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/properties" style={{ display: 'block', padding: '15px 20px', color: 'white', textDecoration: 'none', background: pathname === '/admin/properties' ? '#34495e' : 'transparent' }}>
                  Manage Properties
                </Link>
              </li>
              <li>
                <Link href="/admin/properties/new" style={{ display: 'block', padding: '15px 20px', color: 'white', textDecoration: 'none', background: pathname === '/admin/properties/new' ? '#34495e' : 'transparent' }}>
                  Add Property
                </Link>
              </li>
              <li>
                <Link href="/admin/messages" style={{ display: 'block', padding: '15px 20px', color: 'white', textDecoration: 'none', background: pathname === '/admin/messages' ? '#34495e' : 'transparent' }}>
                  Messages
                </Link>
              </li>
              <li>
                <Link href="/admin/blogs" style={{ display: 'block', padding: '15px 20px', color: 'white', textDecoration: 'none', background: pathname.startsWith('/admin/blogs') ? '#34495e' : 'transparent' }}>
                  Manage Blogs
                </Link>
              </li>
              <li>
                <Link href="/" style={{ display: 'block', padding: '15px 20px', color: '#bdc3c7', textDecoration: 'none' }}>
                  View Site
                </Link>
              </li>
            </ul>
          </nav>
          <div style={{ padding: '20px', borderTop: '1px solid #34495e' }}>
            <button onClick={handleLogout} style={{ width: '100%', padding: '10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }}
            className="admin-overlay"
          ></div>
        )}

        {/* Main Content */}
        <main style={{ flex: 1, padding: '20px', overflowX: 'hidden', overflowY: 'auto' }} className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}
