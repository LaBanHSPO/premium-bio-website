import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { GallerySection as GallerySectionType } from '@/lib/types';

interface GallerySectionProps {
    gallery: GallerySectionType;
}

const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
        }
    };

    return (
        <>
            <section className="bg-background py-16 md:py-24 px-6 md:px-16 lg:px-24">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-5xl font-serif font-semibold text-foreground text-center mb-16"
                >
                    {gallery.title}
                </motion.h2>

                {/* Masonry Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="max-w-7xl mx-auto masonry-grid"
                >
                    {gallery.images.map((img, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="masonry-item group"
                            onClick={() => setSelectedImage(i)}
                        >
                            <div className="portfolio-image-wrapper">
                                <img
                                    src={img.url}
                                    alt={img.alt || `Portfolio ${i + 1}`}
                                    className="portfolio-image"
                                    loading="lazy"
                                />
                                <div className="portfolio-overlay">
                                    <div className="text-white">
                                        <p className="font-serif text-xl md:text-2xl font-semibold mb-1">
                                            {img.alt || `Project ${i + 1}`}
                                        </p>
                                        <p className="text-sm md:text-base text-white/80 font-sans">
                                            Editorial | 2024
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 w-12 h-12 rounded-full liquid-glass-dark flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            aria-label="Close lightbox"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            src={gallery.images[selectedImage].url}
                            alt={gallery.images[selectedImage].alt}
                            className="max-w-full max-h-full object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default GallerySection;
