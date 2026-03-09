import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import JobCard from '@/components/JobCard';
import { mockJobs } from '@/lib/mock-data';

const JobListPage = () => (
  <div className="py-8">
    <div className="container">
      <h1 className="text-2xl font-bold text-foreground mb-6">Danh sách việc làm</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 p-4 rounded-xl border border-border bg-card shadow-card">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Tìm theo tên việc, công ty..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Địa điểm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hanoi">Hà Nội</SelectItem>
            <SelectItem value="hcm">Hồ Chí Minh</SelectItem>
            <SelectItem value="danang">Đà Nẵng</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Loại hình" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fulltime">Full-time</SelectItem>
            <SelectItem value="parttime">Part-time</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Lọc
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mb-4">Hiển thị {mockJobs.length} việc làm</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockJobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </div>
  </div>
);

export default JobListPage;
