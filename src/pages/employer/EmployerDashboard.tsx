import { useState, useEffect } from 'react';
import StatCard from '@/components/StatCard';
import { FileText, Users, Eye, CheckCircle2 } from 'lucide-react';
import api from '@/lib/api';

const EmployerDashboard = () => {
  const [stats, setStats] = useState({ jobs: 0, candidates: 0, hired: 0 });
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meRes = await api.get('/v1/auth/me');
        const companyId = meRes.data.company?.id;

        if (companyId) {
          const compRes = await api.get(`/v1/companies/${companyId}`);
          const myJobs = compRes.data.jobs || [];

          // Lấy danh sách ứng viên của từng Job (Đơn giản hóa cho Frontend)
          let totalApplicants = 0;
          let hiredCount = 0;
          let recentApps: any[] = [];

          // Chạy vòng lặp lấy đơn của từng công việc
          for (let job of myJobs) {
            try {
              const appRes = await api.get(`/v1/applications/job/${job.id}`);
              const apps = appRes.data || [];
              totalApplicants += apps.length;
              hiredCount += apps.filter((a: any) => a.status === 'HIRED').length;

              // Gộp ứng viên vào danh sách hoạt động
              recentApps = [...recentApps, ...apps.map((a: any) => ({
                candidateName: a.candidate?.fullName || 'Ứng viên',
                jobTitle: job.title,
                date: new Date(a.appliedAt)
              }))];
            } catch (e) { }
          }

          // Sắp xếp hoạt động mới nhất lên đầu
          recentApps.sort((a, b) => b.date.getTime() - a.date.getTime());

          setStats({ jobs: myJobs.length, candidates: totalApplicants, hired: hiredCount });
          setActivities(recentApps.slice(0, 5)); // Lấy 5 hoạt động mới nhất
        }
      } catch (error) {
        console.error("Lỗi lấy dữ liệu HR dashboard", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Tổng quan Tuyển dụng</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FileText} label="Tin đang mở" value={stats.jobs.toString()} />
        <StatCard icon={Users} label="Tổng ứng viên nộp" value={stats.candidates.toString()} />
        <StatCard icon={CheckCircle2} label="Đã tuyển dụng" value={stats.hired.toString()} />
        <StatCard icon={Eye} label="Lượt tiếp cận" value="--" trend="Đang phát triển" />
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">Hoạt động ứng tuyển gần đây</h2>
        <div className="space-y-3">
          {activities.length === 0 ? <p className="text-muted-foreground text-sm">Chưa có ứng viên nào.</p> : null}
          {activities.map((activity, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
              <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{activity.candidateName}</span> vừa ứng tuyển vị trí <span className="font-medium">{activity.jobTitle}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default EmployerDashboard;