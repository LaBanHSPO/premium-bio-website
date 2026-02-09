import React from 'react';
import { motion } from 'framer-motion';
import type { GallerySection as GallerySectionType } from '@/lib/types';

interface GallerySectionProps {
    gallery: GallerySectionType;
}

const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
    return (
        <section className="bg-secondary py-16 md:py-24 px-6 md:px-16 lg:px-24">
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-2xl md:text-4xl font-serif font-bold text-secondary-foreground text-center mb-12"
            >
                {gallery.title}
            </motion.h2>

            {/* Image Grid - 3 columns on desktop, 2+1 on mobile */}
            <div className="max-w-5xl mx-auto">
                {/* Desktop: 3 columns */}
                <div className="hidden md:grid grid-cols-3 gap-6">
                    {gallery.images.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className="overflow-hidden rounded-2xl"
                        >
                            <img
                                src={img.url}
                                alt={img.alt || `Gallery ${i + 1}`}
                                className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Mobile: 2 top + 1 centered bottom */}
                <div className="md:hidden space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {gallery.images.slice(0, 2).map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="overflow-hidden rounded-2xl"
                            >
                                <img
                                    src={img.url}
                                    alt={img.alt || `Gallery ${i + 1}`}
                                    className="w-full aspect-[3/4] object-cover"
                                />
                            </motion.div>
                        ))}
                    </div>
                    {gallery.images[2] && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex justify-center"
                        >
                            <div className="w-2/3 overflow-hidden rounded-2xl">
                                <img
                                    src={gallery.images[2].url}
                                    alt={gallery.images[2].alt || 'Gallery 3'}
                                    className="w-full aspect-[3/4] object-cover"
                                />
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
