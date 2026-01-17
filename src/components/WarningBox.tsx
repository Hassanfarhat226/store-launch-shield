import { AlertTriangle } from "lucide-react";

interface WarningBoxProps {
  title: string;
  children: React.ReactNode;
}

const WarningBox = ({ title, children }: WarningBoxProps) => {
  return (
    <div className="warning-box">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-primary-foreground flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-primary-foreground mb-1">{title}</p>
          <p className="text-sm text-primary-foreground/90 leading-relaxed">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default WarningBox;
