interface CategoryBadgeProps {
  label: string;
}

const CategoryBadge = ({ label }: CategoryBadgeProps) => {
  return (
    <div className="flex justify-center w-full py-4">
      <span className="inline-block px-6 py-2 bg-background border border-border text-foreground text-sm font-semibold rounded-full shadow-sm">
        {label}
      </span>
    </div>
  );
};

export default CategoryBadge;
