import { useState, useEffect } from 'react';
import StatCard from '@/components/StatCard';
import { Users, Briefcase, Building2, TrendingUp } from 'lucide-react';
import api from '@/lib/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ jobs: 0, candidates: 0, employers: 0, applications: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [jobsRes, usersRes, appsRes] = await Promise.all([
          api.get('/v1/jobs'),
          api.get('/v1/users'),
          api.get('/v1/applications')
        ]);

        const totalJobs = jobsRes.data.Data?.length || jobsRes.data.length || 0;
        const totalApps = appsRes.data.length || 0;

        // Phân loại user
        const users = usersRes.data || [];
        const totalCandidates = users.filter((u: any) => u.role === 'CANDIDATE').length;
        const totalEmployers = users.filter((u: any) => u.role === 'EMPLOYER').length;

        setStats({ jobs: totalJobs, candidates: totalCandidates, employers: totalEmployers, applications: totalApps });
      } catch (error) {
        console.error("Lỗi lấy thống kê", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Đang tính toán số liệu...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard Admin</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Briefcase} label="Tổng việc làm" value={stats.jobs.toString()} trend="Hoạt động" />
        <StatCard icon={Users} label="Ứng viên" value={stats.candidates.toString()} trend="Thành viên" />
        <StatCard icon={Building2} label="Nhà tuyển dụng" value={stats.employers.toString()} trend="Doanh nghiệp" />
        <StatCard icon={TrendingUp} label="Lượt ứng tuyển" value={stats.applications.toString()} trend="Tương tác" />
      </div>
    </div>
  );
};

export default AdminDashboard;