"use client";

import React from "react";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import GallerySection from "./sections/GallerySection";
import BrandPartnershipsSection from "./sections/BrandPartnershipsSection";
import VideoSection from "./sections/VideoSection";
import ContactSection from "./sections/ContactSection";
import FooterSection from "./sections/FooterSection";
import { bioConfig } from "../config"; // Adjusted import path

const MainPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* 1. Full-screen Hero */}
            <HeroSection profile={bioConfig.profile} />

            {/* 2. About Section */}
            {bioConfig.about && (
                <AboutSection about={bioConfig.about} />
            )}

            {/* 3. Gallery Section */}
            {bioConfig.gallery && (
                <GallerySection gallery={bioConfig.gallery} />
            )}

            {/* 4. Brand Partnerships */}
            {bioConfig.brandPartnerships && (
                <BrandPartnershipsSection data={bioConfig.brandPartnerships} />
            )}

            {/* 5. Video Section */}
            {bioConfig.video && (
                <VideoSection video={bioConfig.video} />
            )}

            {/* 6. Contact / CTA */}
            {bioConfig.contact && (
                <ContactSection contact={bioConfig.contact} />
            )}

            {/* 7. Footer */}
            <FooterSection socialLinks={bioConfig.profile.socialLinks} />
        </div>
    );
};

export default MainPage;
