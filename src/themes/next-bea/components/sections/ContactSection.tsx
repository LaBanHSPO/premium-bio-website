import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Download, Send } from 'lucide-react';

interface ContactSectionProps {
    contact: {
        heading: string;
        email: string;
        backgroundImage: string;
        profileImage: string;
        buttons: Array<{
            label: string;
            url: string;
            variant: 'primary' | 'secondary';
        }>;
    };
}

const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    return (
        <section className="relative py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={contact.backgroundImage}
                    alt="Contact background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="liquid-glass p-8 md:p-12 rounded-2xl"
                >
                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl font-serif font-semibold text-white text-center mb-8">
                        {contact.heading}
                    </h2>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                                required
                            />
                        </div>

                        <div>
                            <textarea
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={4}
                                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-sans font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                        >
                            <Send className="w-5 h-5" />
                            Send Message
                        </button>
                    </form>

                    {/* Quick Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        {contact.buttons.map((button, i) => (
                            <a
                                key={i}
                                href={button.url}
                                className={`flex-1 px-6 py-3 rounded-xl font-sans font-medium text-center transition-all hover:scale-[1.02] cursor-pointer ${
                                    button.variant === 'primary'
                                        ? 'bg-white/20 text-white hover:bg-white/30'
                                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                                } flex items-center justify-center gap-2`}
                            >
                                {button.variant === 'secondary' && <Download className="w-4 h-4" />}
                                {button.variant === 'primary' && <Mail className="w-4 h-4" />}
                                {button.label}
                            </a>
                        ))}
                    </div>

                    {/* Email */}
                    <p className="text-center text-white/70 text-sm font-sans mt-6">
                        Or email directly: <a href={`mailto:${contact.email}`} className="text-accent hover:underline">{contact.email}</a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;
