
import React from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AITool {
  id: number;
  name: string;
  logo: string;
  url: string;
}

interface AIToolsCarouselProps {
  tools: AITool[];
}

const AIToolsCarousel: React.FC<AIToolsCarouselProps> = ({ tools }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 }
    }
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              className="flex-[0_0_280px] min-w-0 mr-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bio-card rounded-xl p-4 shadow-sm transition-all-smooth hover:shadow-md block"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{tool.name}</h3>
                    <p className="text-sm text-gray-500">AI Tool</p>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Desktop Navigation Buttons */}
      <div className="hidden md:flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none">
        <button
          onClick={scrollPrev}
          className="pointer-events-auto -ml-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Previous tools"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={scrollNext}
          className="pointer-events-auto -mr-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Next tools"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AIToolsCarousel;
