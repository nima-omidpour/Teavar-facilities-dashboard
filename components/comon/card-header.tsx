export default function CardHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
        {icon}
      </div>
      <div>
        <h2 className="text-xl font-bold text-text-primary leading-none">
          {title}
        </h2>
        <p className="text-sm text-text-secondary mt-1">{description}</p>
      </div>
    </div>
  );
}
