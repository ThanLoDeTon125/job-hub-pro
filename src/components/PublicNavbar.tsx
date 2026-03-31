import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Briefcase, User, Building2, ShieldCheck, LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Hàm lấy link dashboard tùy theo Role
  const getDashboardLink = () => {
    if (user?.role === 'ADMIN') return '/admin/dashboard';
    if (user?.role === 'EMPLOYER') return '/employer/dashboard';
    return '/candidate/dashboard';
  };

  // Hàm hiển thị Icon Avatar tùy theo Role
  const getAvatarIcon = () => {
    if (user?.role === 'ADMIN') return <ShieldCheck className="w-5 h-5 text-primary" />;
    if (user?.role === 'EMPLOYER') return <Building2 className="w-5 h-5 text-primary" />;
    return <User className="w-5 h-5 text-primary" />;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">JobHub<span className="text-foreground">Pro</span></span>
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Trang chủ</Link>
            <Link to="/jobs" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Việc làm</Link>
            <Link to="/articles" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Cẩm nang & Tin tức</Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            /* ===== HIỂN THỊ AVATAR & DROPDOWN MENU KHI ĐÃ ĐĂNG NHẬP ===== */
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-border bg-muted/50 hover:bg-muted">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatarUrl} alt={user.email} />
                    <AvatarFallback className="bg-transparent">
                      {getAvatarIcon()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.fullName || (user.role === 'EMPLOYER' ? 'Nhà tuyển dụng' : 'Ứng viên')}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={getDashboardLink()} className="cursor-pointer w-full flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Trang quản lý</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <div className="flex items-center gap-2 border-r pr-4 mr-2">
                <Button variant="ghost" asChild><Link to="/login">Đăng nhập</Link></Button>
                <Button asChild><Link to="/register">Đăng ký</Link></Button>
              </div>
              {/* Nút dành riêng cho Employer */}
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
                <Link to="/employer/login">Nhà tuyển dụng</Link>
              </Button>
            </>
          )}
        </div>

        {/* MENU MOBILE */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon"><Menu className="h-6 w-6" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-medium">Trang chủ</Link>
                <Link to="/jobs" onClick={() => setIsOpen(false)} className="text-lg font-medium">Việc làm</Link>
                <Link to="/articles" onClick={() => setIsOpen(false)} className="text-lg font-medium">Cẩm nang & Tin tức</Link>

                <div className="h-px bg-border my-4" />
                {user ? (
                  <>
                    <div className="flex items-center gap-3 mb-4 px-2">
                      <div className="h-10 w-10 rounded-full border bg-muted flex items-center justify-center">
                        {getAvatarIcon()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.email}</span>
                        <span className="text-xs text-muted-foreground uppercase">{user.role}</span>
                      </div>
                    </div>
                    <Button variant="outline" asChild className="w-full justify-start">
                      <Link to={getDashboardLink()} onClick={() => setIsOpen(false)}>
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Trang quản lý
                      </Link>
                    </Button>
                    <Button variant="ghost" onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full justify-start mt-2 text-destructive hover:text-destructive hover:bg-destructive/10">
                      <LogOut className="mr-2 h-4 w-4" /> Đăng xuất
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild className="w-full justify-start"><Link to="/login" onClick={() => setIsOpen(false)}>Đăng nhập</Link></Button>
                    <Button asChild className="w-full justify-start"><Link to="/register" onClick={() => setIsOpen(false)}>Đăng ký</Link></Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}