import { useState, useEffect } from 'react';
import StatCard from '@/components/StatCard';
import { FileText, CheckCircle2, Clock, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '@/lib/api';

const CandidateDashboard = () => {
  const [stats, setStats] = useState({ total: 0, interviewing: 0, pending: 0, saved: 0 });
  const [recentJobs, setRecentJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. Lấy dữ liệu đơn ứng tuyển
        const appRes = await api.get('/v1/applications/my-applications');
        const apps = appRes.data || [];

        // 2. Lấy dữ liệu việc đã lưu
        const meRes = await api.get('/v1/auth/me');
        const candidateId = meRes.data.candidateProfile?.id;
        let savedCount = 0;
        if (candidateId) {
          const bookmarkRes = await api.get(`/v1/bookmarks?candidateId=${candidateId}`);
          savedCount = bookmarkRes.data.length;
        }

        // Đếm trạng thái
        setStats({
          total: apps.length,
          interviewing: apps.filter((a: any) => a.status === 'INTERVIEWING').length,
          pending: apps.filter((a: any) => a.status === 'NEW' || a.status === 'REVIEWING').length,
          saved: savedCount
        });

        // 3. Lấy việc làm gợi ý (Mới nhất)
        const jobRes = await api.get('/v1/jobs');
        const jobsData = jobRes.data.Data || jobRes.data;
        setRecentJobs(jobsData.slice(0, 4));

      } catch (error) {
        console.error("Lỗi lấy dữ liệu dashboard ứng viên", error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard Tổng Quan</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FileText} label="Tổng đơn đã nộp" value={stats.total.toString()} trend="Tất cả" />
        <StatCard icon={CheckCircle2} label="Đang phỏng vấn" value={stats.interviewing.toString()} />
        <StatCard icon={Clock} label="Đang chờ duyệt" value={stats.pending.toString()} />
        <StatCard icon={Bookmark} label="Việc đã lưu" value={stats.saved.toString()} />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Việc làm gợi ý cho bạn</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {recentJobs.map((job) => (
            <div key={job.id} className="border p-4 rounded shadow-sm bg-white">
              <h3 className="font-bold text-base">{job.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{job.company?.companyName}</p>
              <Link to={`/jobs/${job.id}`} className="text-blue-500 text-sm font-medium hover:underline">
                Xem chi tiết &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CandidateDashboard;