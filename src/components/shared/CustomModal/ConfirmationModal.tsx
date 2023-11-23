import {
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import Modal from "./Modal";
import { Button } from "@/components/ui/button";

export interface ConfirmationModalProps {
  visible: boolean;
  danger?: boolean;
  loading?: boolean;
  header: string | JSX.Element;
  description?: string;
  size?: "small" | "tiny" | "medium" | "large";
  buttonLabel: string;
  buttonLoadingLabel?: string;
  buttonDisabled?: boolean;
  onSelectCancel: () => void;
  onSelectConfirm: () => void;
}

export default function ConfirmationModal({
  visible = false,
  loading: loading_ = false,
  danger = false,
  header = "",
  description = "",
  size = "small",
  buttonLabel = "",
  buttonLoadingLabel = "",
  buttonDisabled = false,
  onSelectCancel = () => {},
  onSelectConfirm = () => {},
  children,
}: PropsWithChildren<ConfirmationModalProps>) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (visible) {
      setLoading(false);
    }
  }, [visible]);

  useEffect(() => {
    setLoading(loading_);
  }, [loading_]);

  const onConfirm: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    onSelectConfirm();
  };

  return (
    <Modal
      layout="vertical"
      description={description}
      size={size}
      visible={visible}
      header={header}
      onCancel={onSelectCancel}
      customFooter={
        <>
          <div className="flex justify-end w-full items-center space-x-3">
            <Button
              variant="default"
              disabled={loading}
              onClick={onSelectCancel}
            >
              Cancel
            </Button>
            <Button
              variant={danger ? "destructive" : "default"}
              disabled={loading || buttonDisabled}
              onClick={onConfirm}
            >
              {loading ? buttonLoadingLabel : buttonLabel}
            </Button>
          </div>
        </>
      }
    >
      {children}
    </Modal>
  );
}
