import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Eye, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import api from '@/lib/api';

const AdminJobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await api.get('/v1/jobs');
        setJobs(res.data.Data || res.data || []);
      } catch (error) {
        console.error("Lỗi tải danh sách việc làm", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllJobs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Hành động này của Admin sẽ xóa tin tuyển dụng. Tiếp tục?')) return;
    try {
      await api.delete(`/v1/jobs/${id}`);
      setJobs(jobs.filter(j => j.id !== id));
      toast({ title: 'Thành công', description: 'Đã gỡ việc làm khỏi hệ thống.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Lỗi', description: 'Không thể xóa.' });
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Quản lý Job</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Tìm job..." className="pl-10" />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-medium text-muted-foreground">Tiêu đề</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Công ty</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Trạng thái</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="p-4 font-medium text-foreground">{job.title}</td>
                  <td className="p-4 text-muted-foreground">{job.company?.companyName || 'N/A'}</td>
                  <td className="p-4">
                    <Badge variant={job.status === 'ACTIVE' ? 'default' : 'secondary'}>
                      {job.status || 'ACTIVE'}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(job.id)}>
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

export default AdminJobs;