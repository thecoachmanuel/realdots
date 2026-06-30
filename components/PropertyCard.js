import Link from 'next/link';

export default function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <figure className="card-banner">
        <Link href={`/property/${property._id}`}>
          <img src={property.image} alt={property.title} className="w-100" />
        </Link>
        <div className={`card-badge ${property.badge === 'For Rent' ? 'green' : 'orange'}`}>
          {property.badge}
        </div>
        <div className="banner-actions">
          <button className="banner-actions-btn">
            <ion-icon name="location"></ion-icon>
            <address>{property.location}</address>
          </button>
          <button className="banner-actions-btn">
            <ion-icon name="camera"></ion-icon>
            <span>4</span>
          </button>
          <button className="banner-actions-btn">
            <ion-icon name="film"></ion-icon>
            <span>2</span>
          </button>
        </div>
      </figure>

      <div className="card-content">
        <div className="card-price">
          <strong>${property.price.toLocaleString()}</strong>/{property.pricePeriod}
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
