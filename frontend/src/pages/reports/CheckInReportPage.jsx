import { useState } from 'react';
import toast from 'react-hot-toast';
import { reportApi } from '../../api/report.api.js';
import Card from '../../components/Card.jsx';
import FormInput from '../../components/FormInput.jsx';
import StatsCard from '../../components/StatsCard.jsx';
import Table from '../../components/Table.jsx';
import Badge from '../../components/Badge.jsx';
import { formatDate } from '../../utils/formatDate.js';
import { toInputDate } from '../../utils/formatDate.js';

export default function CheckInReportPage() {
  const [date, setDate] = useState(toInputDate(new Date()));
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await reportApi.checkins({ date: new Date(date).toISOString() });
      setReport(res.data.report);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Check-In Report</h1>
      <Card>
        <form onSubmit={load} className="flex items-end gap-3">
          <FormInput label="Date" name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <button type="submit" className="rounded-lg bg-primary-600 px-4 py-2 text-sm text-white">Generate</button>
        </form>
      </Card>
      {report && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatsCard label="Scheduled" value={report.totalScheduled} />
            <StatsCard label="Checked In" value={report.checkedInCount} color="emerald" />
            <StatsCard label="Pending" value={report.pendingCheckInCount} color="amber" />
          </div>
          <Table
            columns={[
              { key: 'id', label: 'Reservation' },
              { key: 'status', label: 'Status' },
              { key: 'in', label: 'Check-in' },
            ]}
            data={report.checkInsToday}
            loading={loading}
            renderRow={(row) => (
              <>
                <td className="px-4 py-3 font-mono text-xs">{row.id.slice(-8)}</td>
                <td className="px-4 py-3"><Badge label={row.status} /></td>
                <td className="px-4 py-3">{formatDate(row.checkInDate)}</td>
              </>
            )}
          />
        </>
      )}
    </div>
  );
}
