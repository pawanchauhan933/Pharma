type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      {children}
    </div>
  );
};

export default Card;