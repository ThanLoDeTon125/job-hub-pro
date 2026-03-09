import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Eye, Trash2 } from 'lucide-react';
import { mockJobs } from '@/lib/mock-data';

const AdminJobs = () => (
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
              <th className="text-left p-4 font-medium text-muted-foreground">Địa điểm</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Trạng thái</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {mockJobs.map((job, i) => (
              <tr key={job.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="p-4 font-medium text-foreground">{job.title}</td>
                <td className="p-4 text-muted-foreground">{job.company}</td>
                <td className="p-4 text-muted-foreground">{job.location}</td>
                <td className="p-4">
                  <Badge variant={i === 4 ? 'destructive' : 'default'}>
                    {i === 4 ? 'Bị report' : 'Hoạt động'}
                  </Badge>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
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

export default AdminJobs;
