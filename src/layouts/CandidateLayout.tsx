import { Outlet } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { LayoutDashboard, User, FileText, Bookmark } from 'lucide-react';

const links = [
  { to: '/candidate', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/candidate/profile', label: 'Hồ sơ cá nhân', icon: User },
  { to: '/candidate/applied', label: 'Đã ứng tuyển', icon: FileText },
  { to: '/candidate/saved', label: 'Đã lưu', icon: Bookmark },
];

const CandidateLayout = () => (
  <div className="flex min-h-screen">
    <DashboardSidebar links={links} title="Ứng viên" />
    <div className="flex flex-1 flex-col">
      <DashboardHeader userName="Nguyễn Văn A" />
      <main className="flex-1 overflow-auto bg-background p-6">
        <Outlet />
      </main>
    </div>
  </div>
);

export default CandidateLayout;
