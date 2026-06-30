'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useWishlist } from '@/components/WishlistProvider';

export default function PropertyCard({ property }) {
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  const isSaved = isInWishlist(property._id);

  // Combine primary image and extra images
  const allImages = [property.image, ...(property.images || [])].filter(Boolean);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (allImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }, 3000 + Math.random() * 2000); // randomize slightly so all cards don't flip at exact same time
    return () => clearInterval(interval);
  }, [allImages.length]);

  return (
    <div className="property-card">
      <figure className="card-banner" style={{ position: 'relative', overflow: 'hidden', height: '250px' }}>
        <Link href={`/property/${property._id}`}>
          {allImages.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt={property.title} 
              className="w-100" 
              style={{ 
                height: '250px', 
                objectFit: 'cover', 
                position: 'absolute', 
                top: 0, left: 0, 
                opacity: currentImageIndex === idx ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out',
                zIndex: currentImageIndex === idx ? 1 : 0
              }} 
            />
          ))}
        </Link>
        <div className={`card-badge ${property.badge === 'For Rent' ? 'green' : 'orange'}`}>
          {property.badge}
        </div>
        <div className="banner-actions">
          <button className="banner-actions-btn" aria-label="Location">
            <ion-icon name="location"></ion-icon>
            <address>{property.location}</address>
          </button>
          <button className="banner-actions-btn" aria-label="Camera">
            <ion-icon name="camera"></ion-icon>
            <span>{allImages.length}</span>
          </button>
          <button className="banner-actions-btn" aria-label="Film">
            <ion-icon name="film"></ion-icon>
            <span>2</span>
          </button>
        </div>
        <button 
          onClick={() => toggleWishlist(property)} 
          style={{ position: 'absolute', top: '15px', right: '15px', background: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: '10', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}
        >
          <ion-icon name={isSaved ? "heart" : "heart-outline"} style={{ fontSize: '24px', color: isSaved ? 'red' : '#333' }}></ion-icon>
        </button>
      </figure>

      <div className="card-content">
        <div className="card-price">
          <strong>₦{property.price.toLocaleString()}</strong>/{property.pricePeriod}
        </div>
        <h3 className="h3 card-title">
          <Link href={`/property/${property._id}`}>{property.title}</Link>
        </h3>
        <p className="card-text">{property.description}</p>
        <ul className="card-list">
          <li className="card-item">
            <strong>{property.bedrooms}</strong>
            <ion-icon name="bed-outline"></ion-icon>
            <span>Bedrooms</span>
          </li>
          <li className="card-item">
            <strong>{property.bathrooms}</strong>
            <ion-icon name="man-outline"></ion-icon>
            <span>Bathrooms</span>
          </li>
          <li className="card-item">
            <strong>{property.squareFt}</strong>
            <ion-icon name="square-outline"></ion-icon>
            <span>Square Ft</span>
          </li>
        </ul>
      </div>

      <div className="card-footer">
        <div className="card-author">
          <figure className="author-avatar">
            <img src={property.author?.avatar || "/images/author.jpg"} alt={property.author?.name || "Author"} className="w-100" />
          </figure>
          <div>
            <p className="author-name">
              <Link href={`/property/${property._id}`}>{property.author?.name || "Onyinye"}</Link>
            </p>
            <p className="author-title">{property.author?.title || "Estate Agent"}</p>
          </div>
        </div>
        <div className="card-footer-actions">
          <button className="card-footer-actions-btn"><ion-icon name="resize-outline"></ion-icon></button>
          <button className="card-footer-actions-btn"><ion-icon name="heart-outline"></ion-icon></button>
          <button className="card-footer-actions-btn"><ion-icon name="add-circle-outline"></ion-icon></button>
        </div>
      </div>
    </div>
  );
}
