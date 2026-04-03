import { useState, useEffect } from 'react';
import { Users, Briefcase, FileText, Building2, MessageSquare } from 'lucide-react';
import api from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/v1/stats/dashboard');
        setStats(res.data);
      } catch (error) {
        console.error("Lỗi lấy số liệu thống kê:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-10 text-center">Đang tải số liệu hệ thống...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tổng quan Hệ thống</h1>
        <p className="text-muted-foreground text-sm mt-1">Theo dõi các chỉ số hoạt động của JobHubPro</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <StatCard title="Tổng Người Dùng" value={stats?.totalUsers || 0} icon={<Users className="w-8 h-8 text-blue-500" />} bgColor="bg-blue-50" />
        <div className="bg-card border rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-purple-50 rounded-xl"><Briefcase className="w-8 h-8 text-purple-500" /></div>
          <div><p className="text-sm font-medium text-muted-foreground">Tổng Việc Làm</p><h3 className="text-3xl font-bold">{stats?.totalJobs || 0}</h3></div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-orange-50 rounded-xl"><Building2 className="w-8 h-8 text-orange-500" /></div>
          <div><p className="text-sm font-medium text-muted-foreground">Tổng Công Ty</p><h3 className="text-3xl font-bold">{stats?.totalCompanies || 0}</h3></div>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-red-50 rounded-xl"><MessageSquare className="w-8 h-8 text-red-500" /></div>
          <div><p className="text-sm font-medium text-muted-foreground">Tổng Bình Luận</p><h3 className="text-3xl font-bold">{stats?.totalReviews || 0}</h3></div>
        </div>
      </div>
    </div>
  );
}

// Component thẻ thống kê nhỏ
function StatCard({ title, value, icon, bgColor }: any) {
  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm flex items-center gap-4">
      <div className={`p-4 rounded-xl ${bgColor}`}>{icon}</div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-3xl font-bold text-foreground">{value}</h3>
      </div>
    </div>
  );
}