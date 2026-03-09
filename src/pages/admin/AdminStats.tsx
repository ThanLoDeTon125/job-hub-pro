import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const monthlyData = [
  { month: 'T1', jobs: 85, applications: 420 },
  { month: 'T2', jobs: 95, applications: 510 },
  { month: 'T3', jobs: 120, applications: 680 },
  { month: 'T4', jobs: 110, applications: 590 },
  { month: 'T5', jobs: 140, applications: 750 },
  { month: 'T6', jobs: 160, applications: 890 },
];

const roleData = [
  { name: 'Ứng viên', value: 8500 },
  { name: 'Nhà tuyển dụng', value: 320 },
  { name: 'Admin', value: 5 },
];

const COLORS = ['hsl(215, 90%, 42%)', 'hsl(172, 55%, 42%)', 'hsl(35, 95%, 55%)'];

const AdminStats = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground">Thống kê</h1>

    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">Việc làm & Ứng tuyển theo tháng</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
            <XAxis dataKey="month" stroke="hsl(215, 10%, 48%)" fontSize={12} />
            <YAxis stroke="hsl(215, 10%, 48%)" fontSize={12} />
            <Tooltip />
            <Bar dataKey="jobs" fill="hsl(215, 90%, 42%)" radius={[4, 4, 0, 0]} name="Việc làm" />
            <Bar dataKey="applications" fill="hsl(172, 55%, 42%)" radius={[4, 4, 0, 0]} name="Ứng tuyển" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">Phân bổ User</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={roleData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
              {roleData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card lg:col-span-2">
        <h2 className="text-lg font-semibold text-foreground mb-4">Xu hướng ứng tuyển</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
            <XAxis dataKey="month" stroke="hsl(215, 10%, 48%)" fontSize={12} />
            <YAxis stroke="hsl(215, 10%, 48%)" fontSize={12} />
            <Tooltip />
            <Line type="monotone" dataKey="applications" stroke="hsl(215, 90%, 42%)" strokeWidth={2} dot={{ r: 4 }} name="Ứng tuyển" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default AdminStats;
