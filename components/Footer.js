import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand">
            <a href="#" className="logo">
              <Logo width={180} textColor="#ffffff" />
            </a>
            <p className="section-text">
              RealDots Properties provides exceptional real estate services, helping you find the perfect property in Nigeria. We are dedicated to delivering premium homes and excellent customer care.
            </p>
            <ul className="contact-list">
              <li>
                <a href="#" className="contact-link">
                  <ion-icon name="location-outline"></ion-icon>
                  <address>Km 24, Richland Mall, Sangotedo, Ajah, Lagos</address>
                </a>
              </li>
              <li>
                <a href="tel:+2348034382235" className="contact-link">
                  <ion-icon name="call-outline"></ion-icon>
                  <span>+234 803 438 2235</span>
                </a>
              </li>
              <li>
                <a href="mailto:realdotsproperties@gmail.com" className="contact-link">
                  <ion-icon name="mail-outline"></ion-icon>
                  <span>realdotsproperties@gmail.com</span>
                </a>
              </li>
            </ul>
            <ul className="social-list">
              <li><a href="#" className="social-link"><ion-icon name="logo-facebook"></ion-icon></a></li>
              <li><a href="#" className="social-link"><ion-icon name="logo-twitter"></ion-icon></a></li>
              <li><a href="#" className="social-link"><ion-icon name="logo-linkedin"></ion-icon></a></li>
              <li><a href="#" className="social-link"><ion-icon name="logo-youtube"></ion-icon></a></li>
            </ul>
          </div>

          <div className="footer-link-box">
            <ul className="footer-list">
              <li><p className="footer-list-title">Company</p></li>
              <li><a href="#" className="footer-link">About</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
              <li><a href="#" className="footer-link">All Products</a></li>
              <li><a href="#" className="footer-link">Locations Map</a></li>
              <li><a href="#" className="footer-link">FAQ</a></li>
              <li><a href="#" className="footer-link">Contact us</a></li>
            </ul>
            <ul className="footer-list">
              <li><p className="footer-list-title">Services</p></li>
              <li><a href="#" className="footer-link">Properties</a></li>
              <li><a href="#" className="footer-link">Wish List</a></li>
              <li><a href="#" className="footer-link">Login</a></li>
              <li><a href="#" className="footer-link">My account</a></li>
              <li><a href="#" className="footer-link">Terms & Conditions</a></li>
              <li><a href="#" className="footer-link">Promotional Offers</a></li>
            </ul>
            <ul className="footer-list">
              <li><p className="footer-list-title">Customer Care</p></li>
              <li><a href="#" className="footer-link">Login</a></li>
              <li><a href="#" className="footer-link">My account</a></li>
              <li><a href="#" className="footer-link">Wish List</a></li>
              <li><a href="#" className="footer-link">Properties</a></li>
              <li><a href="#" className="footer-link">FAQ</a></li>
              <li><a href="#" className="footer-link">Contact us</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            &copy; 2026 RealDots. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
