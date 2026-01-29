import { ExternalLink } from "lucide-react";

const PromoFooter = () => {
  return (
    <a
      href="https://Sagozen.digital/sitehub"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
    >
      <span>Want this bio FREE</span>
      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
};

export default PromoFooter;
