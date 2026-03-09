import { Outlet } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { LayoutDashboard, Building2, FileText, Users } from 'lucide-react';

const links = [
  { to: '/employer', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/employer/company', label: 'Hồ sơ công ty', icon: Building2 },
  { to: '/employer/jobs', label: 'Quản lý tin', icon: FileText },
  { to: '/employer/applicants', label: 'Ứng viên', icon: Users },
];

const EmployerLayout = () => (
  <div className="flex min-h-screen">
    <DashboardSidebar links={links} title="Nhà tuyển dụng" />
    <div className="flex flex-1 flex-col">
      <DashboardHeader userName="Trần Thị B" />
      <main className="flex-1 overflow-auto bg-background p-6">
        <Outlet />
      </main>
    </div>
  </div>
);

export default EmployerLayout;
