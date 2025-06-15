'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import SegmentSwitch from '@/components/SegmentSwitch';
import ShopSection from '@/components/ShopSection';
import ShopPreviewCard from '@/components/ShopPreviewCard';
import AIToolsCarousel from '@/components/AIToolsCarousel';
import LinkPill from '@/components/LinkPill';
import { BioData } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [activeSegment, setActiveSegment] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bioData, setBioData] = useState<BioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load bio data from API
  useEffect(() => {
    const loadBioData = async () => {
      try {
        const response = await fetch('/api/config');
        if (response.ok) {
          const data: BioData = await response.json();
          setBioData(data);
        }
      } catch (error) {
        console.error('Failed to load bio data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBioData();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!bioData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Failed to load bio data</h1>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

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
          name={bioData.profile.name}
          tagline={bioData.profile.tagline}
          avatar={bioData.profile.avatar}
          coverImage={bioData.profile.coverImage}
          socialLinks={bioData.profile.socialLinks}
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
                  products={bioData.products}
                  onShopClick={() => setActiveSegment(1)}
                />
              </motion.div>

              {/* Social Links */}
              {bioData.links.map((link, index) => (
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
            <ShopSection products={bioData.products} />
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
          <AIToolsCarousel tools={bioData.aiTools} />
        </motion.div>

        {/* Bottom Spacing */}
        <div className="h-12" />
      </div>
    </div>
  );
}
