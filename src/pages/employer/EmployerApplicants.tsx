import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, FileText } from 'lucide-react';

const applicants = [
  { id: '1', name: 'Nguyễn Văn A', email: 'a@email.com', job: 'Frontend Developer', status: 'Mới' },
  { id: '2', name: 'Trần Thị B', email: 'b@email.com', job: 'Frontend Developer', status: 'Đang xem' },
  { id: '3', name: 'Lê Văn C', email: 'c@email.com', job: 'Backend Developer', status: 'Phỏng vấn' },
  { id: '4', name: 'Phạm Thị D', email: 'd@email.com', job: 'UI/UX Designer', status: 'Mới' },
  { id: '5', name: 'Hoàng Văn E', email: 'e@email.com', job: 'DevOps Engineer', status: 'Từ chối' },
];

const statusColors: Record<string, string> = {
  'Mới': 'bg-primary/10 text-primary',
  'Đang xem': 'bg-warning/10 text-warning',
  'Phỏng vấn': 'bg-success/10 text-success',
  'Từ chối': 'bg-destructive/10 text-destructive',
};

const EmployerApplicants = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground">Danh sách ứng viên</h1>
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Lọc theo tin" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          <SelectItem value="fe">Frontend Developer</SelectItem>
          <SelectItem value="be">Backend Developer</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-3">
      {applicants.map((a) => (
        <div key={a.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted shrink-0">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground">{a.name}</p>
            <p className="text-sm text-muted-foreground">{a.job}</p>
          </div>
          <Badge className={statusColors[a.status]} variant="secondary">{a.status}</Badge>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon"><Mail className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><FileText className="h-4 w-4" /></Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default EmployerApplicants;
