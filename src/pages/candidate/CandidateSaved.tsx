import JobCard from '@/components/JobCard';
import { mockJobs } from '@/lib/mock-data';

const CandidateSaved = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground">Việc đã lưu</h1>
    <div className="grid gap-4 md:grid-cols-2">
      {mockJobs.slice(0, 4).map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  </div>
);

export default CandidateSaved;
