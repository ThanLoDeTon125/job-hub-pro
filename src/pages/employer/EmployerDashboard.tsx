import StatCard from '@/components/StatCard';
import { FileText, Users, Eye, CheckCircle2 } from 'lucide-react';

const EmployerDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground">Dashboard nhà tuyển dụng</h1>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard icon={FileText} label="Tin tuyển dụng" value={8} trend="+2 tuần này" />
      <StatCard icon={Users} label="Ứng viên" value={45} trend="+12 tuần này" />
      <StatCard icon={Eye} label="Lượt xem" value={1230} />
      <StatCard icon={CheckCircle2} label="Đã tuyển" value={6} />
    </div>

    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <h2 className="text-lg font-semibold text-foreground mb-4">Hoạt động gần đây</h2>
      <div className="space-y-3">
        {[
          'Nguyễn Văn A ứng tuyển vị trí Frontend Developer',
          'Lê Thị B xem tin tuyển dụng Backend Developer',
          'Hoàng Văn C gửi CV cho vị trí DevOps Engineer',
          'Trần Văn D ứng tuyển vị trí UI/UX Designer',
        ].map((activity, i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
            <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
            <p className="text-sm text-muted-foreground">{activity}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default EmployerDashboard;
