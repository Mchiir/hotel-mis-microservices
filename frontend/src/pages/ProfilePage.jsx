import Card from '../components/Card.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import Badge from '../components/Badge.jsx';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <Card>
        <dl className="space-y-3 text-sm">
          <div><dt className="text-slate-500">Name</dt><dd className="text-lg font-medium">{user?.firstName} {user?.lastName}</dd></div>
          <div><dt className="text-slate-500">Email</dt><dd>{user?.email}</dd></div>
          <div><dt className="text-slate-500">Phone</dt><dd>{user?.phone}</dd></div>
          <div><dt className="text-slate-500">Role</dt><dd className="mt-1"><Badge label={user?.role} /></dd></div>
        </dl>
      </Card>
    </div>
  );
}
