import { Button } from "./button";
import { Plus, type LucideIcon } from "lucide-react";
export interface ActionButtonProps {
  onClick?: () => void;
  label: string;
  icon?: LucideIcon;
}
const AddAction = ({
  onClick,
  label,
  icon: Icon = Plus,
}: ActionButtonProps) => {
  return (
    <Button className=" h-10" variant="default" onClick={onClick}>
      <Icon className="size-5" />
      <span> {label}</span>
    </Button>
  );
};

export { AddAction };
