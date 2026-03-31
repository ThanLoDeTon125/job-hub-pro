import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Search, MapPin, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function JobListPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // States cho bộ lọc
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [jobType, setJobType] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Build query string
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (location) params.append('location', location);
      if (minSalary) params.append('minSalary', minSalary);
      if (jobType) params.append('employmentType', jobType);

      const response = await api.get(`/v1/jobs?${params.toString()}`);
      setJobs(response.data.Data || response.data || []);
    } catch (error) {
      console.error('Lỗi khi tải danh sách việc làm:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []); // Lần đầu load

  return (
    <div className="container mx-auto p-4">
      {/* Thanh bộ lọc */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-wrap gap-4 items-center border">
        <Input
          placeholder="Tên công việc..."
          value={keyword} onChange={(e) => setKeyword(e.target.value)}
          className="max-w-xs"
        />
        <Input
          placeholder="Địa điểm..."
          value={location} onChange={(e) => setLocation(e.target.value)}
          className="max-w-[200px]"
        />
        <Input
          type="number" placeholder="Lương tối thiểu (Tr)"
          value={minSalary} onChange={(e) => setMinSalary(e.target.value)}
          className="max-w-[200px]"
        />
        <select
          value={jobType} onChange={(e) => setJobType(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm max-w-[200px] bg-background"
        >
          <option value="">Tất cả hình thức</option>
          <option value="FULL-TIME">Toàn thời gian</option>
          <option value="PART-TIME">Bán thời gian</option>
          <option value="REMOTE">Làm từ xa</option>
        </select>

        <Button onClick={fetchJobs}><Filter className="w-4 h-4 mr-2" /> Lọc</Button>
      </div>

      {/* Danh sách công việc (Dùng map render job như cũ) */}
      {/* ... */}
    </div>
  );
}