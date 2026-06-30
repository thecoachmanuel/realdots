import Link from 'next/link';

export default function Service() {
  return (
    <section className="service" id="service">
      <div className="container">
        <p className="section-subtitle">Our Services</p>
        <h2 className="h2 section-title">Our Main Focus</h2>
        <ul className="service-list">
          <li>
            <div className="service-card">
              <div className="card-icon">
                <img src="/images/service-1.png" alt="Service icon" />
              </div>
              <h3 className="h3 card-title"><Link href="/#property">Buy a home</Link></h3>
              <p className="card-text">
                With a curated selection of prime properties across Lagos and beyond, we can help you find the perfect property to call your new home.
              </p>
              <Link href="/#property" className="card-link">
                <span>Find A Home</span>
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </Link>
            </div>
          </li>
          <li>
            <div className="service-card">
              <div className="card-icon">
                <img src="/images/service-2.png" alt="Service icon" />
              </div>
              <h3 className="h3 card-title"><Link href="/#property">Rent a home</Link></h3>
              <p className="card-text">
                Looking for short or long-term leases? Browse our extensive catalog of affordable and luxury rental apartments tailored to your budget.
              </p>
              <Link href="/#property" className="card-link">
                <span>Find A Rental</span>
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </Link>
            </div>
          </li>
          <li>
            <div className="service-card">
              <div className="card-icon">
                <img src="/images/service-3.png" alt="Service icon" />
              </div>
              <h3 className="h3 card-title"><Link href="/contact">Sell a home</Link></h3>
              <p className="card-text">
                Partner with our expert agents to list your property. We guarantee wide visibility, professional marketing, and the best market value.
              </p>
              <Link href="/contact" className="card-link">
                <span>List With Us</span>
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
