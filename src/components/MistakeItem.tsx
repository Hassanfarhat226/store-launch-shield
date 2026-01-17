interface MistakeItemProps {
  children: React.ReactNode;
}

const MistakeItem = ({ children }: MistakeItemProps) => {
  return (
    <li className="flex items-start gap-3 py-2">
      <span className="text-muted-foreground mt-1">—</span>
      <span className="text-muted-foreground">{children}</span>
    </li>
  );
};

export default MistakeItem;
