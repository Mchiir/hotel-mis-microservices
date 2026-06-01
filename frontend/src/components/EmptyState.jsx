export default function EmptyState({ title = 'No data', description }) {
  return (
    <div className="py-12 text-center text-slate-500">
      <p className="font-medium text-slate-700">{title}</p>
      {description && <p className="mt-1 text-sm">{description}</p>}
    </div>
  );
}
