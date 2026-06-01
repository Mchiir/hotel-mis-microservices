import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { roomApi } from '../api/room.api.js';
import Card from '../components/Card.jsx';
import FormInput from '../components/FormInput.jsx';

export default function CreateRoomPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    roomNumber: '',
    roomType: '',
    floor: 1,
    capacity: 2,
    pricePerNight: 100,
    status: 'AVAILABLE',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: ['floor', 'capacity', 'pricePerNight'].includes(name) ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await roomApi.create(form);
      toast.success('Room created');
      navigate('/rooms');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h1 className="text-2xl font-bold">Create Room</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput label="Room number" name="roomNumber" value={form.roomNumber} onChange={handleChange} required />
          <FormInput label="Room type" name="roomType" value={form.roomType} onChange={handleChange} required />
          <FormInput label="Floor" name="floor" type="number" value={form.floor} onChange={handleChange} required />
          <FormInput label="Capacity" name="capacity" type="number" value={form.capacity} onChange={handleChange} required />
          <FormInput label="Price per night" name="pricePerNight" type="number" value={form.pricePerNight} onChange={handleChange} required />
          <button type="submit" disabled={submitting} className="w-full rounded-lg bg-primary-600 py-2 text-white disabled:opacity-60">
            {submitting ? 'Saving...' : 'Create Room'}
          </button>
        </form>
      </Card>
    </div>
  );
}
