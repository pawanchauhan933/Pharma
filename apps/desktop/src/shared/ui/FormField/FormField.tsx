import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  children: ReactNode;
  error?: string;
  helperText?: string;
  required?: boolean;
};

const FormField = ({
  label,
  children,
  error,
  helperText,
  required = false,
}: FormFieldProps) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      {children}

      {error ? (
        <p className="text-xs text-red-500">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export default FormField;