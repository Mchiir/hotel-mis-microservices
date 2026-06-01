import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { reservationApi } from '../api/reservation.api.js';
import Table from '../components/Table.jsx';
import Badge from '../components/Badge.jsx';
import { formatDate } from '../utils/formatDate.js';

export default function CheckOutPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await reservationApi.list({ status: 'CHECKED_IN', limit: 50 });
      setItems(res.data.reservations);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCheckOut = async (id) => {
    try {
      await reservationApi.checkOut(id);
      toast.success('Guest checked out');
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Check-Out</h1>
      <Table
        columns={[
          { key: 'id', label: 'Reservation' },
          { key: 'room', label: 'Room' },
          { key: 'checkOut', label: 'Check-out Date' },
          { key: 'status', label: 'Status' },
          { key: 'action', label: '' },
        ]}
        data={items}
        loading={loading}
        emptyTitle="No guests to check out"
        renderRow={(row) => (
          <>
            <td className="px-4 py-3 font-mono text-xs">{row.id.slice(-8)}</td>
            <td className="px-4 py-3">{row.roomId.slice(-6)}</td>
            <td className="px-4 py-3">{formatDate(row.checkOutDate)}</td>
            <td className="px-4 py-3"><Badge label={row.status} /></td>
            <td className="px-4 py-3">
              <button type="button" onClick={() => handleCheckOut(row.id)} className="rounded-lg bg-primary-600 px-3 py-1 text-sm text-white">Check Out</button>
            </td>
          </>
        )}
      />
    </div>
  );
}
