import { useState } from 'react';
import toast from 'react-hot-toast';
import { reportApi } from '../../api/report.api.js';
import Card from '../../components/Card.jsx';
import FormInput from '../../components/FormInput.jsx';
import Badge from '../../components/Badge.jsx';
import Table from '../../components/Table.jsx';
import { formatDate } from '../../utils/formatDate.js';

export default function ReservationReportPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = {};
      if (from) params.from = new Date(from).toISOString();
      if (to) params.to = new Date(to).toISOString();
      const res = await reportApi.reservations(params);
      setReport(res.data.report);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reservation Report</h1>
      <Card>
        <form onSubmit={load} className="flex flex-wrap items-end gap-3">
          <FormInput label="From" name="from" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          <FormInput label="To" name="to" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          <button type="submit" className="rounded-lg bg-primary-600 px-4 py-2 text-sm text-white">Generate</button>
        </form>
      </Card>
      {report && (
        <>
          <p className="text-sm text-slate-600">Total: {report.totalReservations}</p>
          <Card title="By Status">
            <div className="flex flex-wrap gap-2">
              {Object.entries(report.byStatus || {}).map(([s, c]) => (
                <span key={s} className="text-sm">{s}: <strong>{c}</strong></span>
              ))}
            </div>
          </Card>
          <Table
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'status', label: 'Status' },
              { key: 'in', label: 'Check-in' },
              { key: 'out', label: 'Check-out' },
            ]}
            data={report.reservations}
            loading={loading}
            renderRow={(row) => (
              <>
                <td className="px-4 py-3 font-mono text-xs">{row.id.slice(-8)}</td>
                <td className="px-4 py-3"><Badge label={row.status} /></td>
                <td className="px-4 py-3">{formatDate(row.checkInDate)}</td>
                <td className="px-4 py-3">{formatDate(row.checkOutDate)}</td>
              </>
            )}
          />
        </>
      )}
    </div>
  );
}
