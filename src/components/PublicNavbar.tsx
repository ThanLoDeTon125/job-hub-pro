import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/useAuth';

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleAuthNavigation = () => {
    if (user) {
      if (user.role === 'ADMIN') navigate('/admin/dashboard');
      else if (user.role === 'EMPLOYER') navigate('/employer/dashboard');
      else navigate('/candidate/dashboard');
    } else {
      navigate('/login');
    }
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

            {/* THÊM NÚT NÀY */}
            <Link to="/articles" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Cẩm nang & Tin tức</Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={handleAuthNavigation}>Bảng điều khiển</Button>
              <Button onClick={logout}>Đăng xuất</Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" asChild><Link to="/login">Đăng nhập</Link></Button>
              <Button asChild><Link to="/register">Đăng ký</Link></Button>
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

                {/* THÊM NÚT NÀY CHO MOBILE */}
                <Link to="/articles" onClick={() => setIsOpen(false)} className="text-lg font-medium">Cẩm nang & Tin tức</Link>

                <div className="h-px bg-border my-4" />
                {user ? (
                  <>
                    <Button variant="outline" onClick={() => { handleAuthNavigation(); setIsOpen(false); }} className="w-full justify-start">Bảng điều khiển</Button>
                    <Button onClick={() => { logout(); setIsOpen(false); }} className="w-full justify-start mt-2">Đăng xuất</Button>
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