
import React from 'react';
import { motion } from 'framer-motion';

interface LinkPillProps {
  name: string;
  url: string;
  avatar?: string;
  icon?: React.ReactNode;
  description?: string;
  backgroundImage?: string;
}

const LinkPill: React.FC<LinkPillProps> = ({
  name,
  url,
  avatar,
  icon,
  description,
  backgroundImage
}) => {
  const handleClick = () => {
    // Haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    window.open(url, '_blank');
  };

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="block w-full"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div
        className="flex w-full h-32 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
        style={{
          fontFamily: "'Roboto', sans-serif"
        }}
      >
        {/* COLUMN 1: IMAGE */}
        <div
          className="w-1/2 h-full"
          style={{
            backgroundImage: backgroundImage ? `url('${backgroundImage}')` : (avatar ? `url('${avatar}')` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.95) contrast(1.1)'
          }}
        />

        {/* COLUMN 2: TITLE + DESCRIPTION */}
        <div className="w-1/2 bg-gray-50 flex flex-col justify-center items-center p-3 text-center">
          <div className="text-sm font-bold text-gray-900 leading-tight">
            {name}
          </div>
          {description && (
            <div className="text-xs mt-1 text-gray-600 leading-tight">
              {description}
            </div>
          )}
        </div>
      </div>
    </motion.a>
  );
};

export default LinkPill;
