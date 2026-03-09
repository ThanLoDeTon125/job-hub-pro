import StatCard from '@/components/StatCard';
import { Users, Briefcase, Building2, TrendingUp } from 'lucide-react';
import { mockStats } from '@/lib/mock-data';

const AdminDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground">Dashboard Admin</h1>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard icon={Briefcase} label="Tổng việc làm" value={mockStats.totalJobs.toLocaleString()} trend="+45 tuần này" />
      <StatCard icon={Users} label="Ứng viên" value={mockStats.totalCandidates.toLocaleString()} trend="+120 tuần này" />
      <StatCard icon={Building2} label="Nhà tuyển dụng" value={mockStats.totalEmployers.toLocaleString()} trend="+8 tuần này" />
      <StatCard icon={TrendingUp} label="Lượt ứng tuyển" value={mockStats.totalApplications.toLocaleString()} trend="+350 tuần này" />
    </div>

    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">Hoạt động gần đây</h2>
        <div className="space-y-3">
          {[
            'User mới đăng ký: Nguyễn Văn A (Ứng viên)',
            'Tin tuyển dụng mới: Senior React Developer - FPT',
            'Báo cáo: Có 5 tin bị report',
            'User mới đăng ký: TechCorp (Nhà tuyển dụng)',
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
              <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
              <p className="text-sm text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">Thống kê nhanh</h2>
        <div className="space-y-4">
          {[
            { label: 'Tỷ lệ ứng tuyển / việc làm', value: '12.5' },
            { label: 'Tỷ lệ tuyển thành công', value: '34%' },
            { label: 'Thời gian tuyển trung bình', value: '15 ngày' },
            { label: 'Ngành hot nhất', value: 'IT / Phần mềm' },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <span className="text-sm font-semibold text-foreground">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
