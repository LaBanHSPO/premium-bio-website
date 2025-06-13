
import React from 'react';
import { motion } from 'framer-motion';

interface LinkPillProps {
  name: string;
  url: string;
  avatar?: string;
  icon?: React.ReactNode;
}

const LinkPill: React.FC<LinkPillProps> = ({ name, url, avatar, icon }) => {
  const handleClick = () => {
    // Haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    window.open(url, '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full bio-card rounded-full p-4 shadow-sm transition-all-smooth hover:bg-gray-50 flex items-center justify-center space-x-3"
    >
      {avatar && (
        <img
          src={avatar}
          alt={name}
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
      {icon && <div className="w-8 h-8 flex items-center justify-center">{icon}</div>}
      <span className="font-medium text-gray-900">{name}</span>
    </motion.button>
  );
};

export default LinkPill;
