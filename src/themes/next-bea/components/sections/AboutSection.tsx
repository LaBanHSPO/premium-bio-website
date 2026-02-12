import React from 'react';
import { motion } from 'framer-motion';
import type { AboutSection as AboutSectionType } from '@/lib/types';

interface AboutSectionProps {
    about: AboutSectionType;
}

const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
    const stats = [
        { label: 'Years Active', value: '5+' },
        { label: 'Campaigns', value: '100+' },
        { label: 'Awards', value: '12' }
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    };

    return (
        <section className="bg-secondary py-16 md:py-24 px-6 md:px-16 lg:px-24">
            <div className="max-w-7xl mx-auto">
                {/* Desktop: Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                    {/* Image */}
                    <motion.div {...fadeInUp}>
                        <div className="relative overflow-hidden rounded-2xl">
                            <img
                                src={about.image}
                                alt="About"
                                className="w-full aspect-[3/4] object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Content */}
                    <div className="space-y-8">
                        <motion.h2
                            {...fadeInUp}
                            transition={{ ...fadeInUp.transition, delay: 0.2 }}
                            className="text-3xl md:text-5xl font-serif font-semibold text-secondary-foreground"
                        >
                            About
                        </motion.h2>

                        {/* Paragraphs */}
                        <motion.div
                            {...fadeInUp}
                            transition={{ ...fadeInUp.transition, delay: 0.3 }}
                            className="space-y-4"
                        >
                            {about.paragraphs.map((para, i) => (
                                <p
                                    key={i}
                                    className="text-base md:text-lg text-secondary-foreground/90 font-sans leading-relaxed"
                                >
                                    {para}
                                </p>
                            ))}
                        </motion.div>

                        {/* Stats Cards */}
                        <motion.div
                            {...fadeInUp}
                            transition={{ ...fadeInUp.transition, delay: 0.5 }}
                            className="grid grid-cols-3 gap-4 mt-8"
                        >
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                                    className="liquid-glass p-4 rounded-xl text-center"
                                >
                                    <p className="text-2xl md:text-3xl font-serif font-bold text-secondary-foreground">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs md:text-sm text-secondary-foreground/70 font-sans mt-1">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
