import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { paymentApi } from '../api/payment.api.js';
import { reservationApi } from '../api/reservation.api.js';
import Table from '../components/Table.jsx';
import Modal from '../components/Modal.jsx';
import FormInput from '../components/FormInput.jsx';
import Badge from '../components/Badge.jsx';
import { usePagination } from '../hooks/usePagination.js';
import { PAYMENT_METHODS } from '../utils/constants.js';
import { formatCurrency } from '../utils/formatCurrency.js';
import { formatDate } from '../utils/formatDate.js';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({ reservationId: '', amount: '', paymentMethod: 'CASH' });
  const { page, setPage, totalPages, updateFromResponse } = usePagination();

  const load = async () => {
    setLoading(true);
    try {
      const res = await paymentApi.list({ page, limit: 10 });
      setPayments(res.data.payments);
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
      const res = await reservationApi.list({ limit: 50 });
      const payable = res.data.reservations.filter((r) =>
        ['CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT'].includes(r.status),
      );
      setReservations(payable);
      setForm({ reservationId: payable[0]?.id || '', amount: '', paymentMethod: 'CASH' });
      setModalOpen(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await paymentApi.create({ ...form, amount: Number(form.amount) });
      toast.success('Payment recorded');
      setModalOpen(false);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Payments</h1>
        <button type="button" onClick={openCreate} className="rounded-lg bg-primary-600 px-4 py-2 text-sm text-white">Record Payment</button>
      </div>
      <Table
        columns={[
          { key: 'amount', label: 'Amount' },
          { key: 'method', label: 'Method' },
          { key: 'reservation', label: 'Reservation' },
          { key: 'date', label: 'Paid At' },
        ]}
        data={payments}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        renderRow={(row) => (
          <>
            <td className="px-4 py-3 font-medium">{formatCurrency(row.amount)}</td>
            <td className="px-4 py-3"><Badge label={row.paymentMethod} /></td>
            <td className="px-4 py-3 font-mono text-xs">{row.reservationId.slice(-8)}</td>
            <td className="px-4 py-3">{formatDate(row.paidAt)}</td>
          </>
        )}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Record Payment">
        <form onSubmit={handleCreate} className="space-y-3">
          <FormInput label="Reservation" name="reservationId" as="select" value={form.reservationId} onChange={(e) => setForm({ ...form, reservationId: e.target.value })}>
            {reservations.map((r) => (
              <option key={r.id} value={r.id}>{r.id.slice(-8)} — {r.status}</option>
            ))}
          </FormInput>
          <FormInput label="Amount" name="amount" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
          <FormInput label="Method" name="paymentMethod" as="select" value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
            {Object.values(PAYMENT_METHODS).map((m) => <option key={m} value={m}>{m}</option>)}
          </FormInput>
          <button type="submit" className="w-full rounded-lg bg-primary-600 py-2 text-white">Save</button>
        </form>
      </Modal>
    </div>
  );
}
