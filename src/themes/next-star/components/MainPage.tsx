"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ProfileHeader from "./bio/ProfileHeader";
import CategoryBadge from "./bio/CategoryBadge";
import ProductCard from "./bio/ProductCard";
import ProductDetail from "./bio/ProductDetail";
import MiniProfile from "./bio/MiniProfile";
import PromoFooter from "./bio/PromoFooter";
import { config, findProductById, Product } from "../config";

import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";

// Inner component to use the hook
const MainPageContent = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const [isProfileVisible, setIsProfileVisible] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined,
  );

  // Sync state with URL parameter
  useEffect(() => {
    const productId = searchParams.get("product");
    if (productId) {
      const found = findProductById(productId);
      if (found) {
        setSelectedProduct(found);
        setIsProfileVisible(false); // Make sure profile is hidden when showing detailed view
      }
    } else {
      setSelectedProduct(undefined);
      setIsProfileVisible(true);
    }
  }, [searchParams]);

  const handleProductClick = (product: Product) => {
    if (product.externalLink) {
      window.open(product.externalLink, "_blank");
    } else if (product.detailType) {
      router.push(`?product=${product.id}`);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  const toggleProfile = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence>
        {!isProfileVisible && !selectedProduct && (
          <MiniProfile
            name={config.profile.name}
            avatarUrl={config.profile.avatarUrl}
            onClick={toggleProfile}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div
          className={`flex flex-col lg:flex-row lg:gap-12 ${!isProfileVisible && !selectedProduct ? "justify-center" : ""}`}
        >
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
                    name={config.profile.name}
                    bio={config.profile.bio}
                    avatarUrl={config.profile.avatarUrl}
                    socials={config.profile.socials}
                    onToggleProfile={toggleProfile}
                  />
                  <div className="hidden lg:flex justify-center mt-8">
                    <PromoFooter />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                <CategoryBadge label={t("products")} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {config.products.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      imageUrl={product.imageUrl}
                      title={t(product.titleKey)}
                      description={t(product.descriptionKey)}
                      price={product.price}
                      buttonText={t(product.buttonTextKey)}
                      isExternal={!!product.externalLink}
                      badge={product.badge}
                      badgeText={
                        product.badge
                          ? t(
                            `badge${product.badge.charAt(0).toUpperCase() + product.badge.slice(1)}` as any,
                          )
                          : undefined
                      }
                      onClick={() => handleProductClick(product)}
                    />
                  ))}
                </div>

                <CategoryBadge label={t("services")} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {config.products.services.map((product) => (
                    <ProductCard
                      key={product.id}
                      imageUrl={product.imageUrl}
                      title={t(product.titleKey)}
                      description={t(product.descriptionKey)}
                      price={product.price}
                      buttonText={t(product.buttonTextKey)}
                      isExternal={!!product.externalLink}
                      badge={product.badge}
                      badgeText={
                        product.badge
                          ? t(
                            `badge${product.badge.charAt(0).toUpperCase() + product.badge.slice(1)}` as any,
                          )
                          : undefined
                      }
                      onClick={() => handleProductClick(product)}
                    />
                  ))}
                </div>

                <CategoryBadge label={t("consulting")} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {config.products.consulting.map((product) => (
                    <ProductCard
                      key={product.id}
                      imageUrl={product.imageUrl}
                      title={t(product.titleKey)}
                      description={t(product.descriptionKey)}
                      price={product.price}
                      buttonText={t(product.buttonTextKey)}
                      isExternal={!!product.externalLink}
                      badge={product.badge}
                      badgeText={
                        product.badge
                          ? t(
                            `badge${product.badge.charAt(0).toUpperCase() + product.badge.slice(1)}` as any,
                          )
                          : undefined
                      }
                      onClick={() => handleProductClick(product)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-16 text-center space-y-3">
          <div className="lg:hidden">
            <PromoFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MainPage() {
  return (
    <LanguageProvider>
      <Suspense
        fallback={
          <div className="min-h-screen bg-background flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <MainPageContent />
      </Suspense>
    </LanguageProvider>
  );
}
