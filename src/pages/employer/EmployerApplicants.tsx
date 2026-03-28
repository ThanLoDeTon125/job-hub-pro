import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Application } from '@/types';
import { toast } from '@/hooks/use-toast';

export default function EmployerApplicants({ jobId }: { jobId: number }) {
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        // Backend: GET /api/v1/applications/job/{jobId}
        const response = await api.get(`/v1/applications/job/${jobId}`);
        setApplicants(response.data);
      } catch (error) {
        console.error('Lỗi tải ứng viên:', error);
      } finally {
        setLoading(false);
      }
    };

    // Giả sử lấy jobId tạm thời là 1 nếu chưa truyền prop (bạn cần truyền jobId từ URL vào thực tế)
    if (jobId) fetchApplicants();
  }, [jobId]);

  // Hàm HR duyệt đơn
  const handleUpdateStatus = async (applicationId: number, newStatus: string) => {
    try {
      await api.put(`/v1/applications/${applicationId}/status`, { status: newStatus });
      toast({ title: "Thành công", description: `Đã chuyển sang trạng thái ${newStatus}` });

      // Cập nhật lại UI nội bộ
      setApplicants(prev => prev.map(app => app.id === applicationId ? { ...app, status: newStatus } : app));
    } catch (error) {
      toast({ variant: "destructive", title: "Lỗi", description: "Không thể cập nhật trạng thái." });
    }
  };

  if (loading) return <div>Đang tải hồ sơ...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Danh sách ứng viên</h2>
      <div className="grid gap-4">
        {applicants.map(app => (
          <div key={app.id} className="border p-4 flex justify-between items-center rounded bg-white shadow-sm">
            <div>
              <p className="font-bold">{app.candidate?.fullName}</p>
              <p className="text-sm text-gray-500">Ngày nộp: {new Date(app.appliedAt).toLocaleDateString('vi-VN')}</p>
              <a href={app.candidate?.cvUrl} target="_blank" className="text-blue-500 text-sm underline mt-1 block">
                Xem CV (PDF)
              </a>
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-sm text-gray-600 font-semibold mr-2">Trạng thái: {app.status}</span>
              <select
                value={app.status}
                onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                className="border p-2 rounded text-sm"
              >
                <option value="NEW">Mới (NEW)</option>
                <option value="REVIEWING">Đang xem xét (REVIEWING)</option>
                <option value="INTERVIEWING">Phỏng vấn (INTERVIEWING)</option>
                <option value="OFFERED">Mời làm (OFFERED)</option>
                <option value="REJECTED">Từ chối (REJECTED)</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}