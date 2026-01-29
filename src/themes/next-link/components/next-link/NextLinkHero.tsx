import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Twitter, Mail, Youtube, ChevronUp, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSelector } from '@/components/LanguageSelector';
import type { SocialLink } from '@/lib/bio-types';

interface NextLinkHeroProps {
    name: string;
    tagline: string;
    avatar: string;
    coverImage: string;
    socialLinks: SocialLink[];
    defaultCollapsed?: boolean;
}

const NextLinkHero: React.FC<NextLinkHeroProps> = ({
    name,
    tagline,
    avatar,
    coverImage,
    socialLinks,
    defaultCollapsed = false
}) => {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

    const getIcon = (iconName: string) => {
        const icons: Record<string, React.ComponentType<{ className?: string }>> = {
            Globe: Globe,
            Twitter: Twitter,
            Mail: Mail,
            Youtube: Youtube,
        };
        const IconComponent = icons[iconName] || Globe;
        return <IconComponent className="w-4 h-4" />;
    };

    const springTransition = {
        type: "spring" as const,
        stiffness: 350,
        damping: 30
    };

    return (
        <motion.div
            layout
            className="w-full"
            transition={springTransition}
        >
            <AnimatePresence mode="wait">
                {isCollapsed ? (
                    // Collapsed View
                    <motion.div
                        key="collapsed"
                        layout="position"
                        layoutId="hero-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        transition={springTransition}
                        className="bio-card rounded-2xl shadow-lg px-4 py-3 bg-card"
                    >
                        <div className="flex items-center justify-between">
                            {/* Left: Avatar + Name + Socials */}
                            <motion.div
                                className="flex items-center gap-3"
                                layout
                            >
                                <motion.img
                                    src={avatar}
                                    alt={name}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-border"
                                    layoutId="avatar"
                                    transition={springTransition}
                                />
                                <div>
                                    <motion.h2
                                        className="font-semibold text-foreground text-sm"
                                        layoutId="name"
                                        transition={springTransition}
                                    >
                                        {name}
                                    </motion.h2>
                                    <motion.div
                                        className="flex items-center gap-1.5 mt-1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        {socialLinks.map((link, index) => (
                                            <motion.a
                                                key={link.name}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="w-6 h-6 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                                aria-label={link.name}
                                            >
                                                {getIcon(link.icon)}
                                            </motion.a>
                                        ))}
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Right: Controls + Expand */}
                            <motion.div
                                className="flex items-center gap-2"
                                layout
                            >
                                <ThemeToggle />
                                <LanguageSelector />
                                <motion.button
                                    onClick={() => setIsCollapsed(false)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-8 h-8 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label="Expand profile"
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                ) : (
                    // Expanded View
                    <motion.div
                        key="expanded"
                        layout="position"
                        layoutId="hero-card"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                        transition={springTransition}
                        className="relative bio-card rounded-3xl shadow-lg overflow-hidden bg-card"
                    >
                        {/* Controls - Top Left */}
                        <motion.div
                            className="absolute top-4 left-4 z-20 flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <ThemeToggle />
                            <LanguageSelector />
                        </motion.div>

                        {/* Collapse Button - Top Right */}
                        <motion.button
                            onClick={() => setIsCollapsed(true)}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, ...springTransition }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-4 right-4 z-20 w-8 h-8 bg-background/30 hover:bg-background/50 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors"
                            aria-label="Collapse profile"
                        >
                            <ChevronUp className="w-4 h-4" />
                        </motion.button>

                        {/* Cover Image */}
                        <motion.div
                            className="h-64 relative overflow-hidden"
                            layout
                        >
                            <img
                                src={coverImage}
                                alt="Cover"
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="eager"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

                            {/* Avatar */}
                            <motion.div
                                className="absolute bottom-4 right-4 z-10"
                                layoutId="avatar-container"
                                transition={springTransition}
                            >
                                <motion.div
                                    className="w-20 h-20 rounded-full bg-background p-1 shadow-xl"
                                >
                                    <motion.img
                                        src={avatar}
                                        alt={name}
                                        className="w-full h-full rounded-full object-cover"
                                        layoutId="avatar"
                                        transition={springTransition}
                                    />
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Profile Info */}
                        <div className="text-center px-6 py-6">
                            <motion.h1
                                className="text-2xl font-bold bio-accent mb-2 tracking-tight"
                                layoutId="name"
                                transition={springTransition}
                            >
                                {name}
                            </motion.h1>
                            <motion.div
                                className="max-w-sm mx-auto mb-6"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <p className="text-sm text-muted-foreground leading-relaxed font-medium whitespace-pre-line break-words">
                                    {tagline}
                                </p>
                            </motion.div>

                            {/* Social Links */}
                            <div className="flex justify-center space-x-3 pb-2">
                                {socialLinks.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 + index * 0.05 }}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-full shadow-md hover:shadow-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300 border border-border"
                                        aria-label={link.name}
                                    >
                                        {getIcon(link.icon)}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default NextLinkHero;
