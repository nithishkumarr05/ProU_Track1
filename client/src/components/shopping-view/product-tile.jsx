import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { WishlistButton } from '../ui/wishlist';
import CartNotification from '../ui/cart-notification';

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState(null);

  const handleAddToCart = (productId) => {
    handleAddtoCart(productId);
    setNotificationProduct(product);
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    setNotificationProduct(null);
  };

  const handleViewCart = () => {
    // Navigate to cart page using React Router
    navigate('/shop/checkout');
  };

  const handleAddToWishlist = (product) => {
    // Wishlist functionality is handled by WishlistButton
    console.log('Added to wishlist:', product.name);
  };

  const handleViewProduct = (product) => {
    handleGetProductDetails(product._id);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-sm mx-auto"
      >
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative group">
            <img
              src={product?.image}
              alt={product?.name}
              className="w-full h-[250px] object-cover"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col space-y-1">
              {product?.totalStock === 0 ? (
                <Badge className="bg-red-500 hover:bg-red-600">
                  Out Of Stock
                </Badge>
              ) : product?.totalStock < 10 ? (
                <Badge className="bg-orange-500 hover:bg-orange-600">
                  Only {product?.totalStock} left
                </Badge>
              ) : product?.salePrice < product?.price ? (
                <Badge className="bg-red-500 hover:bg-red-600">
                  Sale
                </Badge>
              ) : null}
              {product?.featured && (
                <Badge className="bg-green-500 hover:bg-green-600">
                  Featured
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex flex-col space-y-1">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => handleGetProductDetails(product?._id)}
                  className="w-8 h-8 bg-white/90 hover:bg-white"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <WishlistButton product={product} />
              </div>
            </div>
          </div>

          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {product?.name}
            </h3>
            
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product?.rating || 0) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-1">
                ({product?.reviews || 0})
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {product?.category} • {product?.weight}
            </p>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-teal-600 dark:text-teal-400">
                  ₹{product?.salePrice || product?.price}
                </span>
                {product?.salePrice < product?.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product?.price}
                  </span>
                )}
              </div>
              {product?.brand && (
                <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {product.brand}
                </span>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            {product?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out Of Stock
              </Button>
            ) : (
              <Button
                onClick={() => handleAddToCart(product?._id)}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>

      {/* Cart Notification */}
      <CartNotification
        isVisible={showNotification}
        product={notificationProduct}
        onClose={handleCloseNotification}
        onViewCart={handleViewCart}
        onAddToWishlist={handleAddToWishlist}
        onViewProduct={handleViewProduct}
      />
    </>
  );
}

export default ShoppingProductTile;
