import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Star, Trash2 } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Badge } from './badge';

const WishlistButton = ({ product, onToggle }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWishlisted(wishlist.some(item => item._id === product._id));
  }, [product._id]);

  const handleToggle = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isInWishlist = wishlist.some(item => item._id === product._id);
    
    if (isInWishlist) {
      const updatedWishlist = wishlist.filter(item => item._id !== product._id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    } else {
      const updatedWishlist = [...wishlist, product];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }
    
    setIsWishlisted(!isWishlisted);
    onToggle?.(product, !isWishlisted);
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={`p-2 rounded-full transition-colors ${
        isWishlisted 
          ? 'bg-red-100 text-red-500 hover:bg-red-200' 
          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Heart 
        className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} 
      />
    </motion.button>
  );
};

const WishlistItem = ({ product, onRemove, onAddToCart }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      <div className="flex">
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                {product.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                {product.category}
              </p>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.reviews})
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-2">
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  ₹{product.salePrice}
                </p>
                {product.price > product.salePrice && (
                  <p className="text-sm text-gray-500 line-through">
                    ₹{product.price}
                  </p>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => onAddToCart(product)}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Add to Cart
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onRemove(product._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const WishlistModal = ({ isOpen, onClose, onAddToCart }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlist(savedWishlist);
    }
  }, [isOpen]);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item._id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handleAddToCart = (product) => {
    onAddToCart?.(product);
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(product._id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                My Wishlist ({wishlist.length})
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                ×
              </Button>
            </div>

            {/* Wishlist Items */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {wishlist.length === 0 ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Your wishlist is empty
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {wishlist.map((product) => (
                      <WishlistItem
                        key={product._id}
                        product={product}
                        onRemove={removeFromWishlist}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { WishlistButton, WishlistModal };
