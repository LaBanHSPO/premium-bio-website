'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import SegmentSwitch from '@/components/SegmentSwitch';
import ShopSection from '@/components/ShopSection';
import ShopPreviewCard from '@/components/ShopPreviewCard';
import AIToolsCarousel from '@/components/AIToolsCarousel';
import LinkPill from '@/components/LinkPill';
import { profileData } from '@/data/profile';
import { productsData } from '@/data/products';
import { aiToolsData } from '@/data/tools';
import { socialLinksData } from '@/data/links';

export default function Home() {
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
              {/* Shop Preview Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
              >
                <ShopPreviewCard
                  products={productsData}
                  onShopClick={() => setActiveSegment(1)}
                />
              </motion.div>

              {/* Social Links */}
              {socialLinksData.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + 1) * 0.1 }}
                >
                  <LinkPill
                    name={link.name}
                    url={link.url}
                    description={link.description}
                    backgroundImage={link.backgroundImage}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Shop Section
            <ShopSection products={productsData} />
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
}
