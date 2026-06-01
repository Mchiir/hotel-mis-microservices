import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { guestApi } from '../api/guest.api.js';
import Card from '../components/Card.jsx';
import FormInput from '../components/FormInput.jsx';
import Loader from '../components/Loader.jsx';

export default function GuestDetailsPage() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    guestApi.get(id).then((res) => setForm(res.data.guest)).catch((e) => toast.error(e.message)).finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await guestApi.update(id, form);
      toast.success('Guest updated');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading || !form) return <Loader />;

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h1 className="text-2xl font-bold">Guest Details</h1>
      <Card>
        <form onSubmit={handleSave} className="space-y-4">
          <FormInput label="First name" name="firstName" value={form.firstName} onChange={handleChange} />
          <FormInput label="Last name" name="lastName" value={form.lastName} onChange={handleChange} />
          <FormInput label="Phone" name="phone" value={form.phone} onChange={handleChange} />
          <FormInput label="Email" name="email" value={form.email} onChange={handleChange} />
          <FormInput label="Nationality" name="nationality" value={form.nationality} onChange={handleChange} />
          <FormInput label="ID Number" name="idNumber" value={form.idNumber} onChange={handleChange} />
          <button type="submit" className="w-full rounded-lg bg-primary-600 py-2 text-white">Save</button>
        </form>
      </Card>
    </div>
  );
}
