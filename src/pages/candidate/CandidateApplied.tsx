import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Clock } from 'lucide-react';
import { mockJobs } from '@/lib/mock-data';

const statuses = ['Đã gửi', 'Đang xem', 'Phỏng vấn', 'Đã gửi', 'Từ chối', 'Đã gửi'];
const statusColors: Record<string, string> = {
  'Đã gửi': 'bg-muted text-muted-foreground',
  'Đang xem': 'bg-primary/10 text-primary',
  'Phỏng vấn': 'bg-success/10 text-success',
  'Từ chối': 'bg-destructive/10 text-destructive',
};

const CandidateApplied = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground">Việc đã ứng tuyển</h1>
    <div className="space-y-3">
      {mockJobs.map((job, i) => (
        <div key={job.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
            <Building2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{job.title}</p>
            <p className="text-sm text-muted-foreground">{job.company}</p>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{job.postedAt}</span>
          </div>
          <Badge className={statusColors[statuses[i]] || ''} variant="secondary">
            {statuses[i]}
          </Badge>
        </div>
      ))}
    </div>
  </div>
);

export default CandidateApplied;
