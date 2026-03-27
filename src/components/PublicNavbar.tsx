import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Menu, X, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const PublicNavbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/', label: 'Trang chủ' },
    { to: '/jobs', label: 'Việc làm' },
    { to: '/companies', label: 'Công ty' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-primary">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <span className="text-xl font-black">JH</span>
          </div>
          <span>JobHub<span className="text-foreground">Pro</span></span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 ml-8 flex-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-[15px] font-semibold transition-colors hover:text-primary ${isActive(l.to) ? 'text-primary' : 'text-muted-foreground'
                }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" className="text-muted-foreground border-border hover:text-primary hover:border-primary" asChild>
            <Link to="/employer" className="gap-2">
              <Building className="h-4 w-4" /> Nhà tuyển dụng
            </Link>
          </Button>
          <div className="h-6 w-px bg-border mx-1"></div>
          <Button variant="ghost" className="font-semibold text-foreground hover:text-primary" asChild>
            <Link to="/login">Đăng nhập</Link>
          </Button>
          <Button className="font-semibold" asChild>
            <Link to="/register">Đăng ký</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-3 animate-fade-in shadow-lg absolute w-full">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="block py-2 text-base font-semibold text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3 border-t border-border">
            <Button variant="outline" className="w-full justify-center" asChild onClick={() => setMobileOpen(false)}>
              <Link to="/employer"><Building className="h-4 w-4 mr-2" /> Dành cho Nhà tuyển dụng</Link>
            </Button>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" asChild onClick={() => setMobileOpen(false)}>
                <Link to="/login">Đăng nhập</Link>
              </Button>
              <Button className="flex-1" asChild onClick={() => setMobileOpen(false)}>
                <Link to="/register">Đăng ký</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;
