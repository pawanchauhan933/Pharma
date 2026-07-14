import { forwardRef, type TextareaHTMLAttributes } from "react";
import FormField from "../FormField";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, required, className = "", ...props }, ref) => {
    return (
      <FormField
        label={label}
        required={required}
        helperText={helperText}
        error={error}
      >
        <textarea
          ref={ref}
          {...props}
          className={`w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${className}`}
        />
      </FormField>
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
