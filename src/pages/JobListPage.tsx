import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Job } from '@/types';
// Import các component UI của bạn (JobCard, v.v...) ở đây

export default function JobListPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Gọi API Backend: GET /api/v1/jobs
        const response = await api.get('/v1/jobs');
        
        // Backend trả về: { totalItems, page, data: [...] }
        // Lấy mảng jobs từ property 'data' (hoặc 'Data' tùy config JSON của .NET)
        const jobData = response.data.data || response.data.Data || response.data;
        setJobs(jobData);
      } catch (error) {
        console.error('Lỗi khi tải danh sách việc làm:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="text-center p-10">Đang tải việc làm...</div>;
  if (jobs.length === 0) return <div className="text-center p-10">Chưa có công việc nào.</div>;

  return (
    <div className="container mx-auto p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <div key={job.id} className="border p-4 rounded shadow">
          <h3 className="font-bold text-lg">{job.title}</h3>
          <p className="text-gray-600">{job.company?.companyName || 'Công ty ẩn danh'}</p>
          <p className="text-sm">📍 {job.location}</p>
          <p className="text-sm text-blue-600 font-medium">
             💰 {job.salaryMin} - {job.salaryMax} triệu
          </p>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
            Ứng tuyển ngay
          </button>
        </div>
      ))}
    </div>
  );
}