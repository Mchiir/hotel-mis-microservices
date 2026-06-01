import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { reportApi } from '../../api/report.api.js';
import Card from '../../components/Card.jsx';
import Loader from '../../components/Loader.jsx';
import StatsCard from '../../components/StatsCard.jsx';
import { BedDouble } from 'lucide-react';

export default function OccupancyReportPage() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reportApi.occupancy()
      .then((res) => setReport(res.data.report))
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Occupancy Report</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total Rooms" value={report?.totalRooms} icon={BedDouble} />
        <StatsCard label="Occupancy Rate" value={`${report?.occupancyRate}%`} color="emerald" />
        <StatsCard label="Available" value={report?.availableRooms} color="amber" />
        <StatsCard label="Occupied" value={report?.occupiedRooms} color="violet" />
      </div>
      <Card title="By Status">
        <ul className="grid gap-2 sm:grid-cols-2">
          {Object.entries(report?.byStatus || {}).map(([status, count]) => (
            <li key={status} className="flex justify-between rounded-lg bg-slate-50 px-4 py-2 text-sm">
              <span>{status}</span>
              <span className="font-semibold">{count}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
