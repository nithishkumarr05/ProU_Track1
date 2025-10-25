import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Star, Zap, Shield, Leaf } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';

const ProductComparison = ({ products = [], onClose }) => {
  const [selectedProducts, setSelectedProducts] = useState(products.slice(0, 3));

  const addProduct = (product) => {
    if (selectedProducts.length < 4 && !selectedProducts.find(p => p._id === product._id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p._id !== productId));
  };

  const getFeatureIcon = (feature) => {
    const icons = {
      'Organic': <Leaf className="w-4 h-4 text-green-500" />,
      'Premium': <Star className="w-4 h-4 text-yellow-500" />,
      'Fast Delivery': <Zap className="w-4 h-4 text-blue-500" />,
      'Quality Assured': <Shield className="w-4 h-4 text-purple-500" />,
      'Best Seller': <TrendingUp className="w-4 h-4 text-red-500" />
    };
    return icons[feature] || <Star className="w-4 h-4 text-gray-500" />;
  };

  const getComparisonValue = (product, field) => {
    switch (field) {
      case 'price':
        return `₹${product.salePrice}`;
      case 'rating':
        return `${product.rating}/5`;
      case 'stock':
        return product.totalStock > 0 ? 'In Stock' : 'Out of Stock';
      case 'category':
        return product.category;
      default:
        return product[field] || 'N/A';
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Product Comparison
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">
                  Features
                </th>
                {selectedProducts.map((product) => (
                  <th key={product._id} className="text-center p-4 min-w-[200px]">
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="text-center">
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                          {product.name}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProduct(product._id)}
                          className="text-red-500 hover:text-red-700 mt-1"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Price', field: 'price' },
                { label: 'Rating', field: 'rating' },
                { label: 'Stock', field: 'stock' },
                { label: 'Category', field: 'category' },
                { label: 'Type', field: 'type' }
              ].map((row, index) => (
                <tr key={index} className="border-b dark:border-gray-700">
                  <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                    {row.label}
                  </td>
                  {selectedProducts.map((product) => (
                    <td key={product._id} className="p-4 text-center">
                      <span className="text-gray-900 dark:text-white">
                        {getComparisonValue(product, row.field)}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add More Products */}
        {selectedProducts.length < 4 && (
          <div className="p-6 border-t dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Add More Products to Compare
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products
                .filter(p => !selectedProducts.find(sp => sp._id === p._id))
                .slice(0, 4)
                .map((product) => (
                  <Card
                    key={product._id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => addProduct(product)}
                  >
                    <CardContent className="p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-20 object-cover rounded mb-2"
                      />
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ₹{product.salePrice}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProductComparison;
