import { Outlet } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { useAuth } from '@/hooks/useAuth';

const EmployerLayout = () => {
  const { user } = useAuth();
  const userName = user?.company?.companyName || user?.email?.split('@')[0] || 'Nhà tuyển dụng';

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
    <div className="flex flex-1 flex-col">
      <DashboardHeader userName={userName} />
      <main className="flex-1 overflow-auto bg-background p-6">
        <Outlet />
      </main>
    </div>
  </div>
  );
};

export default EmployerLayout;
