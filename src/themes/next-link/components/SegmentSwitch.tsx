
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SegmentSwitchProps {
  options: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}

const SegmentSwitch: React.FC<SegmentSwitchProps> = ({ options, activeIndex, onChange }) => {
  return (
    <div className="relative inline-flex bg-gray-100 p-1 rounded-full">
      <motion.div
        className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm"
        initial={false}
        animate={{
          left: activeIndex === 0 ? 4 : `calc(50% + 2px)`,
          width: `calc(50% - 6px)`
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      {options.map((option, index) => (
        <button
          key={option}
          onClick={() => onChange(index)}
          className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors ${
            activeIndex === index
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default SegmentSwitch;
