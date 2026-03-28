import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import api from '@/lib/api';

const EmployerJobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyJobs = async () => {
    try {
      // 1. Lấy thông tin user hiện tại
      const meRes = await api.get('/v1/auth/me');
      const companyId = meRes.data.company?.id;

      // 2. Nếu đã có công ty, lấy danh sách job của công ty đó
      if (companyId) {
        const compRes = await api.get(`/v1/companies/${companyId}`);
        setJobs(compRes.data.jobs || []);
      }
    } catch (error) {
      console.error('Lỗi tải việc làm:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa việc làm này?')) return;
    try {
      await api.delete(`/v1/jobs/${id}`);
      toast({ title: 'Thành công', description: 'Đã xóa việc làm.' });
      setJobs(jobs.filter(j => j.id !== id));
    } catch (error) {
      toast({ variant: 'destructive', title: 'Lỗi', description: 'Không thể xóa việc làm lúc này.' });
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Quản lý tin tuyển dụng</h1>
        <Button><Plus className="h-4 w-4 mr-2" />Tạo tin mới</Button>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-medium text-muted-foreground">Tiêu đề</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Trạng thái</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ngày tạo</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr><td colSpan={4} className="p-4 text-center">Chưa có tin tuyển dụng nào.</td></tr>
              ) : jobs.map((job) => (
                <tr key={job.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="p-4">
                    <p className="font-medium text-foreground">{job.title}</p>
                    <p className="text-xs text-muted-foreground">{job.location}</p>
                  </td>
                  <td className="p-4">
                    <Badge variant={job.status === 'ACTIVE' ? 'default' : 'secondary'}>
                      {job.status || 'ACTIVE'}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted-foreground">{new Date(job.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(job.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployerJobs;