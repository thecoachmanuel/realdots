'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useWishlist } from '@/components/WishlistProvider';
import Logo from '@/components/Logo';

export default function Header() {
  const [isNavActive, setIsNavActive] = useState(false);
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const { wishlist, isLoaded } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderActive(window.scrollY >= 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNav = () => setIsNavActive(!isNavActive);
  const closeNav = () => setIsNavActive(false);

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
                <address>Lekki, Lagos</address>
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
              </ul>
            </div>
          </nav>

          <div className="header-bottom-actions">
            <Link href="/properties" className="header-bottom-actions-btn" aria-label="Search">
              <ion-icon name="search-outline"></ion-icon>
              <span>Search</span>
            </Link>
            <button className="header-bottom-actions-btn" aria-label="Profile">
              <ion-icon name="person-outline"></ion-icon>
              <span>Profile</span>
            </button>
            <Link href="/wishlist" className="header-bottom-actions-btn" aria-label="Wishlist" style={{ position: 'relative' }}>
              <ion-icon name="heart-outline"></ion-icon>
              <span>Wishlist</span>
              {isLoaded && wishlist.length > 0 && (
                <span style={{ position: 'absolute', top: '5px', right: '5px', background: 'var(--orange-soda)', color: 'white', fontSize: '10px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', display: 'block' }}>
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
