import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { roomApi } from '../api/room.api.js';
import { useAuth } from '../hooks/useAuth.jsx';
import { ROLES } from '../utils/constants.js';
import Table from '../components/Table.jsx';
import Badge from '../components/Badge.jsx';
import { usePagination } from '../hooks/usePagination.js';
import { formatCurrency } from '../utils/formatCurrency.js';

export default function RoomsPage() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const { page, setPage, totalPages, updateFromResponse } = usePagination();

  const load = async () => {
    setLoading(true);
    try {
      const res = await roomApi.list({ page, limit: 10, status: status || undefined });
      setRooms(res.data.rooms);
      updateFromResponse(res.data.pagination);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [page, status]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Rooms</h1>
        {user.role === ROLES.ADMIN && (
          <Link to="/rooms/create" className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm text-white hover:bg-primary-700">
            <Plus size={16} /> Add Room
          </Link>
        )}
      </div>
      <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="rounded-lg border px-3 py-2 text-sm">
        <option value="">All statuses</option>
        {['AVAILABLE', 'RESERVED', 'OCCUPIED', 'MAINTENANCE'].map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <Table
        columns={[
          { key: 'num', label: 'Room #' },
          { key: 'type', label: 'Type' },
          { key: 'floor', label: 'Floor' },
          { key: 'price', label: 'Price/night' },
          { key: 'status', label: 'Status' },
          { key: 'actions', label: '' },
        ]}
        data={rooms}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        renderRow={(row) => (
          <>
            <td className="px-4 py-3 font-medium">{row.roomNumber}</td>
            <td className="px-4 py-3">{row.roomType}</td>
            <td className="px-4 py-3">{row.floor}</td>
            <td className="px-4 py-3">{formatCurrency(row.pricePerNight)}</td>
            <td className="px-4 py-3"><Badge label={row.status} /></td>
            <td className="px-4 py-3">
              <Link to={`/rooms/${row.id}`} className="text-primary-600 hover:underline">View</Link>
            </td>
          </>
        )}
      />
    </div>
  );
}
