import { Bell, LogOut, Menu, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface DashboardHeaderProps {
  userName?: string;
  onMenuToggle?: () => void;
}

const DashboardHeader = ({ userName = 'User', onMenuToggle }: DashboardHeaderProps) => {
  const { logout } = useAuth(); // Sử dụng hàm logout từ hook

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-4 lg:px-6 sticky top-0 z-10 w-full">
      <div className="flex items-center gap-4">
        {/* Nút Menu Hamburger cho Mobile */}
        <button className="md:hidden p-2 text-muted-foreground hover:text-foreground" onClick={onMenuToggle}>
          <Menu className="h-6 w-6" />
        </button>

        {/* Logo chỉ hiển thị trên Mobile (bởi vì Desktop đã có Logo ở Sidebar) */}
        <Link to="/" className="flex items-center gap-2 font-bold text-primary md:hidden">
          <Briefcase className="h-5 w-5" />
          <span className="text-lg">JobHubPro</span>
        </Link>

        {/* Lời chào */}
        <h2 className="hidden md:block text-sm font-medium text-muted-foreground">
          Xin chào, <span className="text-foreground font-semibold">{userName}</span>
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative hover:bg-muted rounded-full">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-destructive border-2 border-card"></span>
        </Button>

        <div className="h-6 w-px bg-border mx-1"></div> {/* Đường phân cách */}

        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Đăng xuất</span>
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;