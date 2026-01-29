import React, { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { AITool } from '@/lib/bio-types';

interface AIToolsCarouselProps {
    tools: AITool[];
}

const AIToolsCarousel: React.FC<AIToolsCarouselProps> = ({ tools }) => {
    const autoplayPlugin = React.useRef(
        Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            slidesToScroll: 1,
        },
        [autoplayPlugin.current]
    );

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
    }, [emblaApi]);

    return (
        <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {tools.map((tool, index) => (
                        <motion.div
                            key={tool.id}
                            className="flex-[0_0_160px] min-w-0 mr-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <motion.a
                                href={tool.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="bio-card rounded-xl p-3 shadow-sm transition-all-smooth hover:shadow-md block"
                            >
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={tool.logo}
                                        alt={tool.name}
                                        width={36}
                                        height={36}
                                        className="rounded-lg object-cover"
                                        loading="lazy"
                                    />
                                    <div className="min-w-0">
                                        <h3 className="font-medium text-foreground text-sm truncate">{tool.name}</h3>
                                        <p className="text-xs text-muted-foreground">AI Tool</p>
                                    </div>
                                </div>
                            </motion.a>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Desktop Navigation Buttons */}
            <div className="hidden md:flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none">
                <button
                    onClick={scrollPrev}
                    className="pointer-events-auto -ml-4 w-8 h-8 bg-card rounded-full shadow-md flex items-center justify-center hover:bg-muted transition-colors"
                    aria-label="Previous tools"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                    onClick={scrollNext}
                    className="pointer-events-auto -mr-4 w-8 h-8 bg-card rounded-full shadow-md flex items-center justify-center hover:bg-muted transition-colors"
                    aria-label="Next tools"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default AIToolsCarousel;
