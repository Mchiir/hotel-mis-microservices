import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BedDouble,
  Users,
  Calendar,
  LogIn,
  LogOut,
  CreditCard,
  BarChart3,
  UserCog,
  User,
  Hotel,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { confirmLogout } from '../components/ConfirmDialog.jsx';
import { ROLES } from '../utils/constants.js';

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-primary-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
  }`;

const menus = {
  [ROLES.ADMIN]: [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/rooms', label: 'Rooms', icon: BedDouble },
    { to: '/guests', label: 'Guests', icon: Users },
    { to: '/reservations', label: 'Reservations', icon: Calendar },
    { to: '/payments', label: 'Payments', icon: CreditCard },
    { to: '/reports/revenue', label: 'Reports', icon: BarChart3 },
    { to: '/users', label: 'Users', icon: UserCog },
    { to: '/profile', label: 'Profile', icon: User },
  ],
  [ROLES.RECEPTIONIST]: [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/guests', label: 'Guests', icon: Users },
    { to: '/reservations', label: 'Reservations', icon: Calendar },
    { to: '/check-in', label: 'Check-In', icon: LogIn },
    { to: '/check-out', label: 'Check-Out', icon: LogOut },
    { to: '/rooms', label: 'Rooms', icon: BedDouble },
    { to: '/profile', label: 'Profile', icon: User },
  ],
  [ROLES.ACCOUNTANT]: [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/payments', label: 'Payments', icon: CreditCard },
    { to: '/reports/revenue', label: 'Revenue Reports', icon: BarChart3 },
    { to: '/profile', label: 'Profile', icon: User },
  ],
};

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const items = menus[user?.role] || [];

  const handleLogout = async () => {
    if (await confirmLogout()) {
      await logout();
      onClose?.();
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-900 transition-transform lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-5">
          <Hotel className="text-primary-400" size={28} />
          <span className="text-lg font-bold text-white">Hotel MIS</span>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={linkClass} onClick={onClose}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="m-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <LogOut size={18} />
          Log out
        </button>
      </aside>
    </>
  );
}
