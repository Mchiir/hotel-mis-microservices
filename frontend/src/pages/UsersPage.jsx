import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userApi } from '../api/user.api.js';
import Table from '../components/Table.jsx';
import Badge from '../components/Badge.jsx';
import { usePagination } from '../hooks/usePagination.js';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { page, setPage, totalPages, updateFromResponse } = usePagination();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await userApi.list({ page, limit: 10 });
        setUsers(res.data.users);
        updateFromResponse(res.data.pagination);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Users</h1>
      <Table
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
          { key: 'actions', label: '' },
        ]}
        data={users}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        renderRow={(row) => (
          <>
            <td className="px-4 py-3">{row.firstName} {row.lastName}</td>
            <td className="px-4 py-3">{row.email}</td>
            <td className="px-4 py-3"><Badge label={row.role} /></td>
            <td className="px-4 py-3"><Link to={`/users/${row.id}`} className="text-primary-600">Edit</Link></td>
          </>
        )}
      />
    </div>
  );
}
