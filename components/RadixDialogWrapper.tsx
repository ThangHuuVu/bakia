import * as DialogPrimitive from "@radix-ui/react-dialog";

export function Root({
  children,
  overlayProps,
  ...props
}: DialogPrimitive.DialogProps & { overlayProps: DialogPrimitive.DialogOverlayProps }) {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Overlay {...overlayProps} />
      {children}
    </DialogPrimitive.Root>
  );
}

export function DialogContent({ children, ...props }: DialogPrimitive.DialogContentProps) {
  return <DialogPrimitive.Content {...props}>{children}</DialogPrimitive.Content>;
}
export function DialogTitle({ children, ...props }: DialogPrimitive.DialogTitleProps) {
  return <DialogPrimitive.Title {...props}>{children}</DialogPrimitive.Title>;
}
export function DialogDescription({ children, ...props }: DialogPrimitive.DialogDescriptionProps) {
  return <DialogPrimitive.Description {...props}>{children}</DialogPrimitive.Description>;
}

export const Dialog = Root;
export const DialogClose = DialogPrimitive.Close;
