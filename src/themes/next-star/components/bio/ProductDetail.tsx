import { ArrowLeft, Mail, Share2, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/i18n/LanguageContext";
import { toast } from "sonner";
import type { Product } from "./data";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail = ({ product, onBack }: ProductDetailProps) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    // Construct the detail URL
    const url = `${window.location.origin}?product=${product.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success(t("linkCopied"));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  // Render content based on detail type
  const renderContent = () => {
    switch (product.detailType) {
      case "whiteLabel":
        return <WhiteLabelContent />;
      case "personalBrand":
        return <PersonalBrandContent />;
      case "digitalProducts":
        return <DigitalProductsContent />;
      default:
        return <DefaultContent product={product} />;
    }
  };

  return (
    <div className="flex-1">
      {/* Hero Image with Back Button */}
      <div className="relative w-full bg-foreground dark:bg-zinc-900 rounded-2xl overflow-hidden mb-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-background dark:bg-zinc-800 flex items-center justify-center hover:bg-muted dark:hover:bg-zinc-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground dark:text-white" />
        </button>

        {/* Share Button */}
        <button
          onClick={handleCopyLink}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background dark:bg-zinc-800 flex items-center justify-center hover:bg-muted dark:hover:bg-zinc-700 transition-colors"
        >
          {copied ? (
            <Check className="w-5 h-5 text-[hsl(170,100%,19%)]" />
          ) : (
            <Share2 className="w-5 h-5 text-foreground dark:text-white" />
          )}
        </button>

        {/* Product Hero Image */}
        <div className="w-full aspect-[16/9] md:aspect-[2/1] flex items-center justify-center p-8">
          <img
            src={product.imageUrl}
            alt={t(product.titleKey as any)}
            className="max-h-full max-w-[60%] object-contain rounded-lg"
          />
        </div>

        {/* Product Title on Image */}
        <div className="px-6 pb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-background dark:text-foreground">
            {t(product.titleKey as any)}
          </h1>
        </div>
      </div>

      {renderContent()}

      {/* Footer spacing */}
      <div className="h-10" />
    </div>
  );
};

// White Label Mental Health App Content
const WhiteLabelContent = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Feature Image */}
      <div className="w-full rounded-xl overflow-hidden bg-muted">
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop"
          alt="White Label App Preview"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Description */}
      <div className="space-y-4 text-foreground">
        <p className="text-lg font-medium">{t("whiteLabelDescription")}</p>
        <Separator />
        <p>{t("whiteLabelFeatures")}</p>
        <p>{t("whiteLabelPerfect")}</p>
        <Separator />
        <div className="space-y-2 text-muted-foreground">
          <p className="font-medium text-foreground">{t("whiteLabelTech")}</p>
          <p>{t("whiteLabelDelivery")}</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-8 p-6 border border-border rounded-xl bg-muted/30">
        <Button
          className="w-full bg-[hsl(170,100%,19%)] hover:bg-[hsl(170,100%,15%)] text-white rounded-full py-6"
          onClick={() => window.open("mailto:hello@sagozen.digital", "_blank")}
        >
          {t("contactUs")}
        </Button>
      </div>
    </div>
  );
};

// Personal Brand Challenge Content
const PersonalBrandContent = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="space-y-4 text-foreground">
        <p className="font-medium">{t("statsIntro")}</p>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(170,100%,19%)] font-bold">•</span>
            <span>{t("stat1")}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(170,100%,19%)] font-bold">•</span>
            <span>{t("stat2")}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(170,100%,19%)] font-bold">•</span>
            <span>{t("stat3")}</span>
          </li>
        </ul>
      </div>

      <Separator />

      {/* What You'll Learn */}
      <div className="space-y-4">
        <p className="font-medium text-foreground">{t("personalBrandIntro")}</p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(170,100%,19%)]">✓</span>
            <span>{t("personalBrand1")}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(170,100%,19%)]">✓</span>
            <span>{t("personalBrand2")}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(170,100%,19%)]">✓</span>
            <span>{t("personalBrand3")}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(170,100%,19%)]">✓</span>
            <span>{t("personalBrand4")}</span>
          </li>
        </ul>
      </div>

      {/* Contact Form */}
      <div className="mt-8 space-y-4">
        <p className="font-medium">{t("enrollBelow")}</p>
        <Button
          className="w-full bg-[hsl(170,100%,19%)] hover:bg-[hsl(170,100%,15%)] text-white rounded-full py-6"
          onClick={() => window.open("https://sagozen.digital/discord", "_blank")}
        >
          {t("joinCommunity")}
        </Button>
      </div>
    </div>
  );
};

// Digital Products Content
const DigitalProductsContent = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Description */}
      <p className="text-lg text-foreground">{t("digitalProductsDescription")}</p>

      <Separator />

      {/* What's Included */}
      <div className="space-y-4">
        <p className="font-medium text-foreground">{t("digitalProductsIntro")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <span className="text-2xl mb-2 block">🎨</span>
            <p className="font-medium">{t("digitalProduct1")}</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <span className="text-2xl mb-2 block">📚</span>
            <p className="font-medium">{t("digitalProduct2")}</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <span className="text-2xl mb-2 block">📖</span>
            <p className="font-medium">{t("digitalProduct3")}</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <span className="text-2xl mb-2 block">🎁</span>
            <p className="font-medium">{t("digitalProduct4")}</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-8 space-y-4">
        <p className="font-medium">{t("enrollBelow")}</p>
        <Button
          className="w-full bg-[hsl(170,100%,19%)] hover:bg-[hsl(170,100%,15%)] text-white rounded-full py-6"
          onClick={() => window.open("https://sagozen.digital/discord", "_blank")}
        >
          {t("joinCommunity")}
        </Button>
      </div>
    </div>
  );
};

// Default fallback content
const DefaultContent = ({ product }: { product: Product }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <p className="text-foreground">{t(product.descriptionKey as any)}</p>
      {product.price && (
        <p className="text-[hsl(170,100%,19%)] font-bold text-2xl">{product.price}</p>
      )}
    </div>
  );
};

export default ProductDetail;
