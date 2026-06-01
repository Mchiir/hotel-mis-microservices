import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { guestApi } from '../api/guest.api.js';
import Table from '../components/Table.jsx';
import Modal from '../components/Modal.jsx';
import FormInput from '../components/FormInput.jsx';
import { usePagination } from '../hooks/usePagination.js';

export default function GuestsPage() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', nationality: '', idNumber: '' });
  const { page, setPage, totalPages, updateFromResponse } = usePagination();

  const load = async () => {
    setLoading(true);
    try {
      const res = await guestApi.list({ page, limit: 10 });
      setGuests(res.data.guests);
      updateFromResponse(res.data.pagination);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [page]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await guestApi.create(form);
      toast.success('Guest created');
      setModalOpen(false);
      setForm({ firstName: '', lastName: '', phone: '', email: '', nationality: '', idNumber: '' });
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Guests</h1>
        <button type="button" onClick={() => setModalOpen(true)} className="rounded-lg bg-primary-600 px-4 py-2 text-sm text-white">Add Guest</button>
      </div>
      <Table
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Phone' },
          { key: 'id', label: 'ID Number' },
          { key: 'actions', label: '' },
        ]}
        data={guests}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        renderRow={(row) => (
          <>
            <td className="px-4 py-3">{row.firstName} {row.lastName}</td>
            <td className="px-4 py-3">{row.email}</td>
            <td className="px-4 py-3">{row.phone}</td>
            <td className="px-4 py-3">{row.idNumber}</td>
            <td className="px-4 py-3"><Link to={`/guests/${row.id}`} className="text-primary-600">View</Link></td>
          </>
        )}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Guest">
        <form onSubmit={handleCreate} className="space-y-3">
          <FormInput label="First name" name="firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
          <FormInput label="Last name" name="lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
          <FormInput label="Phone" name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          <FormInput label="Email" name="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <FormInput label="Nationality" name="nationality" value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} required />
          <FormInput label="ID Number" name="idNumber" value={form.idNumber} onChange={(e) => setForm({ ...form, idNumber: e.target.value })} required />
          <button type="submit" className="w-full rounded-lg bg-primary-600 py-2 text-white">Create</button>
        </form>
      </Modal>
    </div>
  );
}
