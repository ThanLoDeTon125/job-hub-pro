import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/v1/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Lỗi tải Users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý Người dùng</h2>
      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Quyền (Role)</th>
            <th className="p-3 text-left">Trạng thái</th>
            <th className="p-3 text-left">Ngày tham gia</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-b">
              <td className="p-3">{u.email}</td>
              <td className="p-3 font-semibold">{u.role}</td>
              <td className="p-3">
                <span className={`px-2 py-1 text-xs rounded ${u.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {u.status}
                </span>
              </td>
              <td className="p-3">{new Date(u.createdAt).toLocaleDateString('vi-VN')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}