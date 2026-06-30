'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('realdots_wishlist');
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse wishlist");
      }
    }
    setIsLoaded(true);
  }, []);

  const toggleWishlist = (property) => {
    setWishlist(prev => {
      const exists = prev.find(p => p._id === property._id);
      let updated;
      if (exists) {
        updated = prev.filter(p => p._id !== property._id);
      } else {
        updated = [...prev, property];
      }
      localStorage.setItem('realdots_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const isInWishlist = (propertyId) => {
    return wishlist.some(p => p._id === propertyId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, isLoaded }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
