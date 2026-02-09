import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ContactSection as ContactSectionType } from '@/lib/types';

interface ContactSectionProps {
    contact: ContactSectionType;
}

const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
    return (
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
            {/* Background Image with overlay */}
            <img
                src={contact.backgroundImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-secondary/60" />

            <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 py-16">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                    {/* Left: Text & Buttons */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="flex-1"
                    >
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-secondary-foreground mb-4">
                            {contact.heading}
                        </h2>
                        <div className="flex items-center gap-2 text-secondary-foreground/80 mb-8">
                            <Mail className="w-5 h-5" />
                            <span className="text-lg font-serif">{contact.email}</span>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {contact.buttons.map((btn, i) => (
                                <Button
                                    key={i}
                                    asChild
                                    variant={btn.variant === 'secondary' ? 'outline' : 'default'}
                                    className={`px-8 py-6 text-base font-serif rounded-lg ${
                                        btn.variant === 'secondary' 
                                            ? 'border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10' 
                                            : ''
                                    }`}
                                >
                                    <a href={btn.url} target="_blank" rel="noopener noreferrer">
                                        {btn.label}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="w-full md:w-2/5 flex-shrink-0"
                    >
                        <img
                            src={contact.profileImage}
                            alt="Contact"
                            className="w-full rounded-xl object-cover aspect-[3/4] shadow-xl"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
