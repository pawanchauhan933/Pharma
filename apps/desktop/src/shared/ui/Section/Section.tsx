import type { ReactNode } from "react";
import Card from "../Card";

type SectionProps = {
  title: string;
  children: ReactNode;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

const Section = ({
  title,
  description,
  actions,
  className = "",
  children,
}: SectionProps) => {
  return (
    <Card className={className}>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>

        {actions && <div>{actions}</div>}
      </div>

      {children}
    </Card>
  );
};

export default Section;