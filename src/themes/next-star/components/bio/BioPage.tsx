import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ProfileHeader from "./ProfileHeader";
import CategoryBadge from "./CategoryBadge";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import MiniProfile from "./MiniProfile";
import { useLanguage } from "@/i18n/LanguageContext";

import { profileData, products, findProductById, type Product } from "./data";



// Exports handled by re-exporting if needed, or just using imports.
// Original exports were: export { products, findProductById, profileData };
// Since we imported them, we can re-export them if other files rely on BioPage for them, but BioPage is likely a leaf.
// Actually, let's keep the export to be safe.
export { products, findProductById, profileData };

interface BioPageProps {
  productId?: string;
}

const BioPage = ({ productId }: BioPageProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isProfileVisible, setIsProfileVisible] = useState(true);

  // Find selected product from URL parameter
  const selectedProduct = productId ? findProductById(productId) : null;

  // Scroll to top when product changes
  useEffect(() => {
    if (selectedProduct) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedProduct]);

  const handleProductClick = (product: Product) => {
    if (product.externalLink) {
      window.open(product.externalLink, "_blank");
    } else if (product.detailType) {
      navigate(`/p/${product.id}`);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const toggleProfile = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mini Profile - shown when profile is hidden */}
      <AnimatePresence>
        {!isProfileVisible && !selectedProduct && (
          <MiniProfile
            name={profileData.name}
            avatarUrl={profileData.avatarUrl}
            onClick={toggleProfile}
          />
        )}
      </AnimatePresence>

      {/* Mobile Layout (stacked) / Desktop Layout (side by side) */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className={`flex flex-col lg:flex-row lg:gap-12 ${!isProfileVisible && !selectedProduct ? "justify-center" : ""}`}>
          {/* Left Sidebar - Profile (sticky on desktop) */}
          <AnimatePresence>
            {isProfileVisible && !selectedProduct && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="lg:w-80 lg:flex-shrink-0"
              >
                <div className="lg:sticky lg:top-12">
                  <ProfileHeader
                    name={profileData.name}
                    bio={profileData.bio}
                    avatarUrl={profileData.avatarUrl}
                    socials={profileData.socials}
                    onToggleProfile={toggleProfile}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Content - Products or Detail */}
          <AnimatePresence mode="wait">
            {selectedProduct ? (
              <motion.div
                key="detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1"
              >
                <ProductDetail product={selectedProduct} onBack={handleBack} />
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex-1 mt-10 lg:mt-0 ${!isProfileVisible ? "max-w-4xl mx-auto" : ""}`}
              >
                {/* Products Category */}
                <CategoryBadge label={t("products")} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {products.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      imageUrl={product.imageUrl}
                      title={t(product.titleKey as any)}
                      description={t(product.descriptionKey as any)}
                      price={product.price}
                      buttonText={t(product.buttonTextKey as any)}
                      isExternal={!!product.externalLink}
                      badge={product.badge}
                      badgeText={product.badge ? t(`badge${product.badge.charAt(0).toUpperCase() + product.badge.slice(1)}` as any) : undefined}
                      imageStyle={product.imageStyle}
                      onClick={() => handleProductClick(product)}
                    />
                  ))}
                </div>

                {/* Services Category */}
                <CategoryBadge label={t("services")} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {products.services.map((product) => (
                    <ProductCard
                      key={product.id}
                      imageUrl={product.imageUrl}
                      title={t(product.titleKey as any)}
                      description={t(product.descriptionKey as any)}
                      price={product.price}
                      buttonText={t(product.buttonTextKey as any)}
                      isExternal={!!product.externalLink}
                      badge={product.badge}
                      badgeText={product.badge ? t(`badge${product.badge.charAt(0).toUpperCase() + product.badge.slice(1)}` as any) : undefined}
                      imageStyle={product.imageStyle}
                      onClick={() => handleProductClick(product)}
                    />
                  ))}
                </div>

                {/* Consulting Category */}
                <CategoryBadge label={t("consulting")} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.consulting.map((product) => (
                    <ProductCard
                      key={product.id}
                      imageUrl={product.imageUrl}
                      title={t(product.titleKey as any)}
                      description={t(product.descriptionKey as any)}
                      price={product.price}
                      buttonText={t(product.buttonTextKey as any)}
                      isExternal={!!product.externalLink}
                      badge={product.badge}
                      badgeText={product.badge ? t(`badge${product.badge.charAt(0).toUpperCase() + product.badge.slice(1)}` as any) : undefined}
                      imageStyle={product.imageStyle}
                      onClick={() => handleProductClick(product)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm">
            {t("poweredBy")} <a href="https://sagozen.digital/" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors">SAGOZEN DIGITAL LLC</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BioPage;
