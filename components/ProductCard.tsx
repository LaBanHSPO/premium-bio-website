
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: string;
  url: string;
  isLarge?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, image, price, url, isLarge = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bio-card rounded-2xl shadow-sm overflow-hidden cursor-pointer transition-all-smooth"
    >
      <a href={url} className={`block ${isLarge ? 'flex' : ''}`}>
        <div className={`relative overflow-hidden ${
          isLarge
            ? 'w-1/2 aspect-[4/3]'
            : 'aspect-square'
        }`}>
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
        <div className={`${isLarge ? 'w-1/2 flex flex-col justify-center p-6' : 'p-3'}`}>
          <h3 className={`font-medium text-gray-900 mb-1 line-clamp-2 ${
            isLarge ? 'text-lg' : 'text-xs'
          }`}>{name}</h3>
          <p className={`font-semibold bio-accent ${
            isLarge ? 'text-xl' : 'text-xs'
          }`}>{price}</p>
        </div>
      </a>
    </motion.div>
  );
};

export default ProductCard;
