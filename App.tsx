
import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import WishlistModal from './components/WishlistModal';
import CartModal from './components/CartModal';
import Home from './views/Home';
import ProductDetail from './components/ProductDetail';
import TheScript from './views/TheScript';
import { products } from './constants';
import { Product, CartItem } from './types';

type View = 'shop' | 'detail' | 'script';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<View>('shop');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('toxicfilms_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      
      const savedCart = localStorage.getItem('toxicfilms_cart');
      if (savedCart) setCartItems(JSON.parse(savedCart));
    } catch (e) {}
  }, []);

  useEffect(() => {
    localStorage.setItem('toxicfilms_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('toxicfilms_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      return exists ? prev.filter(p => p.id !== product.id) : [...prev, product];
    });
  };

  const navigateToDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
    window.scrollTo(0, 0);
  };

  const navigateToShop = () => {
    setCurrentView('shop');
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const navigateToScript = () => {
    setCurrentView('script');
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (loading) return <LoadingScreen />;

  return (
    <div className="relative min-h-screen">
      <div className="noise-overlay"></div>
      <div className="scanline-overlay"></div>

      <Header 
        cartCount={cartCount} 
        wishlistCount={wishlist.length}
        onWishlistClick={() => setIsWishlistOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        onLogoClick={navigateToShop}
        onShopClick={navigateToShop}
        onScriptClick={navigateToScript}
        activeView={currentView}
      />

      <main className="transition-opacity duration-500">
        {currentView === 'shop' && (
          <Home onProductClick={navigateToDetail} />
        )}

        {currentView === 'detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            onBack={navigateToShop}
            onAddToCart={(qty) => handleAddToCart(selectedProduct, qty)}
            onToggleWishlist={handleToggleWishlist}
            isInWishlist={wishlist.some(p => p.id === selectedProduct.id)}
            relatedProducts={products.filter(p => p.id !== selectedProduct.id).slice(0, 4)}
            onProductClick={navigateToDetail}
          />
        )}

        {currentView === 'script' && (
          <TheScript />
        )}
      </main>

      <Footer />

      <WishlistModal 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(product) => handleAddToCart(product, 1)}
      />

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateCartQuantity}
      />
    </div>
  );
};

export default App;
