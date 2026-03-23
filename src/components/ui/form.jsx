import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const FormFieldContext = React.createContext({});
const FormItemContext = React.createContext({});

const FormField = ({ ...props }) => <FormFieldContext.Provider value={{ name: props.name }}>{props.render({ field: { name: props.name } })}</FormFieldContext.Provider>;

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  return { id: `${fieldContext.name}-${itemContext.id}`, name: fieldContext.name, formItemId: `${fieldContext.name}-${itemContext.id}-form-item`, formDescriptionId: `${fieldContext.name}-${itemContext.id}-form-item-description`, formMessageId: `${fieldContext.name}-${itemContext.id}-form-item-message` };
};

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId();
  return <FormItemContext.Provider value={{ id }}><div ref={ref} className={cn("space-y-2", className)} {...props} /></FormItemContext.Provider>;
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { formItemId } = useFormField();
  return <Label ref={ref} className={cn(className)} htmlFor={formItemId} {...props} />;
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { formItemId, formDescriptionId, formMessageId } = useFormField();
  return <Slot ref={ref} id={formItemId} aria-describedby={`${formDescriptionId} ${formMessageId}`} {...props} />;
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return <p ref={ref} id={formDescriptionId} className={cn("text-sm text-muted-foreground", className)} {...props} />;
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { formMessageId } = useFormField();
  return children ? <p ref={ref} id={formMessageId} className={cn("text-sm font-medium text-destructive", className)} {...props}>{children}</p> : null;
});
FormMessage.displayName = "FormMessage";

export { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, useFormField };
