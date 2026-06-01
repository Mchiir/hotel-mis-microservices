import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userApi } from '../api/user.api.js';
import Card from '../components/Card.jsx';
import FormInput from '../components/FormInput.jsx';
import Loader from '../components/Loader.jsx';
import { confirmAction } from '../components/ConfirmDialog.jsx';
import { ROLES } from '../utils/constants.js';

export default function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userApi.get(id).then((res) => setForm(res.data.user)).catch((e) => toast.error(e.message)).finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    delete payload.id;
    delete payload.createdAt;
    delete payload.updatedAt;
    if (!payload.password) delete payload.password;
    try {
      await userApi.update(id, payload);
      toast.success('User updated');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
    if (!(await confirmAction({ title: 'Delete user?' }))) return;
    try {
      await userApi.remove(id);
      toast.success('User deleted');
      navigate('/users');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading || !form) return <Loader />;

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h1 className="text-2xl font-bold">Edit User</h1>
      <Card>
        <form onSubmit={handleSave} className="space-y-4">
          <FormInput label="First name" name="firstName" value={form.firstName} onChange={handleChange} />
          <FormInput label="Last name" name="lastName" value={form.lastName} onChange={handleChange} />
          <FormInput label="Phone" name="phone" value={form.phone} onChange={handleChange} />
          <FormInput label="Email" name="email" value={form.email} onChange={handleChange} />
          <FormInput label="Role" name="role" as="select" value={form.role} onChange={handleChange}>
            {Object.values(ROLES).map((r) => <option key={r} value={r}>{r}</option>)}
          </FormInput>
          <FormInput label="New password (optional)" name="password" type="password" value={form.password || ''} onChange={handleChange} />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 rounded-lg bg-primary-600 py-2 text-white">Save</button>
            <button type="button" onClick={handleDelete} className="rounded-lg border border-red-300 px-4 py-2 text-red-600">Delete</button>
          </div>
        </form>
      </Card>
    </div>
  );
}
