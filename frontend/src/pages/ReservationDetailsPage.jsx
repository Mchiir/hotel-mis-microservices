import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { reservationApi } from '../api/reservation.api.js';
import Card from '../components/Card.jsx';
import Badge from '../components/Badge.jsx';
import Loader from '../components/Loader.jsx';
import { confirmAction } from '../components/ConfirmDialog.jsx';
import { formatDate } from '../utils/formatDate.js';

export default function ReservationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    reservationApi.get(id).then((res) => setReservation(res.data.reservation)).catch((e) => toast.error(e.message)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [id]);

  const handleCheckIn = async () => {
    try {
      await reservationApi.checkIn(id);
      toast.success('Checked in');
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCheckOut = async () => {
    try {
      await reservationApi.checkOut(id);
      toast.success('Checked out');
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCancel = async () => {
    if (!(await confirmAction({ title: 'Cancel reservation?' }))) return;
    try {
      await reservationApi.remove(id);
      toast.success('Reservation cancelled');
      navigate('/reservations');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading || !reservation) return <Loader />;

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reservation</h1>
        <Badge label={reservation.status} />
      </div>
      <Card>
        <dl className="space-y-2 text-sm">
          <div><dt className="text-slate-500">Guest ID</dt><dd className="font-mono text-xs">{reservation.guestId}</dd></div>
          <div><dt className="text-slate-500">Room ID</dt><dd className="font-mono text-xs">{reservation.roomId}</dd></div>
          <div><dt className="text-slate-500">Check-in</dt><dd>{formatDate(reservation.checkInDate)}</dd></div>
          <div><dt className="text-slate-500">Check-out</dt><dd>{formatDate(reservation.checkOutDate)}</dd></div>
          <div><dt className="text-slate-500">Guests</dt><dd>{reservation.numberOfGuests}</dd></div>
        </dl>
        <div className="mt-4 flex flex-wrap gap-2">
          {reservation.status === 'CONFIRMED' && (
            <button type="button" onClick={handleCheckIn} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white">Check In</button>
          )}
          {reservation.status === 'CHECKED_IN' && (
            <button type="button" onClick={handleCheckOut} className="rounded-lg bg-primary-600 px-4 py-2 text-sm text-white">Check Out</button>
          )}
          {!['CHECKED_OUT', 'CANCELLED'].includes(reservation.status) && (
            <button type="button" onClick={handleCancel} className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-600">Cancel</button>
          )}
        </div>
      </Card>
    </div>
  );
}
