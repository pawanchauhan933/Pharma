import { forwardRef, type InputHTMLAttributes } from "react";
import FormField from "../FormField";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <FormField
        label={label}
        required={required}
        helperText={helperText}
        error={error}
      >
        <input
          ref={ref}
          {...props}
          className={`w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${className}`}
        />
      </FormField>
    );
  }
);

Input.displayName = "Input";

export default Input;