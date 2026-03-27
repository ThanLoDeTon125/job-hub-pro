import { Search, ArrowRight, Briefcase, Users, Building2, TrendingUp, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import JobCard from '@/components/JobCard';
import { mockJobs } from '@/lib/mock-data';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="bg-muted/30">
    {/* Hero Section */}
    <section className="bg-white pt-16 pb-24 border-b border-border relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary/20 blur-3xl" />

      <div className="container relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight animate-fade-in leading-[1.1]">
          Tìm việc làm nhanh chóng,<br />
          <span className="text-primary">Tuyển dụng hiệu quả</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Tiếp cận hơn 30,000+ công việc IT, Kế toán, Kinh doanh, Marketing và nhiều lĩnh vực khác trên toàn quốc.
        </p>

        {/* Search Box */}
        <div className="bg-white p-2 rounded-2xl shadow-elevated border border-border flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto animate-fade-in relative z-20" style={{ animationDelay: '0.2s' }}>
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Tên công việc, vị trí, kỹ năng..."
              className="pl-12 h-14 bg-transparent border-0 ring-0 focus-visible:ring-0 text-base shadow-none"
            />
          </div>
          <div className="hidden sm:block w-px h-10 bg-border self-center" />
          <div className="relative sm:w-1/3 flex items-center border-t sm:border-t-0 border-border">
            <MapPin className="absolute left-4 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Tất cả địa điểm"
              className="pl-12 h-14 bg-transparent border-0 ring-0 focus-visible:ring-0 text-base shadow-none"
            />
          </div>
          <Button size="lg" className="h-14 px-8 text-base rounded-xl w-full sm:w-auto mt-2 sm:mt-0" asChild>
            <Link to="/jobs">Tìm việc ngay</Link>
          </Button>
        </div>

        {/* Popular Tags */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <span className="text-sm text-muted-foreground mr-2">Gợi ý:</span>
          {['Kế toán', 'Marketing', 'IT Phần mềm', 'Tài xế', 'Thực tập sinh', 'Bán hàng'].map(tag => (
            <Link key={tag} to={`/jobs?q=${tag}`} className="text-sm px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* View Stats / Trust */}
    <section className="py-10 bg-white border-b border-border">
      <div className="container">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
          {[
            { value: '30,000+', label: 'Việc làm đang tuyển' },
            { value: '150,000+', label: 'Ứng viên tiềm năng' },
            { value: '10,000+', label: 'Nhà tuyển dụng' },
          ].map((s, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-3xl font-bold text-foreground mb-1">{s.value}</span>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Jobs */}
    <section className="py-16 md:py-24 container">
      <div className="flex flex-col md:flex-row items-end md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Việc làm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Hấp dẫn</span></h2>
          <p className="text-muted-foreground">Những cơ hội việc làm tốt nhất được cập nhật mỗi ngày</p>
        </div>
        <Button variant="outline" className="border-border hover:bg-primary/5 hover:text-primary" asChild>
          <Link to="/jobs" className="gap-2">
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {mockJobs.slice(0, 9).map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </section>

    {/* Easy Apply / Info Section */}
    <section className="py-20 bg-white border-t border-border">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1 space-y-6 max-w-xl">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/15 border-0">Dành cho Ứng viên</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Tạo CV chuyên nghiệp &<br />Nhận việc làm ngay
          </h2>
          <div className="space-y-4 pt-2">
            {[
              'Quy trình ứng tuyển đơn giản với 1 click.',
              'Nhận thông báo việc làm phù hợp mới nhất qua email.',
              'Bảo mật thông tin cá nhân tuyệt đối.'
            ].map((text, i) => (
              <div key={i} className="flex gap-3 items-start">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                <p className="text-muted-foreground text-lg">{text}</p>
              </div>
            ))}
          </div>
          <Button size="lg" className="rounded-xl mt-4" asChild>
            <Link to="/register">Tạo CV Ngay <ChevronRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="order-1 lg:order-2 flex justify-center">
          <div className="bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl p-8 max-w-md w-full aspect-square flex items-center justify-center relative shadow-inner">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl rounded-3xl" />
            <div className="relative z-10 grid grid-cols-2 gap-4 w-full">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-border h-32 flex flex-col justify-between">
                  <div className="h-8 w-8 rounded-full bg-muted" />
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-muted rounded-full" />
                    <div className="h-2 w-2/3 bg-muted rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA for Employers */}
    <section className="py-24 bg-foreground relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMODggWk04IDBMMCA4IFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==')] mix-blend-overlay" />
      <div className="container relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-background mb-6">
          Bạn là nhà tuyển dụng?
        </h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
          JobHub cung cấp hệ thống AI đề xuất ứng viên thông minh, giúp bạn tuyển dụng đúng người với chi phí tối ưu nhất.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="h-14 px-8 text-base rounded-xl" asChild>
            <Link to="/employer">Đăng tin tuyển dụng</Link>
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-xl border-border bg-transparent text-background hover:bg-white hover:text-foreground" asChild>
            <Link to="/employer/company">Tìm hiểu thêm</Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

// We need Badge component
import { Badge } from '@/components/ui/badge';
export default HomePage;
