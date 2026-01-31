export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`container px-4 md:px-8  mx-auto my-10 ${className}`}>
      {children}
    </div>
  );
}
