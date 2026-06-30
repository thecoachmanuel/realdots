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
                over 1 million+ homes for sale available on the website, we can match you with a house you will want to call home.
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
                over 1 million+ homes for sale available on the website, we can match you with a house you will want to call home.
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
                <img src="/images/service-3.png" alt="Service icon" />
              </div>
              <h3 className="h3 card-title"><Link href="/#property">Sell a home</Link></h3>
              <p className="card-text">
                over 1 million+ homes for sale available on the website, we can match you with a house you will want to call home.
              </p>
              <Link href="/#property" className="card-link">
                <span>Find A Home</span>
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
