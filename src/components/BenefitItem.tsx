import { Check } from "lucide-react";

interface BenefitItemProps {
  children: React.ReactNode;
}

const BenefitItem = ({ children }: BenefitItemProps) => {
  return (
    <li className="flex items-start gap-3 py-2">
      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
      <span className="text-foreground">{children}</span>
    </li>
  );
};

export default BenefitItem;
