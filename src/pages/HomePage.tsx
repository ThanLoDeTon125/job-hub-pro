import { Search, ArrowRight, Briefcase, Users, Building2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import JobCard from '@/components/JobCard';
import { mockJobs, mockStats } from '@/lib/mock-data';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    {/* Hero */}
    <section className="gradient-hero py-20 md:py-28">
      <div className="container text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in">
          Tìm công việc mơ ước<br />của bạn tại đây
        </h1>
        <p className="text-primary-foreground/70 text-lg mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Hàng nghìn cơ hội việc làm từ các công ty hàng đầu Việt Nam đang chờ bạn
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm việc làm..." className="pl-10 h-12 bg-card border-0" />
          </div>
          <Button size="lg" className="h-12 px-8" asChild>
            <Link to="/jobs">Tìm kiếm</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-12 border-b border-border">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Briefcase, value: mockStats.totalJobs.toLocaleString(), label: 'Việc làm' },
          { icon: Users, value: mockStats.totalCandidates.toLocaleString(), label: 'Ứng viên' },
          { icon: Building2, value: mockStats.totalEmployers.toLocaleString(), label: 'Nhà tuyển dụng' },
          { icon: TrendingUp, value: mockStats.totalApplications.toLocaleString(), label: 'Lượt ứng tuyển' },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <s.icon className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Featured Jobs */}
    <section className="py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Việc làm nổi bật</h2>
          <Button variant="ghost" asChild>
            <Link to="/jobs" className="gap-1">
              Xem tất cả <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockJobs.slice(0, 6).map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 gradient-primary">
      <div className="container text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
          Bạn là nhà tuyển dụng?
        </h2>
        <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
          Đăng tin tuyển dụng và tiếp cận hàng nghìn ứng viên tiềm năng
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link to="/register">Đăng tin ngay</Link>
        </Button>
      </div>
    </section>
  </div>
);

export default HomePage;
