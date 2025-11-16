import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import { ProductCard } from './components/ProductCard'; 
import Footer from './components/Footer';
import WishlistModal from './components/WishlistModal';
import FilterBar from './components/FilterBar';
import CartModal from './components/CartModal'; 
import ProductDetailModal from './components/ProductDetailModal';
import { products } from './constants';
import { Product, CartItem, Review } from './types'; 

interface AllProductReviews {
  [productId: number]: Review[];
}

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]); 
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false); 
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // New state for product detail modal
  const [allProductReviews, setAllProductReviews] = useState<AllProductReviews>({}); // New state for reviews

  const categories = ['All', 'Hoodies & Sweatshirts', 'Tops & T-shirts', 'Shorts & Trousers', 'Shoes', 'Accessories'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('toxicfilms_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
      const savedCart = localStorage.getItem('toxicfilms_cart'); 
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      const savedReviews = localStorage.getItem('toxicfilms_product_reviews'); // Load reviews
      if (savedReviews) {
        setAllProductReviews(JSON.parse(savedReviews));
      }
    } catch (error) {
      console.error("Failed to parse data from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('toxicfilms_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('toxicfilms_cart', JSON.stringify(cartItems)); 
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('toxicfilms_product_reviews', JSON.stringify(allProductReviews)); // Save reviews
  }, [allProductReviews]);

  const handleAddToCart = (product: Product, quantity: number = 1) => { 
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: quantity }];
      }
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleIncreaseQuantity = (productId: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (productId: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
      .filter(item => item.quantity > 0) 
    );
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
  
  const handleAddToCartFromWishlist = (product: Product, quantity: number = 1) => { 
    handleAddToCart(product, quantity); // Default quantity to 1 or passed quantity when adding from wishlist modal
    setIsWishlistOpen(false);
  }

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddReview = (productId: number, review: Omit<Review, 'id' | 'timestamp'>) => {
    const newReview: Review = {
      ...review,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, // Unique ID
      timestamp: Date.now(),
    };
    setAllProductReviews(prevReviews => ({
      ...prevReviews,
      [productId]: [...(prevReviews[productId] || []), newReview],
    }));
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0); 

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
          cartCount={totalCartItems} 
          wishlistCount={wishlist.length}
          onWishlistClick={() => setIsWishlistOpen(true)}
          onCartClick={() => setIsCartOpen(true)} 
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
                onProductClick={handleProductClick} // Pass product click handler
                reviews={allProductReviews[product.id] || []} // Pass reviews to ProductCard
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

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
      />

      {selectedProduct && (
        <ProductDetailModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
          reviews={allProductReviews[selectedProduct.id] || []}
          onAddReview={handleAddReview}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={wishlist.some(item => item.id === selectedProduct.id)}
        />
      )}
    </div>
  );
};

export default App;