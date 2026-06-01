import { useEffect, useState } from 'react';
import { BedDouble, Calendar, DollarSign, Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { ROLES } from '../utils/constants.js';
import StatsCard from '../components/StatsCard.jsx';
import Card from '../components/Card.jsx';
import Loader from '../components/Loader.jsx';
import Badge from '../components/Badge.jsx';
import { reportApi } from '../api/report.api.js';
import { reservationApi } from '../api/reservation.api.js';
import { paymentApi } from '../api/payment.api.js';
import { formatCurrency } from '../utils/formatCurrency.js';
import { formatDate } from '../utils/formatDate.js';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [recentReservations, setRecentReservations] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        if (user.role === ROLES.ADMIN || user.role === ROLES.ACCOUNTANT) {
          const [occ, rev, resList, payList] = await Promise.all([
            reportApi.occupancy().catch(() => null),
            reportApi.revenue().catch(() => null),
            reservationApi.list({ limit: 5 }).catch(() => ({ data: { reservations: [] } })),
            paymentApi.list({ limit: 5 }).catch(() => ({ data: { payments: [] } })),
          ]);
          setStats({
            totalRooms: occ?.data?.report?.totalRooms ?? 0,
            occupied: occ?.data?.report?.occupiedRooms ?? 0,
            reservations: resList?.data?.pagination?.total ?? resList?.data?.reservations?.length ?? 0,
            revenue: rev?.data?.report?.totalRevenue ?? 0,
          });
          setRecentReservations(resList?.data?.reservations ?? []);
          setRecentPayments(payList?.data?.payments ?? []);
        } else if (user.role === ROLES.RECEPTIONIST) {
          const today = new Date().toISOString().split('T')[0];
          const [occ, checkins, reservations] = await Promise.all([
            reportApi.occupancy().catch(() => null),
            reportApi.checkins({ date: today }).catch(() => null),
            reservationApi.list({ status: 'CONFIRMED', limit: 10 }).catch(() => ({ data: { reservations: [] } })),
          ]);
          setStats({
            checkIns: checkins?.data?.report?.totalScheduled ?? 0,
            checkedIn: checkins?.data?.report?.checkedInCount ?? 0,
            available: occ?.data?.report?.availableRooms ?? 0,
            active: reservations?.data?.pagination?.total ?? 0,
          });
          setRecentReservations(reservations?.data?.reservations ?? []);
        } else {
          const rev = await reportApi.revenue().catch(() => null);
          const payList = await paymentApi.list({ limit: 5 }).catch(() => ({ data: { payments: [] } }));
          setStats({ revenue: rev?.data?.report?.totalRevenue ?? 0, payments: payList?.data?.pagination?.total ?? 0 });
          setRecentPayments(payList?.data?.payments ?? []);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user.role]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {user.role === ROLES.ADMIN && (
          <>
            <StatsCard label="Total Rooms" value={stats.totalRooms} icon={BedDouble} />
            <StatsCard label="Occupied" value={stats.occupied} icon={Users} color="amber" />
            <StatsCard label="Reservations" value={stats.reservations} icon={Calendar} color="violet" />
            <StatsCard label="Revenue" value={formatCurrency(stats.revenue)} icon={DollarSign} color="emerald" />
          </>
        )}
        {user.role === ROLES.RECEPTIONIST && (
          <>
            <StatsCard label="Today's Check-ins" value={stats.checkIns} icon={Calendar} />
            <StatsCard label="Checked In" value={stats.checkedIn} icon={Users} color="emerald" />
            <StatsCard label="Available Rooms" value={stats.available} icon={BedDouble} color="amber" />
            <StatsCard label="Active Reservations" value={stats.active} icon={Calendar} color="violet" />
          </>
        )}
        {user.role === ROLES.ACCOUNTANT && (
          <>
            <StatsCard label="Total Revenue" value={formatCurrency(stats.revenue)} icon={DollarSign} color="emerald" />
            <StatsCard label="Payments" value={stats.payments} icon={DollarSign} />
          </>
        )}
      </div>

      {(user.role === ROLES.ADMIN || user.role === ROLES.RECEPTIONIST) && recentReservations.length > 0 && (
        <Card title="Recent Reservations">
          <ul className="divide-y text-sm">
            {recentReservations.map((r) => (
              <li key={r.id} className="flex items-center justify-between py-2">
                <Link to={`/reservations/${r.id}`} className="text-primary-600 hover:underline">
                  #{r.id.slice(-6)}
                </Link>
                <Badge label={r.status} />
                <span className="text-slate-500">{formatDate(r.checkInDate)}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {(user.role === ROLES.ADMIN || user.role === ROLES.ACCOUNTANT) && recentPayments.length > 0 && (
        <Card title="Recent Payments">
          <ul className="divide-y text-sm">
            {recentPayments.map((p) => (
              <li key={p.id} className="flex justify-between py-2">
                <span>{formatCurrency(p.amount)}</span>
                <Badge label={p.paymentMethod} />
                <span className="text-slate-500">{formatDate(p.paidAt)}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
