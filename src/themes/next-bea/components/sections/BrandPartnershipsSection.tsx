import React from 'react';
import { motion } from 'framer-motion';
import type { BrandPartnership } from '@/lib/types';

interface BrandPartnershipsSectionProps {
    data: BrandPartnership;
}

const BrandPartnershipsSection: React.FC<BrandPartnershipsSectionProps> = ({ data }) => {
    // Repeat brands in 3 rows with different order for visual interest
    const row1 = data.brands;
    const row2 = [...data.brands].reverse();
    const [row3, setRow3] = React.useState(data.brands);

    React.useEffect(() => {
        setRow3([...data.brands].sort(() => 0.5 - Math.random()));
    }, [data.brands]);

    const brandFonts: Record<string, string> = {
        "People": "font-serif italic font-bold",
        "BRIT+CO.": "font-sans font-bold tracking-[0.25em] uppercase",
        "POPSUGAR.": "font-sans font-medium tracking-[0.3em] uppercase",
        "GLAMOUR": "font-serif font-bold tracking-[0.1em] uppercase",
    };

    const renderBrandRow = (brands: typeof data.brands, rowIndex: number) => (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: rowIndex * 0.15 }}
            className="flex items-center justify-center gap-8 md:gap-16 flex-wrap"
        >
            {brands.map((brand, i) => (
                <span
                    key={`${rowIndex}-${i}`}
                    className={`text-foreground text-lg md:text-2xl ${brandFonts[brand.name] || 'font-bold'}`}
                >
                    {brand.name}
                </span>
            ))}
        </motion.div>
    );

    return (
        <section className="bg-accent py-16 md:py-24 px-6 md:px-16">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-2xl md:text-4xl font-serif text-foreground text-center mb-12"
            >
                {data.title}
            </motion.h2>

            <div className="max-w-5xl mx-auto space-y-8">
                {renderBrandRow(row1, 0)}
                {renderBrandRow(row2, 1)}
                {renderBrandRow(row3, 2)}
            </div>
        </section>
    );
};

export default BrandPartnershipsSection;
