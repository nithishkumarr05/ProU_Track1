import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShoppingCart, X, Heart, Eye } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Badge } from './badge';

const CartNotification = ({ isVisible, product, onClose, onViewCart, onAddToWishlist, onViewProduct }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible && product) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, product, onClose]);

  if (!show || !product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-4 right-4 z-50 max-w-sm w-full"
        initial={{ opacity: 0, x: 300, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 300, scale: 0.8 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-2xl border-l-4 border-teal-500">
          <CardContent className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    Added to Cart!
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Product successfully added
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShow(false);
                  onClose?.();
                }}
                className="w-6 h-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Product Info */}
            <div className="flex space-x-3 mb-4">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                  {product.name}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {product.category} • {product.weight}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-teal-600 dark:text-teal-400">
                    ₹{product.salePrice}
                  </span>
                  {product.price > product.salePrice && (
                    <span className="text-xs text-gray-500 line-through">
                      ₹{product.price}
                    </span>
                  )}
                </div>
                {product.featured && (
                  <Badge className="mt-1 text-xs bg-red-500">
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                onClick={() => {
                  onViewCart?.();
                  setShow(false);
                  onClose?.();
                }}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-xs py-2"
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                View Cart
              </Button>
              <Button
                onClick={() => {
                  onAddToWishlist?.(product);
                }}
                variant="outline"
                size="icon"
                className="w-8 h-8 p-0 hover:bg-red-50 hover:text-red-600"
              >
                <Heart className="w-3 h-3" />
              </Button>
              <Button
                onClick={() => {
                  onViewProduct?.(product);
                  setShow(false);
                  onClose?.();
                }}
                variant="outline"
                size="icon"
                className="w-8 h-8 p-0 hover:bg-blue-50 hover:text-blue-600"
              >
                <Eye className="w-3 h-3" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                <motion.div
                  className="bg-teal-500 h-1 rounded-full"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 4, ease: "linear" }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartNotification;
