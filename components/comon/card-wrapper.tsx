export default function CardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border-muted bg-bg-card/50 p-8 shadow-sm">
      {children}
    </div>
  );
}
