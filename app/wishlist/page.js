'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { useWishlist } from '@/components/WishlistProvider';

export default function WishlistPage() {
  const { wishlist, isLoaded } = useWishlist();

  return (
    <>
      <Header />
      <main style={{ padding: '120px 0 60px', background: 'var(--cultured-2)', minHeight: '80vh' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 className="h2 section-title">Your Wishlist</h1>
            <p className="section-text" style={{ color: 'var(--cadet)' }}>
              Keep track of your favorite properties in one place.
            </p>
          </div>
          
          {!isLoaded ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
          ) : wishlist.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
              {wishlist.map(property => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '12px', color: 'var(--cadet)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <ion-icon name="heart-outline" style={{ fontSize: '64px', color: '#ccc', marginBottom: '20px' }}></ion-icon>
              <h3>Your wishlist is empty</h3>
              <p>Start exploring our properties and tap the heart icon to save them here.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
