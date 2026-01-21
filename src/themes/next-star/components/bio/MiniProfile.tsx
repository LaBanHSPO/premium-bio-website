import { motion } from "framer-motion";

interface MiniProfileProps {
  name: string;
  avatarUrl: string;
  onClick: () => void;
}

const MiniProfile = ({ name, avatarUrl, onClick }: MiniProfileProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      onClick={onClick}
      className="fixed top-4 left-4 z-40 flex items-center gap-3 px-3 py-2 rounded-full bg-card border border-border shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-border">
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-sm font-medium text-foreground pr-1">{name}</span>
    </motion.button>
  );
};

export default MiniProfile;
