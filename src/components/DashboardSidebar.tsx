import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCircle,
  Briefcase,
  Bookmark,
  Building2,
  Users,
  BarChart3,
  FileText // Thêm import icon này
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardSidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const candidateLinks = [
    { title: 'Tổng quan', path: '/candidate/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { title: 'Hồ sơ cá nhân', path: '/candidate/profile', icon: <UserCircle className="w-5 h-5" /> },
    { title: 'Việc đã ứng tuyển', path: '/candidate/applied', icon: <Briefcase className="w-5 h-5" /> },
    { title: 'Việc đã lưu', path: '/candidate/saved', icon: <Bookmark className="w-5 h-5" /> },
  ];

  const employerLinks = [
    { title: 'Tổng quan', path: '/employer/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { title: 'Hồ sơ công ty', path: '/employer/company', icon: <Building2 className="w-5 h-5" /> },
    { title: 'Quản lý tin', path: '/employer/jobs', icon: <Briefcase className="w-5 h-5" /> },
    { title: 'Ứng viên', path: '/employer/applicants', icon: <Users className="w-5 h-5" /> },
    // THÊM NÚT NÀY CHO NHÀ TUYỂN DỤNG
    { title: 'Tin tức & PR', path: '/employer/articles', icon: <FileText className="w-5 h-5" /> },
  ];

  const adminLinks = [
    { title: 'Tổng quan', path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { title: 'Người dùng', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { title: 'Việc làm', path: '/admin/jobs', icon: <Briefcase className="w-5 h-5" /> },
    // THÊM NÚT NÀY CHO ADMIN
    { title: 'Quản lý Tin tức', path: '/admin/articles', icon: <FileText className="w-5 h-5" /> },
    { title: 'Thống kê', path: '/admin/stats', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  let links = candidateLinks;
  if (user?.role === 'EMPLOYER') links = employerLinks;
  if (user?.role === 'ADMIN') links = adminLinks;

  return (
    <aside className="w-64 bg-card border-r h-[calc(100vh-64px)] hidden md:block sticky top-16 shrink-0">
      <div className="p-4 space-y-2">
        {links.map((link) => {
          const isActive = location.pathname.includes(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                  ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
            >
              {link.icon}
              <span>{link.title}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}