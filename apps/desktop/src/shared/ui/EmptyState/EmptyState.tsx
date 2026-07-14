type EmptyStateProps = {
  title: string;
  description: string;
};

const EmptyState = ({
  title,
  description,
}: EmptyStateProps) => {
  return (
    <div className="rounded-xl border border-dashed p-12 text-center">
      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;