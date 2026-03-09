import { Bell, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  userName?: string;
  onMenuToggle?: () => void;
}

const DashboardHeader = ({ userName = 'User', onMenuToggle }: DashboardHeaderProps) => (
  <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
    <div className="flex items-center gap-3">
      <button className="lg:hidden p-2" onClick={onMenuToggle}>
        <Menu className="h-5 w-5" />
      </button>
      <h2 className="text-sm font-medium text-muted-foreground">
        Xin chào, <span className="text-foreground font-semibold">{userName}</span>
      </h2>
    </div>
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-4 w-4" />
        <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
          3
        </span>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <Link to="/login">
          <LogOut className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  </header>
);

export default DashboardHeader;
