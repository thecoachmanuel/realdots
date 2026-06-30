import Link from 'next/link';

export default function Features() {
  const amenities = [
    { name: "Parking Space", icon: "car-sport-outline" },
    { name: "Swimming Pool", icon: "water-outline" },
    { name: "Private Security", icon: "shield-checkmark-outline" },
    { name: "Medical Center", icon: "fitness-outline" },
    { name: "Library Area", icon: "library-outline" },
    { name: "King Size Beds", icon: "bed-outline" },
    { name: "Smart Homes", icon: "home-outline" },
    { name: "Kid’s Playland", icon: "football-outline" }
  ];

  return (
    <section className="features">
      <div className="container">
        <p className="section-subtitle">Our Aminities</p>
        <h2 className="h2 section-title">Building Aminities</h2>
        <ul className="features-list">
          {amenities.map(amenity => (
            <li key={amenity.name}>
              <Link href={`/?amenity=${encodeURIComponent(amenity.name)}#property`} className="features-card" scroll={true}>
                <div className="card-icon">
                  <ion-icon name={amenity.icon}></ion-icon>
                </div>
                <h3 className="card-title">{amenity.name}</h3>
                <div className="card-btn">
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
