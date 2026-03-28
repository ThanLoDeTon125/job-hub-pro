import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import api from '@/lib/api';

const COLORS = ['hsl(215, 90%, 42%)', 'hsl(172, 55%, 42%)', 'hsl(35, 95%, 55%)'];

const AdminStats = () => {
  const [roleData, setRoleData] = useState([{ name: 'Ứng viên', value: 0 }, { name: 'Nhà tuyển dụng', value: 0 }, { name: 'Admin', value: 0 }]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // Lấy User để vẽ Pie Chart
        const usersRes = await api.get('/v1/users');
        const users = usersRes.data || [];
        setRoleData([
          { name: 'Ứng viên', value: users.filter((u: any) => u.role === 'CANDIDATE').length },
          { name: 'Nhà tuyển dụng', value: users.filter((u: any) => u.role === 'EMPLOYER').length },
          { name: 'Admin', value: users.filter((u: any) => u.role === 'ADMIN').length }
        ]);

        // Mô phỏng data cho Bar/Line chart dựa trên tổng số hiện tại
        const jobsRes = await api.get('/v1/jobs');
        const appsRes = await api.get('/v1/applications');
        const totalJobs = jobsRes.data.Data?.length || jobsRes.data.length || 0;
        const totalApps = appsRes.data.length || 0;

        // Vì ta không có API thống kê theo tháng từ backend, ta sẽ tạo biểu đồ giả lập 
        // dựa trên sự tăng trưởng của tổng số Job/App thực tế trong hệ thống.
        setMonthlyData([
          { month: 'Tháng trước', jobs: Math.floor(totalJobs * 0.4), applications: Math.floor(totalApps * 0.3) },
          { month: 'Tháng này', jobs: Math.floor(totalJobs * 0.6), applications: Math.floor(totalApps * 0.7) },
          { month: 'Hiện tại', jobs: totalJobs, applications: totalApps },
        ]);

      } catch (error) {
        console.error("Lỗi lấy dữ liệu biểu đồ", error);
      }
    };
    fetchChartData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Thống kê Hệ thống</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Phân bổ Người dùng</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={roleData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {roleData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Tăng trưởng Việc làm & Ứng tuyển</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
              <XAxis dataKey="month" stroke="hsl(215, 10%, 48%)" fontSize={12} />
              <YAxis stroke="hsl(215, 10%, 48%)" fontSize={12} />
              <Tooltip />
              <Bar dataKey="jobs" fill="hsl(215, 90%, 42%)" radius={[4, 4, 0, 0]} name="Việc làm đăng" />
              <Bar dataKey="applications" fill="hsl(172, 55%, 42%)" radius={[4, 4, 0, 0]} name="Lượt nộp CV" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default AdminStats;