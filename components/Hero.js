export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <p className="hero-subtitle">
            <ion-icon name="home"></ion-icon>
            <span>Real Estate Agency</span>
          </p>
          <h2 className="h1 hero-title">Find Your Dream House By Us</h2>
          <p className="hero-text">
            Discover your ideal home with RealDots. We offer a curated selection of premium properties to perfectly match your lifestyle and needs in Lagos.
          </p>
          <button className="btn">Make An Enquiry</button>
        </div>
        <figure className="hero-banner">
          <img src="/images/hero-banner.png" alt="Modern house model" className="w-100" />
        </figure>
      </div>
    </section>
  );
}
