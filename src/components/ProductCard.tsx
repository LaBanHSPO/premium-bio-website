
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: string;
  url: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, image, price, url }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bio-card rounded-2xl shadow-sm overflow-hidden cursor-pointer transition-all-smooth"
    >
      <a href={url} className="block">
        <div className="aspect-square relative overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 shimmer bg-gray-200" />
          )}
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-sm text-gray-900 mb-1">{name}</h3>
          <p className="text-sm font-semibold bio-accent">{price}</p>
        </div>
      </a>
    </motion.div>
  );
};

export default ProductCard;
