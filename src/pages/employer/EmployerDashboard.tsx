import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Eye, TrendingUp, PlusCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';

export default function EmployerDashboard() {
  const { user } = useAuth();

  // State lưu trữ số liệu
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplicants: 0,
    activeJobs: 0
  });

  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // 1. Gọi API lấy danh sách việc làm của Công ty
        const jobsRes = await api.get('/v1/jobs/my-jobs');
        const jobs = jobsRes.data || [];

        // 2. Tính toán số liệu công việc
        const activeCount = jobs.filter((j: any) => j.status === 'ACTIVE').length;

        // 3. Lấy ngẫu nhiên vài công việc mới nhất để hiển thị
        const latest = [...jobs].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);
        setRecentJobs(latest);

        // 4. Lấy tổng số ứng viên (Phải lặp qua từng Job để đếm - Tạm thời dùng cách này trước khi có API thống kê riêng)
        let applicantCount = 0;
        for (const job of jobs) {
          try {
            const appsRes = await api.get(`/v1/applications/job/${job.id}`);
            applicantCount += (appsRes.data || []).length;
          } catch (e) {
            // Bỏ qua lỗi nếu job không có ứng viên
          }
        }

        // 5. Cập nhật State
        setStats({
          totalJobs: jobs.length,
          activeJobs: activeCount,
          totalApplicants: applicantCount
        });

      } catch (error) {
        console.error("Lỗi tải dữ liệu Dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-10 text-center text-muted-foreground">Đang tải số liệu tổng quan...</div>;

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tổng quan Tuyển dụng</h1>
          <p className="text-muted-foreground text-sm mt-1">Chào mừng trở lại, {user?.fullName || 'Nhà tuyển dụng'}</p>
        </div>
        <Link to="/employer/jobs">
          <Button className="gap-2">
            <PlusCircle className="w-4 h-4" /> Đăng tin mới
          </Button>
        </Link>
      </div>

      {/* CÁC THẺ THỐNG KÊ */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tin tuyển dụng"
          value={stats.totalJobs}
          subtitle="Tổng số tin đã đăng"
          icon={<Briefcase className="w-6 h-6 text-blue-600" />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Tin đang mở"
          value={stats.activeJobs}
          subtitle="Đang nhận hồ sơ"
          icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
          bgColor="bg-emerald-50"
        />
        <StatCard
          title="Tổng Ứng viên"
          value={stats.totalApplicants}
          subtitle="Đã nộp CV"
          icon={<Users className="w-6 h-6 text-purple-600" />}
          bgColor="bg-purple-50"
        />
        <StatCard
          title="Lượt xem tin"
          value="-- Mở rộng sau --"
          subtitle="Tính năng sắp ra mắt"
          icon={<Eye className="w-6 h-6 text-orange-600" />}
          bgColor="bg-orange-50"
        />
      </div>

      {/* DANH SÁCH VIỆC LÀM MỚI NHẤT */}
      <div className="bg-card border rounded-2xl shadow-sm mt-8">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="font-bold text-lg">Chiến dịch tuyển dụng gần đây</h2>
          <Link to="/employer/jobs" className="text-sm text-primary font-medium hover:underline flex items-center">
            Xem tất cả <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="p-0">
          {recentJobs.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">Bạn chưa đăng tin tuyển dụng nào.</div>
          ) : (
            <div className="divide-y">
              {recentJobs.map((job) => (
                <div key={job.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-muted/30 transition-colors">
                  <div>
                    <h3 className="font-bold text-foreground">{job.title}</h3>
                    <div className="flex gap-3 text-sm text-muted-foreground mt-1">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.employmentType}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${job.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                      {job.status === 'ACTIVE' ? 'Đang mở' : 'Đã đóng'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Component Thẻ Thống Kê
function StatCard({ title, value, subtitle, icon, bgColor }: any) {
  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className={`p-2 rounded-xl ${bgColor}`}>{icon}</div>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-foreground">{value}</h3>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </div>
    </div>
  );
}