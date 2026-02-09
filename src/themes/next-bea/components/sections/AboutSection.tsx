import React from 'react';
import { motion } from 'framer-motion';
import type { AboutSection as AboutSectionType } from '@/lib/types';

interface AboutSectionProps {
    about: AboutSectionType;
}

const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
    return (
        <section className="bg-accent py-16 md:py-24 px-6 md:px-16 lg:px-24">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-start">
                {/* Portrait Image */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="w-full md:w-2/5 flex-shrink-0"
                >
                    <img
                        src={about.image}
                        alt="About"
                        className="w-full rounded-lg object-cover aspect-[3/4]"
                    />
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="flex-1 space-y-6"
                >
                    {about.paragraphs.map((p, i) => (
                        <p key={i} className="text-foreground/80 text-base md:text-lg leading-relaxed font-serif">
                            {p}
                        </p>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
