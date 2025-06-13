import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  url: string;
}

interface ShopSectionProps {
  products: Product[];
}

const ShopSection: React.FC<ShopSectionProps> = ({ products }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50 rounded-3xl p-6 shadow-sm"
    >
      {/* Top Row - 2 products side by side */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {products.slice(0, 2).map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard {...product} />
          </motion.div>
        ))}
      </div>

      {/* Bottom Row - 1 large product */}
      {products.length > 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <ProductCard {...products[2]} isLarge={true} />
        </motion.div>
      )}

      {/* See Full Shop Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center pt-2"
      >
        <div className="text-sm font-medium text-gray-900 mb-1">
          See Full Shop
        </div>
        <div className="text-xs text-gray-500">
          {products.length} Products
        </div>
      </motion.div>

    </motion.div>
  );
};

export default ShopSection;
