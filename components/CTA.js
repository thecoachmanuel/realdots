import Link from 'next/link';

export default function CTA() {
  return (
    <section className="cta animate-on-scroll">
      <div className="container">
        <div className="cta-card">
          <div className="card-content">
            <h2 className="h2 card-title">Looking for a dream home?</h2>
            <p className="card-text">We can help you realize your dream of a new home</p>
          </div>
          <Link href="/#property" className="btn cta-btn" style={{ textDecoration: 'none' }}>
            <span>Explore Properties</span>
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </Link>
        </div>
      </div>
    </section>
  );
}
