import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Application } from '@/types';
import { Badge } from '@/components/ui/badge'; // Chỉnh sửa đường dẫn nếu cần

export default function CandidateApplied() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get('/v1/applications/my-applications');
        setApplications(response.data);
      } catch (error) {
        console.error('Lỗi tải lịch sử ứng tuyển:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Việc làm đã ứng tuyển</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Công việc</th>
              <th className="p-4">Công ty</th>
              <th className="p-4">Ngày nộp</th>
              <th className="p-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b">
                <td className="p-4 font-medium">{app.job?.title}</td>
                <td className="p-4">{app.job?.company?.companyName}</td>
                <td className="p-4">{new Date(app.appliedAt).toLocaleDateString('vi-VN')}</td>
                <td className="p-4">
                  <Badge variant={app.status === 'NEW' ? 'default' : app.status === 'REJECTED' ? 'destructive' : 'secondary'}>
                    {app.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}