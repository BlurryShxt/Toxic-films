import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import WishlistModal from './components/WishlistModal';
import FilterBar from './components/FilterBar';
import { products } from './constants';
import { Product } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cartCount, setCartCount] = useState<number>(0);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Hoodies & Sweatshirts', 'Tops & T-shirts', 'Shorts & Trousers', 'Shoes', 'Accessories'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Duration of the loading animation
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('toxicfilms_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('toxicfilms_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleAddToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      const isInWishlist = prevWishlist.some(item => item.id === product.id);
      if (isInWishlist) {
        return prevWishlist.filter(item => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };
  
  const handleAddToCartFromWishlist = () => {
    handleAddToCart();
    setIsWishlistOpen(false);
  }

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
  };

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(product => product.category === activeCategory);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative bg-[#0a0a0a] min-h-screen text-gray-300 font-vt323 text-lg overflow-x-hidden">
      <div className="noise-overlay"></div>
      <div className="scanline-overlay"></div>

      <div className="relative z-10">
        <Header 
          cartCount={cartCount} 
          wishlistCount={wishlist.length}
          onWishlistClick={() => setIsWishlistOpen(true)}
        />
        
        <main className="container mx-auto px-4 py-24 md:py-32">
          <FilterBar 
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredProducts.map((product: Product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                isInWishlist={wishlist.some(item => item.id === product.id)}
              />
            ))}
          </div>
        </main>

        <Footer />
      </div>

      <WishlistModal 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCartFromWishlist}
      />
    </div>
  );
};

export default App;