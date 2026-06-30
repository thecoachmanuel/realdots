'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWishlist } from '@/components/WishlistProvider';
import Logo from '@/components/Logo';

export default function Header() {
  const router = useRouter();
  const [isNavActive, setIsNavActive] = useState(false);
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { wishlist, isLoaded } = useWishlist();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsHeaderActive(window.scrollY >= 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check user session on mount
  useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data?.user) setUser(data.user); })
      .catch(() => {});
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleNav = () => setIsNavActive(!isNavActive);
  const closeNav = () => setIsNavActive(false);

  const handleLogout = async () => {
    await fetch('/api/user/logout', { method: 'POST' });
    setUser(null);
    setDropdownOpen(false);
    router.push('/');
    router.refresh();
  };

  return (
    <header className={`header ${isHeaderActive ? 'active' : ''}`} data-header>
      <div className={`overlay ${isNavActive ? 'active' : ''}`} data-overlay onClick={closeNav}></div>

      <div className="header-top">
        <div className="container">
          <ul className="header-top-list">
            <li>
              <a href="mailto:realdotsproperties@gmail.com" className="header-top-link">
                <ion-icon name="mail-outline"></ion-icon>
                <span>realdotsproperties@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="#" className="header-top-link">
                <ion-icon name="location-outline"></ion-icon>
                <address>Km 24, Richland Mall, Sangotedo, Ajah, Lagos</address>
              </a>
            </li>
          </ul>

          <div className="wrapper">
            <ul className="header-top-social-list">
              <li><a href="#" className="header-top-social-link"><ion-icon name="logo-facebook"></ion-icon></a></li>
              <li><a href="#" className="header-top-social-link"><ion-icon name="logo-twitter"></ion-icon></a></li>
              <li><a href="#" className="header-top-social-link"><ion-icon name="logo-instagram"></ion-icon></a></li>
              <li><a href="#" className="header-top-social-link"><ion-icon name="logo-pinterest"></ion-icon></a></li>
            </ul>
            <Link href="/admin/properties/new" className="header-top-btn">Add Listing</Link>
          </div>
        </div>
      </div>

      <div className="header-bottom">
        <div className="container">
          <Link href="/" className="logo">
            <Logo width={180} />
          </Link>

          <nav className={`navbar ${isNavActive ? 'active' : ''}`} data-navbar>
            <div className="navbar-top">
              <Link href="/" className="logo">
                <Logo width={160} />
              </Link>
              <button className="nav-close-btn" data-nav-close-btn aria-label="Close Menu" onClick={closeNav}>
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>
            <div className="navbar-bottom">
              <ul className="navbar-list">
                <li><Link href="/" className="navbar-link" onClick={closeNav}>Home</Link></li>
                <li><Link href="/#about" className="navbar-link" onClick={closeNav}>About</Link></li>
                <li><Link href="/#service" className="navbar-link" onClick={closeNav}>Service</Link></li>
                <li><Link href="/properties" className="navbar-link" onClick={closeNav}>Property</Link></li>
                <li><Link href="/#blog" className="navbar-link" onClick={closeNav}>Blog</Link></li>
                <li><Link href="/contact" className="navbar-link" onClick={closeNav}>Contact</Link></li>
                {/* Mobile-only auth links */}
                {user ? (
                  <>
                    <li><Link href="/profile" className="navbar-link" onClick={closeNav}>My Profile</Link></li>
                    <li><button onClick={handleLogout} className="navbar-link" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e74c3c', padding: '15px 0', textAlign: 'left', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', textTransform: 'inherit' }}>Sign Out</button></li>
                  </>
                ) : (
                  <>
                    <li><Link href="/login" className="navbar-link" onClick={closeNav}>Sign In</Link></li>
                    <li><Link href="/signup" className="navbar-link" onClick={closeNav} style={{ color: 'var(--orange-soda)' }}>Sign Up</Link></li>
                  </>
                )}
              </ul>
            </div>
          </nav>

          <div className="header-bottom-actions">
            <Link href="/properties" className="header-bottom-actions-btn" aria-label="Search">
              <ion-icon name="search-outline"></ion-icon>
              <span>Search</span>
            </Link>

            {/* Profile / Auth button */}
            {user ? (
              <div ref={dropdownRef} style={{ position: 'relative' }}>
                <button
                  className="header-bottom-actions-btn"
                  aria-label="Profile"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <ion-icon name="person-circle-outline"></ion-icon>
                  )}
                  <span style={{ maxWidth: '60px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name?.split(' ')[0]}</span>
                </button>
                {dropdownOpen && (
                  <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', background: 'white', borderRadius: '10px', boxShadow: '0 8px 30px rgba(0,0,0,0.15)', padding: '8px', minWidth: '150px', zIndex: 1200, marginBottom: '10px' }}>
                    <Link href="/profile" onClick={() => setDropdownOpen(false)} style={{ display: 'block', padding: '10px 16px', color: 'var(--dark-jungle-green)', textDecoration: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '14px' }}>
                      👤 My Profile
                    </Link>
                    <button onClick={handleLogout} style={{ display: 'block', width: '100%', padding: '10px 16px', color: '#e74c3c', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '6px', fontWeight: '600', fontSize: '14px', textAlign: 'left' }}>
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="header-bottom-actions-btn" aria-label="Sign In">
                <ion-icon name="person-outline"></ion-icon>
                <span>Sign In</span>
              </Link>
            )}

            <Link href="/wishlist" className="header-bottom-actions-btn" aria-label="Wishlist" style={{ position: 'relative' }}>
              <ion-icon name="heart-outline"></ion-icon>
              <span>Wishlist</span>
              {isLoaded && wishlist.length > 0 && (
                <span style={{ position: 'absolute', top: '5px', right: '5px', background: 'var(--orange-soda)', color: 'white', fontSize: '10px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button className="header-bottom-actions-btn" data-nav-open-btn aria-label="Open Menu" onClick={toggleNav}>
              <ion-icon name="menu-outline"></ion-icon>
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
