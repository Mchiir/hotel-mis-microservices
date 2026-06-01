import Loader from './Loader.jsx';
import EmptyState from './EmptyState.jsx';
import Pagination from './Pagination.jsx';

export default function Table({
  columns,
  data,
  loading,
  emptyTitle,
  page,
  totalPages,
  onPageChange,
  renderRow,
}) {
  if (loading) return <Loader />;

  if (!data?.length) {
    return <EmptyState title={emptyTitle || 'No records found'} />;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left font-medium text-slate-600"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50">
                {renderRow(row)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {onPageChange && (
        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </>
  );
}
