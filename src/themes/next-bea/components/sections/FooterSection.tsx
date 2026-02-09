import React from 'react';
import { Youtube } from 'lucide-react';
import type { SocialLink } from '@/lib/types';

interface FooterSectionProps {
    socialLinks: SocialLink[];
}

const FooterSection: React.FC<FooterSectionProps> = ({ socialLinks }) => {
    return (
        <footer className="bg-secondary py-10 text-center">
            <div className="flex justify-center gap-4 mb-4">
                {socialLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                    >
                        <Youtube className="w-6 h-6" />
                    </a>
                ))}
            </div>
            <p className="text-secondary-foreground/60 text-sm font-serif">
                ©{new Date().getFullYear()} All Rights Reserved
            </p>
            <p className="text-secondary-foreground/40 text-xs mt-1 font-serif">
                Powered by SiteHub
            </p>
        </footer>
    );
};

export default FooterSection;
