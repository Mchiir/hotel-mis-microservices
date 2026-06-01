import { useState } from 'react';
import toast from 'react-hot-toast';
import { reportApi } from '../../api/report.api.js';
import Card from '../../components/Card.jsx';
import FormInput from '../../components/FormInput.jsx';
import StatsCard from '../../components/StatsCard.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RevenueReportPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const params = {};
      if (from) params.from = new Date(from).toISOString();
      if (to) params.to = new Date(to).toISOString();
      const res = await reportApi.revenue(params);
      setReport(res.data.report);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Revenue Report</h1>
        <div className="flex gap-2 text-sm">
          <Link to="/reports/occupancy" className="text-primary-600 hover:underline">Occupancy</Link>
          <Link to="/reports/reservations" className="text-primary-600 hover:underline">Reservations</Link>
          <Link to="/reports/checkins" className="text-primary-600 hover:underline">Check-ins</Link>
        </div>
      </div>
      <Card>
        <form onSubmit={load} className="flex flex-wrap items-end gap-3">
          <FormInput label="From" name="from" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          <FormInput label="To" name="to" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          <button type="submit" disabled={loading} className="rounded-lg bg-primary-600 px-4 py-2 text-sm text-white">
            {loading ? 'Loading...' : 'Generate'}
          </button>
        </form>
      </Card>
      {report && (
        <>
          <StatsCard label="Total Revenue" value={formatCurrency(report.totalRevenue)} icon={DollarSign} color="emerald" />
          <Card title="By Payment Method">
            <ul className="space-y-2 text-sm">
              {Object.entries(report.byMethod || {}).map(([method, total]) => (
                <li key={method} className="flex justify-between border-b py-2">
                  <span>{method}</span>
                  <span className="font-semibold">{formatCurrency(total)}</span>
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}
    </div>
  );
}
