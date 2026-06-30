'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isNavActive, setIsNavActive] = useState(false);
  const [isHeaderActive, setIsHeaderActive] = useState(false);

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
            <button className="header-top-btn">Add Listing</button>
          </div>
        </div>
      </div>

      <div className="header-bottom">
        <div className="container">
          <Link href="/" className="logo">
            <img src="/images/logo.png" alt="Homeverse logo" />
          </Link>

          <nav className={`navbar ${isNavActive ? 'active' : ''}`} data-navbar>
            <div className="navbar-top">
              <Link href="/" className="logo">
                <img src="/images/logo.png" alt="Homeverse logo" />
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
                <li><Link href="/#property" className="navbar-link" onClick={closeNav}>Property</Link></li>
                <li><Link href="/#blog" className="navbar-link" onClick={closeNav}>Blog</Link></li>
                <li><Link href="/#contact" className="navbar-link" onClick={closeNav}>Contact</Link></li>
              </ul>
            </div>
          </nav>

          <div className="header-bottom-actions">
            <button className="header-bottom-actions-btn" aria-label="Search">
              <ion-icon name="search-outline"></ion-icon>
              <span>Search</span>
            </button>
            <button className="header-bottom-actions-btn" aria-label="Profile">
              <ion-icon name="person-outline"></ion-icon>
              <span>Profile</span>
            </button>
            <button className="header-bottom-actions-btn" aria-label="Cart">
              <ion-icon name="cart-outline"></ion-icon>
              <span>Cart</span>
            </button>
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
