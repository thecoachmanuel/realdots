'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

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
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f5f7', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: '#2c3e50', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid #34495e' }}>
          RealDots Admin
        </div>
        <nav style={{ flex: 1, padding: '20px 0' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <Link href="/admin" style={{ display: 'block', padding: '15px 20px', color: 'white', textDecoration: 'none', background: pathname === '/admin' ? '#34495e' : 'transparent' }}>
                Dashboard
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

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
