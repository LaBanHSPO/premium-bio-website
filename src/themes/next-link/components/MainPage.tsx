"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import SegmentSwitch from "./SegmentSwitch";
import ShopSection from "./ShopSection";
import ShopPreviewCard from "./ShopPreviewCard";
import AIToolsCarousel from "./AIToolsCarousel";
import LinkPill from "./LinkPill";

// import { BioData } from "@/lib/types"; // Types should be inferred or imported if needed, but config is local now.
// However, to keep it clean, we can import the type or just use typeof config
import { config } from "../config";
// import { Loader2 } from "lucide-react"; // No longer needed

export default function MainPage() {
    const [activeSegment, setActiveSegment] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Use config directly
    const bioData = config;

    // No async loading needed


    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.setAttribute(
            "data-theme",
            isDarkMode ? "light" : "dark",
        );
    };



    return (
        <div className={`min-h-screen bio-background transition-all duration-300`}>
            <div className="h-12" />
            {/* Theme Toggle */}
            <button
                onClick={toggleTheme}
                className="fixed top-4 right-4 z-50 w-10 h-10 bio-card rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all"
                aria-label="Toggle theme"
            >
                {isDarkMode ? "☀️" : "🌙"}
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
                        options={["Links", "Shop"]}
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

                {/* Bottom Spacing */}
                <div className="h-12" />
            </div>
        </div>
    );
}
