import { forwardRef, type SelectHTMLAttributes } from "react";
import FormField from "../FormField";

type Option = {
  label: string;
  value: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Option[];
  error?: string;
  helperText?: string;
  required?: boolean;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
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
        <select
          ref={ref}
          {...props}
          className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${className}`}
        >
          <option value="">Select</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>
    );
  }
);

Select.displayName = "Select";

export default Select;