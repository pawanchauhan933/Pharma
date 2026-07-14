import { forwardRef, type InputHTMLAttributes } from "react";
import FormField from "../FormField";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helperText?: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    return (
      <FormField label="" helperText={helperText} error={error}>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            ref={ref}
            type="checkbox"
            {...props}
            className={`h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 ${className}`}
          />

          <span className="text-sm font-medium text-slate-700">{label}</span>
        </label>
      </FormField>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
