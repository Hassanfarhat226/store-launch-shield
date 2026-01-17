import { AlertTriangle } from "lucide-react";

interface WarningBoxProps {
  title: string;
  children: React.ReactNode;
}

const WarningBox = ({ title, children }: WarningBoxProps) => {
  return (
    <div className="warning-box">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-warning-foreground mb-1">{title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default WarningBox;
