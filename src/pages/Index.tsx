
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import SegmentSwitch from '../components/SegmentSwitch';
import ProductCard from '../components/ProductCard';
import AIToolsCarousel from '../components/AIToolsCarousel';
import LinkPill from '../components/LinkPill';
import { profileData } from '../data/profile';
import { productsData } from '../data/products';
import { aiToolsData } from '../data/tools';
import { socialLinksData } from '../data/links';

const Index = () => {
  const [activeSegment, setActiveSegment] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen bio-background transition-all duration-300`}>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 w-10 h-10 bio-card rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all"
        aria-label="Toggle theme"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <div className="max-w-sm mx-auto">
        {/* Hero Section */}
        <HeroSection
          name={profileData.name}
          tagline={profileData.tagline}
          avatar={profileData.avatar}
          coverImage={profileData.coverImage}
          socialLinks={profileData.socialLinks}
        />

        {/* Segment Control */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex justify-center mt-8 px-6"
        >
          <SegmentSwitch
            options={['Links', 'Shop']}
            activeIndex={activeSegment}
            onChange={setActiveSegment}
          />
        </motion.div>

        {/* Content Sections */}
        <div className="px-6 mt-8">
          {activeSegment === 0 ? (
            // Links Section
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {socialLinksData.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <LinkPill
                    name={link.name}
                    url={link.url}
                    avatar={link.avatar}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Shop Section
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Product Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {productsData.slice(0, 3).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={index === 2 ? "col-span-2" : ""}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </div>

              {/* See Full Shop Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <a
                  href="/shop"
                  className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  See Full Shop – {productsData.length} products
                </a>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* AI Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mt-12 px-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">My useful AI tools</h2>
          <AIToolsCarousel tools={aiToolsData} />
        </motion.div>

        {/* Bottom Spacing */}
        <div className="h-12" />
      </div>
    </div>
  );
};

export default Index;
