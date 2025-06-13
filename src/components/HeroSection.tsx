
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Twitter, Mail, Youtube } from 'lucide-react';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

interface HeroSectionProps {
  name: string;
  tagline: string;
  avatar: string;
  coverImage: string;
  socialLinks: SocialLink[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  name, 
  tagline, 
  avatar, 
  coverImage, 
  socialLinks 
}) => {
  const getIcon = (iconName: string) => {
    const icons = {
      Globe: Globe,
      Twitter: Twitter,
      Mail: Mail,
      Youtube: Youtube,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Globe;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="relative">
      {/* Cover Image with Professional Blur Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="h-64 md:h-80 relative overflow-hidden"
      >
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* Professional Gradient + Blur Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
        <div className="absolute bottom-0 left-0 right-0 h-32 backdrop-blur-sm bg-gradient-to-t from-black/40 to-transparent" />
      </motion.div>

      {/* Avatar with Enhanced Shadow */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
      >
        <div className="relative">
          <img
            src={avatar}
            alt={name}
            className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-2xl"
          />
          {/* Additional glow effect */}
          <div className="absolute inset-0 rounded-full bg-white/20 blur-sm -z-10 scale-110"></div>
        </div>
      </motion.div>

      {/* Profile Info with Better Spacing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="pt-24 text-center px-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{name}</h1>
        <div className="max-w-xs mx-auto mb-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            {tagline}
          </p>
        </div>
      </motion.div>

      {/* Social Links with Enhanced Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="flex justify-center space-x-4 mt-2"
      >
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-gray-900 hover:shadow-xl transition-all duration-300"
            aria-label={link.name}
          >
            {getIcon(link.icon)}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroSection;
