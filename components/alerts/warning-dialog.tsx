import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/alerts/alert-dialog";
import { X, AlertTriangle } from "lucide-react";
type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  onClose?: () => void;
  onConfirm?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
};
export default function WarningDialog({
  isOpen,
  setIsOpen,
  title,
  description,
  onClose,
  onConfirm,
  disabled,
  children,
}: Props) {
  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <div className="flex justify-end items-start">
          <AlertDialogTrigger
            className="hover:text-red-500"
            onClick={handleClose}>
            <X />
          </AlertDialogTrigger>
        </div>
        <AlertDialogHeader>
          <div className="flex items-center justify-center my-2">
            <div className="bg-red-100 rounded-full p-4">
              <AlertTriangle size={48} className="text-red-500" />
            </div>
          </div>
          <AlertDialogTitle className="text-center text-2xl">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {children && <div className="mt-4">{children}</div>}
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={disabled}
            className="bg-red-500 hover:bg-red-600">
            Continue
          </AlertDialogAction>
          <AlertDialogAction className="bg-green-500" onClick={handleClose}>
            Cancel
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
