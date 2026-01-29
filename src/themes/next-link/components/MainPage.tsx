"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import NextLinkHero from "@/components/next-link/NextLinkHero";
import SegmentSwitch from "@/components/next-link/SegmentSwitch";
import ShopSection from "@/components/next-link/ShopSection";
import AIToolsCarousel from "@/components/next-link/AIToolsCarousel";
import LinkPill from "@/components/next-link/LinkPill";
import LinkDetail from "@/components/next-link/LinkDetail";
import ProductDetail from "@/components/bio/ProductDetail";
import bioConfig from "@/theme/config";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import PromoFooter from './bio/PromoFooter';
import type { BioData } from '@/lib/bio-types';
import type { Link } from "@/lib/bio-types";

// Type for product detail (from existing BioPage)
interface NextLinkProduct {
    id: string;
    titleKey: string;
    descriptionKey: string;
    imageUrl: string;
    buttonTextKey: string;
    detailType?: "whiteLabel" | "personalBrand" | "digitalProducts";
    externalLink?: string;
    price?: string;
}

const MainPageContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const languageContext = useLanguage();
    const t = languageContext?.t || ((key: string) => key);

    const [activeSegment, setActiveSegment] = useState(0);
    const [selectedLink, setSelectedLink] = useState<Link | null>(null);

    const productId = searchParams.get("product");

    // Helper to find product by ID
    // Note: bioConfig.products structure might differ slightly from NextLinkProduct interface expectation
    // We map it here.
    function findProductById(id: string): NextLinkProduct | null {
        const product = bioConfig.products.find(p => p.id.toString() === id);
        if (!product) return null;

        return {
            id: product.id.toString(),
            titleKey: product.name, // Mapping name to titleKey strictly for this component's logic
            descriptionKey: product.name, // Placeholder as original bioConfig might not have keys
            imageUrl: product.image,
            buttonTextKey: "Buy Now",
            externalLink: product.url,
            price: product.price
        };
    }

    const selectedProduct = productId ? findProductById(productId) : null;

    useEffect(() => {
        if (selectedProduct || selectedLink) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [selectedProduct, selectedLink]);

    const handleBack = () => {
        if (selectedLink) {
            setSelectedLink(null);
        } else {
            router.push("/");
        }
    };

    const handleViewLinkDetail = (link: Link) => {
        setSelectedLink(link);
    };

    // If showing product detail
    if (selectedProduct) {
        return (
            <div className="min-h-screen bio-background">
                <div className="max-w-sm mx-auto py-8 px-4">
                    <ProductDetail product={selectedProduct} onBack={handleBack} />
                </div>
            </div>
        );
    }

    // If showing link detail
    if (selectedLink) {
        return (
            <div className="min-h-screen bio-background">
                <div className="max-w-sm mx-auto py-8 px-4">
                    <LinkDetail link={selectedLink} onBack={handleBack} />
                </div>
            </div>
        );
    }

    // Get settings with defaults
    const settings = bioConfig.settings ?? {
        defaultCollapsed: false,
        showSegmentTabs: true,
        showAiTools: true,
    };

    return (
        <div className="min-h-screen bio-background transition-all duration-300">
            <div className="h-12" />

            <div className="max-w-sm mx-auto">
                {/* Hero Section */}
                <NextLinkHero
                    name={bioConfig.profile.name}
                    tagline={bioConfig.profile.tagline}
                    avatar={bioConfig.profile.avatar}
                    coverImage={bioConfig.profile.coverImage}
                    socialLinks={bioConfig.profile.socialLinks}
                    defaultCollapsed={settings.defaultCollapsed}
                />

                {/* Segment Control - Only show if enabled */}
                {settings.showSegmentTabs && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        className="flex justify-center mt-8 px-6"
                    >
                        <SegmentSwitch
                            options={[t("links"), t("shop")]}
                            activeIndex={activeSegment}
                            onChange={setActiveSegment}
                        />
                    </motion.div>
                )}

                {/* Content Sections */}
                {/* Content Sections */}
                <div className="mt-6 sm:mt-8">
                    {settings.showSegmentTabs ? (
                        <AnimatePresence mode="wait">
                            {activeSegment === 0 ? (
                                <motion.div
                                    key="links"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-3 sm:space-y-4"
                                >
                                    {bioConfig.links.map((link, index) => (
                                        <motion.div
                                            key={link.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <LinkPill
                                                name={t(link.name as any)}
                                                url={link.url}
                                                description={t(link.description as any)}
                                                backgroundImage={link.backgroundImage}
                                                hasDetail={!!link.detailContent}
                                                onViewDetail={() => handleViewLinkDetail(link)}
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="shop"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ShopSection products={bioConfig.products.map(p => ({
                                        ...p,
                                        name: t(p.name as any),
                                    }))} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            className="space-y-3 sm:space-y-4"
                        >
                            {bioConfig.links.map((link, index) => (
                                <motion.div
                                    key={link.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.08 }}
                                >
                                    <LinkPill
                                        name={t(link.name as any)}
                                        url={link.url}
                                        description={t(link.description as any)}
                                        backgroundImage={link.backgroundImage}
                                        hasDetail={!!link.detailContent}
                                        onViewDetail={() => handleViewLinkDetail(link)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* AI Tools Carousel - Only show if enabled */}
                {settings.showAiTools && bioConfig.aiTools.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.5 }}
                        className="mt-6 sm:mt-8 px-4 sm:px-6"
                    >
                        <h3 className="text-sm font-medium text-muted-foreground mb-4 text-center">
                            {t("aiToolsTitle")}
                        </h3>
                        <AIToolsCarousel tools={bioConfig.aiTools} />
                    </motion.div>
                )}

                {/* Footer */}
                <motion.div
                    className="py-8 text-center space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <PromoFooter />
                </motion.div>

                {/* Bottom Spacing */}
                <div className="h-12" />
            </div>
        </div>
    );
};

export default function MainPage() {
    return (
        <LanguageProvider>
            <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
                <MainPageContent />
            </Suspense>
        </LanguageProvider>
    );
}
