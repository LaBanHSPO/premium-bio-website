import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronRight } from 'lucide-react';

interface LinkPillProps {
    name: string;
    url: string;
    avatar?: string;
    icon?: React.ReactNode;
    description?: string;
    backgroundImage?: string;
    hasDetail?: boolean;
    onViewDetail?: () => void;
}

const LinkPill: React.FC<LinkPillProps> = ({
    name,
    url,
    avatar,
    description,
    backgroundImage,
    hasDetail = false,
    onViewDetail
}) => {
    const handleExternalLink = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        window.open(url, '_blank');
    };

    const handleViewDetail = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        onViewDetail?.();
    };

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="block w-full"
        >
            <div
                className="flex w-full h-20 rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
            >
                {/* IMAGE - Compact square */}
                <div
                    className="w-20 h-20 flex-shrink-0 cursor-pointer"
                    onClick={handleExternalLink}
                    style={{
                        backgroundImage: backgroundImage
                            ? `url('${backgroundImage}')`
                            : (avatar
                                ? `url('${avatar}')`
                                : 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.7) 100%)'),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {/* CONTENT */}
                <div 
                    className="flex-1 flex flex-col justify-center px-4 py-2 min-w-0 cursor-pointer"
                    onClick={hasDetail ? handleViewDetail : handleExternalLink}
                >
                    <div className="text-sm font-semibold text-foreground leading-tight truncate">
                        {name}
                    </div>
                    {description && (
                        <div className="text-xs mt-1 text-muted-foreground leading-tight line-clamp-2">
                            {description}
                        </div>
                    )}
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-1 pr-3">
                    {/* External Link Icon */}
                    <motion.button
                        onClick={handleExternalLink}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Open external link"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                    </motion.button>

                    {/* View Detail Icon - Only show if has detail */}
                    {hasDetail && (
                        <motion.button
                            onClick={handleViewDetail}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary hover:text-primary transition-colors"
                            aria-label="View details"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default LinkPill;

