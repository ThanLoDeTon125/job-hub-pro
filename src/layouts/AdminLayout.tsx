import { Outlet } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { LayoutDashboard, Users, FileText, BarChart3 } from 'lucide-react';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Quản lý user', icon: Users },
  { to: '/admin/jobs', label: 'Quản lý job', icon: FileText },
  { to: '/admin/stats', label: 'Thống kê', icon: BarChart3 },
];

const AdminLayout = () => (
  <div className="flex min-h-screen">
    <DashboardSidebar links={links} title="Admin" />
    <div className="flex flex-1 flex-col">
      <DashboardHeader userName="Admin" />
      <main className="flex-1 overflow-auto bg-background p-6">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AdminLayout;
