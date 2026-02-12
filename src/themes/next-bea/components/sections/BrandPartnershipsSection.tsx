import React from 'react';
import { motion } from 'framer-motion';

interface Brand {
    name: string;
    logo?: string;
}

interface BrandPartnershipsSectionProps {
    data: {
        title: string;
        brands: Brand[];
    };
}

const BrandPartnershipsSection: React.FC<BrandPartnershipsSectionProps> = ({ data }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
        }
    };

    return (
        <section className="bg-background py-16 md:py-24 px-6 md:px-16 lg:px-24">
            <div className="max-w-6xl mx-auto">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl md:text-4xl font-serif font-semibold text-foreground text-center mb-12"
                >
                    {data.title}
                </motion.h2>

                {/* Brand Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {data.brands.map((brand, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className="liquid-glass p-8 rounded-xl flex items-center justify-center min-h-[120px] cursor-default"
                        >
                            {brand.logo ? (
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="max-w-full max-h-16 object-contain opacity-80 hover:opacity-100 transition-opacity"
                                />
                            ) : (
                                <p className="text-lg font-serif font-semibold text-foreground/70 text-center">
                                    {brand.name}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default BrandPartnershipsSection;
