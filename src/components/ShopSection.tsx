import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { Product } from '@/lib/types';

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

    </motion.div>
  );
};

export default ShopSection;
