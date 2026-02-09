import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import type { VideoSection as VideoSectionType } from '@/lib/types';

interface VideoSectionProps {
    video: VideoSectionType;
}

const VideoSection: React.FC<VideoSectionProps> = ({ video }) => {
    const [playing, setPlaying] = useState(false);

    const getYoutubeEmbedUrl = (url: string) => {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/);
        return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
    };

    return (
        <section className="bg-secondary py-12 md:py-20 px-6 md:px-16 lg:px-24">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative rounded-2xl overflow-hidden aspect-video"
                >
                    {!playing ? (
                        <>
                            <img
                                src={video.thumbnailUrl}
                                alt="Video thumbnail"
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => setPlaying(true)}
                                className="absolute inset-0 flex items-center justify-center group"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-destructive flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                    <Play className="w-7 h-7 md:w-9 md:h-9 text-destructive-foreground ml-1" fill="currentColor" />
                                </div>
                            </button>
                        </>
                    ) : (
                        <iframe
                            src={getYoutubeEmbedUrl(video.videoUrl)}
                            className="w-full h-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="Video"
                        />
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default VideoSection;
