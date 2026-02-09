import React from 'react';
import { motion } from 'framer-motion';
import { Youtube } from 'lucide-react';
import type { Profile } from '@/lib/types';

interface HeroSectionProps {
    profile: Profile;
}

const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
    const nameParts = profile.name.split('\n');

    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Cover Image */}
            <img
                src={profile.coverImage}
                alt={profile.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
            />

            {/* Subtle overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* YouTube icon top-right */}
            {profile.socialLinks.some(l => l.icon === 'Youtube') && (
                <motion.a
                    href={profile.socialLinks.find(l => l.icon === 'Youtube')?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-6 right-6 z-10 w-10 h-10 rounded-lg bg-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-foreground/30 transition-colors"
                >
                    <Youtube className="w-5 h-5" />
                </motion.a>
            )}

            {/* Name & Tagline - Bottom Left */}
            <div className="absolute bottom-12 left-8 md:left-16 z-10">
                {nameParts.map((part, i) => (
                    <motion.h1
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.15, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-white leading-[0.95] tracking-tight"
                    >
                        {part}
                    </motion.h1>
                ))}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="text-lg sm:text-xl md:text-2xl text-white/90 mt-3 font-serif"
                >
                    {profile.tagline}
                </motion.p>
            </div>
        </section>
    );
};

export default HeroSection;
