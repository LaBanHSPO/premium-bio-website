import { ExternalLink } from "lucide-react";

const PromoFooter = () => {
  return (
    <a
      href="https://sitehub.bio"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
    >
      <span>Want this bio FREE?</span>
      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
    </a>
  );
};

export default PromoFooter;
