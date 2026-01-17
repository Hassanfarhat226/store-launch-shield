import { Square } from "lucide-react";

interface ChecklistItemProps {
  children: React.ReactNode;
}

const ChecklistItem = ({ children }: ChecklistItemProps) => {
  return (
    <div className="checklist-item">
      <Square className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
      <span className="text-foreground">{children}</span>
    </div>
  );
};

export default ChecklistItem;
