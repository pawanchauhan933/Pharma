type BadgeProps = {
  children: React.ReactNode;
  variant?: "success" | "danger" | "warning" | "info" | "default";
};

const variants = {
  success:
    "bg-green-100 text-green-700 border border-green-200",

  danger:
    "bg-red-100 text-red-700 border border-red-200",

  warning:
    "bg-yellow-100 text-yellow-700 border border-yellow-200",

  info:
    "bg-blue-100 text-blue-700 border border-blue-200",

  default:
    "bg-slate-100 text-slate-700 border border-slate-200",
};

const Badge = ({
  children,
  variant = "default",
}: BadgeProps) => {
  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-2.5
        py-1
        text-xs
        font-semibold
        ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;