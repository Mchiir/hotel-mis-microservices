import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Hotel } from 'lucide-react';
import FormInput from '../components/FormInput.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import { ROLES } from '../utils/constants.js';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    role: ROLES.RECEPTIONIST,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await register(form);
      toast.success('Account created!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-slate-100 p-4">
      <div className="w-full max-w-lg rounded-2xl border bg-white p-8 shadow-lg">
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="rounded-full bg-primary-100 p-3 text-primary-700">
            <Hotel size={32} />
          </div>
          <h1 className="text-2xl font-bold">Create account</h1>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <FormInput label="First name" name="firstName" value={form.firstName} onChange={handleChange} required />
          <FormInput label="Last name" name="lastName" value={form.lastName} onChange={handleChange} required />
          <FormInput label="Phone" name="phone" value={form.phone} onChange={handleChange} required className="sm:col-span-2" />
          <FormInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} required className="sm:col-span-2" />
          <FormInput label="Password" name="password" type="password" value={form.password} onChange={handleChange} required className="sm:col-span-2" />
          <FormInput label="Role" name="role" as="select" value={form.role} onChange={handleChange} className="sm:col-span-2">
            {Object.values(ROLES).map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </FormInput>
          <button
            type="submit"
            disabled={submitting}
            className="sm:col-span-2 w-full rounded-lg bg-primary-600 py-2.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-60"
          >
            {submitting ? 'Creating...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
