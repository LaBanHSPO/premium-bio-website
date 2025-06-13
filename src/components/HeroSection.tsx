
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
      {/* Cover Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="h-48 md:h-64 relative overflow-hidden"
      >
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </motion.div>

      {/* Avatar */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
      >
        <img
          src={avatar}
          alt={name}
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />
      </motion.div>

      {/* Profile Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="pt-20 text-center px-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{name}</h1>
        <p className="text-sm text-gray-600 opacity-70 max-w-sm mx-auto leading-relaxed">
          {tagline}
        </p>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="flex justify-center space-x-4 mt-6"
      >
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors"
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
