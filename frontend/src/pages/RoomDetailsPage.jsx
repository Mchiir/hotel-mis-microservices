import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { roomApi } from '../api/room.api.js';
import { useAuth } from '../hooks/useAuth.jsx';
import { ROLES } from '../utils/constants.js';
import Card from '../components/Card.jsx';
import FormInput from '../components/FormInput.jsx';
import Loader from '../components/Loader.jsx';
import Badge from '../components/Badge.jsx';
import { confirmAction } from '../components/ConfirmDialog.jsx';
import { formatCurrency } from '../utils/formatCurrency.js';

export default function RoomDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    roomApi.get(id).then((res) => {
      setRoom(res.data.room);
      setForm(res.data.room);
    }).catch((err) => toast.error(err.message)).finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: ['floor', 'capacity', 'pricePerNight'].includes(name) ? Number(value) : value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await roomApi.update(id, form);
      setRoom(res.data.room);
      toast.success('Room updated');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
    if (!(await confirmAction({ title: 'Delete room?' }))) return;
    try {
      await roomApi.remove(id);
      toast.success('Room deleted');
      navigate('/rooms');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading || !form) return <Loader />;

  const isAdmin = user.role === ROLES.ADMIN;

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Room {room.roomNumber}</h1>
        <Badge label={room.status} />
      </div>
      <Card>
        {isAdmin ? (
          <form onSubmit={handleSave} className="space-y-4">
            <FormInput label="Room number" name="roomNumber" value={form.roomNumber} onChange={handleChange} />
            <FormInput label="Room type" name="roomType" value={form.roomType} onChange={handleChange} />
            <FormInput label="Floor" name="floor" type="number" value={form.floor} onChange={handleChange} />
            <FormInput label="Capacity" name="capacity" type="number" value={form.capacity} onChange={handleChange} />
            <FormInput label="Price" name="pricePerNight" type="number" value={form.pricePerNight} onChange={handleChange} />
            <FormInput label="Status" name="status" as="select" value={form.status} onChange={handleChange}>
              {['AVAILABLE', 'RESERVED', 'OCCUPIED', 'MAINTENANCE'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </FormInput>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 rounded-lg bg-primary-600 py-2 text-white">Save</button>
              <button type="button" onClick={handleDelete} className="rounded-lg border border-red-300 px-4 py-2 text-red-600">Delete</button>
            </div>
          </form>
        ) : (
          <dl className="space-y-2 text-sm">
            <div><dt className="text-slate-500">Type</dt><dd>{room.roomType}</dd></div>
            <div><dt className="text-slate-500">Floor</dt><dd>{room.floor}</dd></div>
            <div><dt className="text-slate-500">Capacity</dt><dd>{room.capacity}</dd></div>
            <div><dt className="text-slate-500">Price</dt><dd>{formatCurrency(room.pricePerNight)}</dd></div>
          </dl>
        )}
      </Card>
    </div>
  );
}
