import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Link } from '@/lib/bio-types';

interface LinkDetailProps {
    link: Link;
    onBack: () => void;
}

const LinkDetail: React.FC<LinkDetailProps> = ({ link, onBack }) => {
    const handleCTA = () => {
        const url = link.detailContent?.ctaUrl || link.url;
        window.open(url, '_blank');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="min-h-screen"
        >
            {/* Back Button */}
            <motion.button
                onClick={onBack}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back</span>
            </motion.button>

            {/* Hero Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="relative h-48 rounded-2xl overflow-hidden mb-6"
            >
                <img
                    src={link.backgroundImage}
                    alt={link.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </motion.div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="bio-card rounded-2xl p-6 shadow-lg"
            >
                {/* Header */}
                <h1 className="text-2xl font-bold text-foreground mb-2">
                    {link.name}
                </h1>
                
                {link.detailContent?.subtitle && (
                    <p className="text-muted-foreground font-medium mb-4">
                        {link.detailContent.subtitle}
                    </p>
                )}

                {/* Divider */}
                <div className="h-px bg-border my-4" />

                {/* Content */}
                <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
                    {link.detailContent?.content.split('\n').map((paragraph, index) => {
                        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                            return (
                                <h3 key={index} className="text-base font-semibold text-foreground mt-4 mb-2">
                                    {paragraph.replace(/\*\*/g, '')}
                                </h3>
                            );
                        }
                        if (paragraph.startsWith('- ')) {
                            return (
                                <li key={index} className="text-muted-foreground ml-4">
                                    {paragraph.replace('- ', '')}
                                </li>
                            );
                        }
                        if (paragraph.trim()) {
                            return (
                                <p key={index} className="text-muted-foreground leading-relaxed mb-3">
                                    {paragraph}
                                </p>
                            );
                        }
                        return null;
                    })}
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                >
                    <Button
                        onClick={handleCTA}
                        className="w-full py-6 text-base font-semibold rounded-xl flex items-center justify-center gap-2"
                    >
                        {link.detailContent?.ctaText || 'Visit Link'}
                        <ExternalLink className="w-4 h-4" />
                    </Button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default LinkDetail;
