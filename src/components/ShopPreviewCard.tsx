import React from 'react';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  url: string;
}

interface ShopPreviewCardProps {
  products: Product[];
  onShopClick: () => void;
}

const ShopPreviewCard: React.FC<ShopPreviewCardProps> = ({ products, onShopClick }) => {
  return (
    <motion.div
      onClick={onShopClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full max-w-md mx-auto bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200"
    >
      {/* Mini Product Grid */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {products.slice(0, 3).map((product, index) => (
          <div
            key={product.id}
            className="aspect-square rounded-lg overflow-hidden bg-gray-100"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Shop Info */}
      <div className="text-center">
        <div className="text-sm font-bold text-gray-900 mb-1">
          See Full Shop
        </div>
        <div className="text-xs text-gray-600">
          {products.length} Products
        </div>
      </div>
    </motion.div>
  );
};

export default ShopPreviewCard;
