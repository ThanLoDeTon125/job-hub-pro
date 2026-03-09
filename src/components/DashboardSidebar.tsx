import { Link, useLocation } from 'react-router-dom';
import { Briefcase, LucideIcon } from 'lucide-react';

interface SidebarLink {
  to: string;
  label: string;
  icon: LucideIcon;
}

interface DashboardSidebarProps {
  links: SidebarLink[];
  title: string;
}

const DashboardSidebar = ({ links, title }: DashboardSidebarProps) => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-sidebar border-r border-sidebar-border min-h-screen">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-sidebar-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
          <Briefcase className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-bold text-sidebar-foreground">{title}</span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const active = location.pathname === link.to;
          const Icon = link.icon;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-sidebar-foreground hover:text-sidebar-primary transition-colors"
        >
          ← Về trang chủ
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
