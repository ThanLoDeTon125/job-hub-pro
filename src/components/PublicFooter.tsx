import { Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const PublicFooter = () => (
  <footer className="border-t border-border bg-card py-12">
    <div className="container grid gap-8 md:grid-cols-4">
      <div>
        <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Briefcase className="h-4 w-4 text-primary-foreground" />
          </div>
          JobViet
        </Link>
        <p className="text-sm text-muted-foreground">
          Nền tảng tuyển dụng hàng đầu Việt Nam, kết nối nhà tuyển dụng với ứng viên tiềm năng.
        </p>
      </div>
      <div>
        <h4 className="font-semibold mb-3 text-sm">Ứng viên</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/jobs" className="hover:text-primary transition-colors">Tìm việc làm</Link></li>
          <li><Link to="/register" className="hover:text-primary transition-colors">Tạo tài khoản</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3 text-sm">Nhà tuyển dụng</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/register" className="hover:text-primary transition-colors">Đăng tin tuyển dụng</Link></li>
          <li><Link to="/register" className="hover:text-primary transition-colors">Tìm ứng viên</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3 text-sm">Liên hệ</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>contact@jobviet.vn</li>
          <li>1900 1234</li>
          <li>Hà Nội, Việt Nam</li>
        </ul>
      </div>
    </div>
    <div className="container mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
      © 2026 JobViet. All rights reserved.
    </div>
  </footer>
);

export default PublicFooter;
