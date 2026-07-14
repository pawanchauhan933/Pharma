import type { ButtonHTMLAttributes, ReactNode } from "react";
type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "danger" | "secondary" | "ghost";
  "aria-label": string;
};
const variants = {
  primary: "text-blue-600 hover:bg-blue-100 hover:text-blue-700",
  danger: "text-red-600 hover:bg-red-100 hover:text-red-700",
  secondary: "text-slate-600 hover:bg-slate-100 hover:text-slate-700",
  ghost: "text-slate-500 hover:bg-slate-100 hover:text-slate-700",
};
const IconButton = ({
  children,
  variant = "ghost",
  className = "",
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      className={` inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 ${variants[variant]} ${className} `}
      {...props}
    >
      {" "}
      {children}{" "}
    </button>
  );
};
export default IconButton;
