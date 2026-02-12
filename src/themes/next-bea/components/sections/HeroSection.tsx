import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Youtube, ChevronDown } from 'lucide-react';
import type { Profile } from '@/lib/types';

interface HeroSectionProps {
    profile: Profile;
}

const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const nameParts = profile.name.split('\n');

    const getSocialIcon = (iconName: string) => {
        switch (iconName) {
            case 'Instagram':
                return <Instagram className="w-5 h-5" />;
            case 'Youtube':
                return <Youtube className="w-5 h-5" />;
            default:
                return null;
        }
    };

    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Parallax Cover Image */}
            <motion.img
                src={profile.coverImage}
                alt={profile.name}
                style={{ y }}
                className="absolute inset-0 w-full h-[120%] object-cover"
                loading="eager"
            />

            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Floating Glass Social Icons - Top Right */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="absolute top-6 right-6 z-10 flex gap-3"
            >
                {profile.socialLinks.map((link, i) => (
                    <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center text-white hover:text-accent transition-colors cursor-pointer"
                        aria-label={link.name}
                    >
                        {getSocialIcon(link.icon)}
                    </motion.a>
                ))}
            </motion.div>

            {/* Name & Tagline - Bottom Left */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-16 left-8 md:left-16 z-10 max-w-4xl"
            >
                {nameParts.map((part, i) => (
                    <motion.h1
                        key={i}
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.3 + i * 0.15,
                            duration: 0.8,
                            ease: [0.4, 0, 0.2, 1]
                        }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-white leading-[0.95] tracking-tight"
                    >
                        {part}
                    </motion.h1>
                ))}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="text-sm sm:text-base md:text-lg text-white/90 mt-4 font-sans font-light tracking-[0.15em] uppercase"
                >
                    {profile.tagline}
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                    <span className="text-white/70 text-xs font-sans tracking-widest uppercase">
                        Scroll
                    </span>
                    <ChevronDown className="w-6 h-6 text-white/70" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
