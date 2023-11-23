import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

export interface AnimationTailwindClasses {
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
}
interface RadixProps
  extends Dialog.DialogProps,
    Pick<
      Dialog.DialogContentProps,
      | "onOpenAutoFocus"
      | "onCloseAutoFocus"
      | "onEscapeKeyDown"
      | "onPointerDownOutside"
      | "onInteractOutside"
    > {}

interface Props {
  children?: React.ReactNode;
  customFooter: React.ReactNode;
  closable?: boolean;
  description?: string;
  hideFooter?: boolean;
  alignFooter?: "right" | "left";
  layout?: "horizontal" | "vertical";
  icon?: React.ReactNode;
  loading?: boolean;
  onCancel?: any;
  cancelText?: string;
  onConfirm?: any;
  confirmText?: string;
  showIcon?: boolean;
  footerBackground?: boolean;
  title?: string | React.ReactNode;
  variant?: "danger" | "warning" | "success";
  visible?: boolean;
  size?: "tiny" | "small" | "medium" | "large" | "xlarge" | "xxlarge";
  style?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  className?: string;
  overlayClassName?: string;
  transition?: AnimationTailwindClasses;
  transitionOverlay?: AnimationTailwindClasses;
  triggerElement?: React.ReactNode;
  header?: React.ReactNode;
}

type ModalProps = RadixProps & Props;

export const Space = ({ className, style, children }: any) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

const Modal = ({
  children,
  customFooter = undefined,
  closable,
  description,
  hideFooter = false,
  alignFooter = "left",
  layout = "horizontal",
  loading = false,
  cancelText = "Cancel",
  onConfirm = () => {},
  onCancel = () => {},
  confirmText = "Confirm",
  showIcon = false,
  title,
  footerBackground,
  icon,
  variant = "success",
  visible = false,
  size = "large",
  style,
  overlayStyle,
  contentStyle,
  className = "",
  overlayClassName,
  triggerElement,
  header,
  ...props
}: ModalProps) => {
  const [open, setOpen] = useState(visible ? visible : false);

  useEffect(() => {
    setOpen(visible);
  }, [visible]);

  const footerContent = customFooter ? (
    customFooter
  ) : (
    <Space
      className="flex w-full space-x-2"
      style={{
        width: "100%",
        justifyContent:
          layout === "vertical"
            ? "center"
            : alignFooter === "right"
            ? "flex-end"
            : "flex-start",
      }}
    >
      <Button variant="default" onClick={onCancel} disabled={loading}>
        {cancelText}
      </Button>
      <Button
        variant={variant === "danger" ? "destructive" : "default"}
        onClick={onCancel}
        disabled={loading}
      >
        {cancelText}
      </Button>
    </Space>
  );

  function handleOpenChange(open: boolean) {
    if (visible !== undefined && !open) {
      onCancel;
    } else setOpen(open);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      {triggerElement && <Dialog.Trigger>{triggerElement}</Dialog.Trigger>}

      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
        {/* <Dialog.Overlay className={__styles.scroll_overlay}> */}
        <Dialog.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full"
          )}
          onInteractOutside={props.onInteractOutside}
          onEscapeKeyDown={props.onEscapeKeyDown}
        >
          {header && (
            <div
              className={`    bg-scale-200 dark:bg-scale-400
              space-y-1 py-3 px-4 sm:px-5
              border-b border-scale-300 dark:border-scale-500`}
            >
              {header}
            </div>
          )}

          {children}

          {!hideFooter && (
            <div
              className={` flex justify-end gap-2
                py-3 px-5
                border-t border-scale-300 dark:border-scale-500`}
            >
              {footerContent}
            </div>
          )}
        </Dialog.Content>
        {/* </Dialog.Overlay> */}
      </Dialog.Portal>
    </Dialog.Root>
  );
};

function Content({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn(`px-5`, className)}>{children}</div>;
}

export function Separator() {
  return (
    <div
      className={` w-full
      h-px
      my-2
      bg-scale-300 dark:bg-scale-500`}
    ></div>
  );
}

Modal.Content = Content;
Modal.Separator = Separator;

export default Modal;
