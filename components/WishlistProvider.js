'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 1. Check auth and load wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // Check if user is logged in
        const authRes = await fetch('/api/user/profile');
        if (authRes.ok) {
          setIsAuthenticated(true);
          // Fetch DB wishlist
          const wishRes = await fetch('/api/user/wishlist');
          if (wishRes.ok) {
            const data = await wishRes.json();
            setWishlist(data.wishlist || []);
          }
        } else {
          setIsAuthenticated(false);
          // Fallback to local storage
          const saved = localStorage.getItem('realdots_wishlist');
          if (saved) {
            setWishlist(JSON.parse(saved));
          }
        }
      } catch (e) {
        console.error("Failed to load wishlist", e);
      } finally {
        setIsLoaded(true);
      }
    };
    
    fetchWishlist();
  }, []);

  const toggleWishlist = async (property) => {
    // Optimistic UI update
    setWishlist(prev => {
      const exists = prev.find(p => p._id === property._id);
      let updated;
      if (exists) {
        updated = prev.filter(p => p._id !== property._id);
      } else {
        updated = [...prev, property];
      }
      
      // Always update local storage as a backup / local-only strategy
      localStorage.setItem('realdots_wishlist', JSON.stringify(updated));
      return updated;
    });

    // If authenticated, sync with DB
    if (isAuthenticated) {
      try {
        await fetch('/api/user/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ propertyId: property._id })
        });
      } catch (e) {
        console.error("Failed to sync wishlist to DB", e);
      }
    }
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
