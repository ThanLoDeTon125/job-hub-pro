import StatCard from '@/components/StatCard';
import JobCard from '@/components/JobCard';
import { FileText, CheckCircle2, Clock, Bookmark } from 'lucide-react';
import { mockJobs } from '@/lib/mock-data';

const CandidateDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard icon={FileText} label="Đã ứng tuyển" value={12} trend="+3 tuần này" />
      <StatCard icon={CheckCircle2} label="Đang phỏng vấn" value={3} />
      <StatCard icon={Clock} label="Chờ phản hồi" value={5} />
      <StatCard icon={Bookmark} label="Đã lưu" value={8} />
    </div>

    <div>
      <h2 className="text-lg font-semibold text-foreground mb-4">Việc làm gợi ý</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {mockJobs.slice(0, 4).map((job) => (
          <JobCard key={job.id} {...job} compact />
        ))}
      </div>
    </div>
  </div>
);

export default CandidateDashboard;
