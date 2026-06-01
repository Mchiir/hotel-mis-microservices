import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { reservationApi } from '../api/reservation.api.js';
import { guestApi } from '../api/guest.api.js';
import { roomApi } from '../api/room.api.js';
import Table from '../components/Table.jsx';
import Modal from '../components/Modal.jsx';
import FormInput from '../components/FormInput.jsx';
import Badge from '../components/Badge.jsx';
import { usePagination } from '../hooks/usePagination.js';
import { formatDate, toInputDate } from '../utils/formatDate.js';

export default function ReservationsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    guestId: '',
    roomId: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    status: 'CONFIRMED',
  });
  const { page, setPage, totalPages, updateFromResponse } = usePagination();

  const load = async () => {
    setLoading(true);
    try {
      const res = await reservationApi.list({ page, limit: 10 });
      setItems(res.data.reservations);
      updateFromResponse(res.data.pagination);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [page]);

  const openCreate = async () => {
    try {
      const [g, r] = await Promise.all([
        guestApi.list({ limit: 100 }),
        roomApi.list({ limit: 100, status: 'AVAILABLE' }),
      ]);
      setGuests(g.data.guests);
      setRooms(r.data.rooms);
      setForm({
        guestId: g.data.guests[0]?.id || '',
        roomId: r.data.rooms[0]?.id || '',
        checkInDate: toInputDate(new Date()),
        checkOutDate: toInputDate(new Date(Date.now() + 86400000)),
        numberOfGuests: 1,
        status: 'CONFIRMED',
      });
      setModalOpen(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await reservationApi.create(form);
      toast.success('Reservation created');
      setModalOpen(false);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Reservations</h1>
        <button type="button" onClick={openCreate} className="rounded-lg bg-primary-600 px-4 py-2 text-sm text-white">New Reservation</button>
      </div>
      <Table
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'room', label: 'Room' },
          { key: 'checkIn', label: 'Check-in' },
          { key: 'checkOut', label: 'Check-out' },
          { key: 'status', label: 'Status' },
          { key: 'actions', label: '' },
        ]}
        data={items}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        renderRow={(row) => (
          <>
            <td className="px-4 py-3 font-mono text-xs">{row.id.slice(-8)}</td>
            <td className="px-4 py-3">{row.roomId.slice(-6)}</td>
            <td className="px-4 py-3">{formatDate(row.checkInDate)}</td>
            <td className="px-4 py-3">{formatDate(row.checkOutDate)}</td>
            <td className="px-4 py-3"><Badge label={row.status} /></td>
            <td className="px-4 py-3"><Link to={`/reservations/${row.id}`} className="text-primary-600">View</Link></td>
          </>
        )}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Reservation" size="lg">
        <form onSubmit={handleCreate} className="grid gap-3 sm:grid-cols-2">
          <FormInput label="Guest" name="guestId" as="select" value={form.guestId} onChange={(e) => setForm({ ...form, guestId: e.target.value })}>
            {guests.map((g) => <option key={g.id} value={g.id}>{g.firstName} {g.lastName}</option>)}
          </FormInput>
          <FormInput label="Room" name="roomId" as="select" value={form.roomId} onChange={(e) => setForm({ ...form, roomId: e.target.value })}>
            {rooms.map((r) => <option key={r.id} value={r.id}>{r.roomNumber} - {r.roomType}</option>)}
          </FormInput>
          <FormInput label="Check-in" name="checkInDate" type="date" value={form.checkInDate} onChange={(e) => setForm({ ...form, checkInDate: e.target.value })} />
          <FormInput label="Check-out" name="checkOutDate" type="date" value={form.checkOutDate} onChange={(e) => setForm({ ...form, checkOutDate: e.target.value })} />
          <FormInput label="Guests" name="numberOfGuests" type="number" value={form.numberOfGuests} onChange={(e) => setForm({ ...form, numberOfGuests: Number(e.target.value) })} />
          <FormInput label="Status" name="status" as="select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            {['PENDING', 'CONFIRMED'].map((s) => <option key={s} value={s}>{s}</option>)}
          </FormInput>
          <button type="submit" className="sm:col-span-2 rounded-lg bg-primary-600 py-2 text-white">Create</button>
        </form>
      </Modal>
    </div>
  );
}
