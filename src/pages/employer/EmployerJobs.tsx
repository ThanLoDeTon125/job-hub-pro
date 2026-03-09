import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';
import { mockJobs } from '@/lib/mock-data';

const statusMap: Record<number, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  0: { label: 'Đang tuyển', variant: 'default' },
  1: { label: 'Đang tuyển', variant: 'default' },
  2: { label: 'Tạm dừng', variant: 'secondary' },
  3: { label: 'Đang tuyển', variant: 'default' },
  4: { label: 'Hết hạn', variant: 'destructive' },
  5: { label: 'Đang tuyển', variant: 'default' },
};

const EmployerJobs = () => (
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
              <th className="text-left p-4 font-medium text-muted-foreground">Ứng viên</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Trạng thái</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Hạn nộp</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {mockJobs.map((job, i) => (
              <tr key={job.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="p-4">
                  <p className="font-medium text-foreground">{job.title}</p>
                  <p className="text-xs text-muted-foreground">{job.location}</p>
                </td>
                <td className="p-4 text-muted-foreground">{Math.floor(Math.random() * 20) + 1}</td>
                <td className="p-4">
                  <Badge variant={statusMap[i]?.variant || 'default'}>{statusMap[i]?.label || 'Đang tuyển'}</Badge>
                </td>
                <td className="p-4 text-muted-foreground">{job.deadline}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
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

export default EmployerJobs;
