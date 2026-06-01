import { Menu } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';

export default function Navbar({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
      <button
        type="button"
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        onClick={onMenuClick}
      >
        <Menu size={20} />
      </button>
      <div className="flex-1 lg:ml-0" />
      <div className="text-right text-sm">
        <p className="font-medium text-slate-800">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-slate-500">{user?.role}</p>
      </div>
    </header>
  );
}
