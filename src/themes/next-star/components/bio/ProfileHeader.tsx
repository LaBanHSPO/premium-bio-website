import {
  Instagram,
  Youtube,
  Linkedin,
  Globe,
  Twitter,
  X,
  Mail,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";

// TikTok icon component since Lucide doesn't have it
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

interface ProfileHeaderProps {
  name: string;
  bio: string;
  avatarUrl: string;
  socials?: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    link?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  onToggleProfile?: () => void;
}

const ProfileHeader = ({
  name,
  bio,
  avatarUrl,
  socials,
  onToggleProfile,
}: ProfileHeaderProps) => {
  return (
    <div className="relative flex flex-col items-center text-center space-y-5">
      {/* Settings Controls - Top */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSelector />
        </div>
        {onToggleProfile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleProfile}
            className="w-9 h-9 rounded-full"
            aria-label="Hide profile"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Avatar - larger on desktop */}
      <div className="w-32 h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden ring-2 ring-border shadow-lg">
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name */}
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">{name}</h1>

      {/* Bio */}
      <p className="text-muted-foreground text-sm md:text-base">{bio}</p>

      {/* Social Icons */}
      {socials && (
        <div className="flex items-center gap-3">
          {socials.instagram && (
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}
          {socials.tiktok && (
            <a
              href={socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
          )}
          {socials.youtube && (
            <a
              href={socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
            >
              <Youtube className="w-4 h-4" />
            </a>
          )}
          {socials.link && (
            <a
              href={socials.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
          {socials.linkedin && (
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {socials.twitter && (
            <a
              href={socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
          {socials.email && (
            <a
              href={`mailto:${socials.email}`}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
